import { expect, test as base, type BrowserContext, type Page, type Request } from "@playwright/test";

const site = "https://fvva.ru";
const tag = "https://mc.yandex.ru/metrika/tag.js";
const counter = 108242561;
const consentKey = "fvva-analytics-consent";
const probe = "private-probe";

type YmCall = [number, string, ...unknown[]];
type Capture = { calls: YmCall[]; scripts: Request[] };

// The counter's origin is intercepted. Drain the standard ym.a bootstrap queue,
// then collect later SPA calls in the test process, including across reloads.
const localTag = `
  const pending = Array.from(window.ym?.a || []);
  window.ym = (...args) => window.recordCounterCall(args);
  for (const args of pending) window.ym(...args);
`;

const test = base.extend<{ capture: Capture }>({
  capture: async ({ context, baseURL }, use) => {
    const calls: YmCall[] = [];
    const scripts: Request[] = [];
    const unexpected: string[] = [];
    await context.exposeBinding("recordCounterCall", (_, args: YmCall) => { calls.push(args); });
    await context.route("**/*", async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === baseURL) return route.continue();
      if (url.origin === site) {
        const response = await route.fetch({ url: baseURL + url.pathname + url.search, maxRedirects: 0 });
        return route.fulfill({ response });
      }
      if (url.href === tag && request.resourceType() === "script") {
        scripts.push(request);
        return route.fulfill({ contentType: "application/javascript", body: localTag });
      }
      if (request.isNavigationRequest() && ["https://t.me", "https://max.ru"].includes(url.origin)) {
        return route.fulfill({ contentType: "text/html", body: "<title>Контакт</title>" });
      }
      unexpected.push(url.href);
      return route.abort();
    });
    try {
      await use({ calls, scripts });
    } finally {
      await context.setOffline(true);
      await context.unrouteAll({ behavior: "wait" });
      expect(unexpected).toEqual([]);
      for (const call of calls) {
        expect(call[0]).toBe(counter);
        expect(["init", "hit", "reachGoal", "destruct"]).toContain(call[1]);
        expect(JSON.stringify(call)).not.toContain(probe);
      }
      for (const request of scripts) {
        expect(request.method()).toBe("GET");
        expect(request.postData()).toBeNull();
        expect((await request.allHeaders()).referer || "").not.toContain(probe);
      }
    }
  },
});

function grant(page: Page) {
  return page.getByRole("button", { name: "Разрешить", exact: true }).click();
}

function seedConsent(context: BrowserContext) {
  return context.addInitScript(key => localStorage.setItem(key, "granted"), consentKey);
}

async function expectViews(capture: Capture, paths: string[]) {
  await expect.poll(() => capture.calls.filter(call => call[1] === "hit").map(call => call[2]))
    .toEqual(paths.map(path => site + path));
}

function expectSilent(capture: Capture) {
  expect(capture.scripts).toHaveLength(0);
  expect(capture.calls).toEqual([]);
}

test("спрашивает согласие, запоминает отказ и позволяет отозвать разрешение", async ({ page, capture }) => {
  await page.goto(site + "/");
  const decline = page.getByRole("button", { name: "Отказаться", exact: true });
  await expect(decline).toBeVisible();
  expectSilent(capture);
  await decline.click();
  await page.reload();
  await expect(page.locator("header.site-header")).toHaveAttribute("data-menu-ready", "");
  await expect(decline).toBeHidden();
  expectSilent(capture);
  const settings = page.getByRole("button", { name: "Настройки аналитики" });
  await settings.click();
  await grant(page);
  await expectViews(capture, ["/"]);
  await settings.click();
  await decline.click();
  await page.getByRole("link", { name: "Все статьи", exact: true }).click();
  await expect(page.getByRole("searchbox", { name: "Найти статью" })).toBeVisible();
  await expectViews(capture, ["/"]);
  expect(capture.scripts).toHaveLength(1);
});

test.describe("при отключённом JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("статья читается без пикселя и запросов к Метрике", async ({ page, capture }) => {
    await page.goto(site + "/blog/dnevnik-mysley-kpt");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Дневник мыслей");
    expectSilent(capture);
  });
});

test("после согласия передаёт канонические адреса и считает возврат один раз", async ({ page, capture }) => {
  await page.goto(site + "/?utm_source=" + probe + "#" + probe, {
    referer: "https://example.org/" + probe,
  });
  await grant(page);
  await expectViews(capture, ["/"]);
  const init = capture.calls.filter(call => call[1] === "init");
  expect(init).toHaveLength(1);
  expect(init[0][2]).toMatchObject({
    defer: true, url: site + "/", referrer: "https://example.org/", sendTitle: false,
    webvisor: false, clickmap: false, trackLinks: false, accurateTrackBounce: false,
  });
  expect(capture.calls.find(call => call[1] === "hit")?.[3]).toEqual({ referer: "https://example.org/" });
  await page.getByRole("navigation", { name: "Навигация в подвале" }).getByRole("link", { name: "О подходе" }).click();
  await expect(page).toHaveURL(site + "/#podhod");
  await page.getByRole("link", { name: "Все статьи", exact: true }).click();
  const search = page.getByRole("searchbox", { name: "Найти статью" });
  await search.fill(probe);
  await expect(page).toHaveURL(new RegExp(probe + "$"));
  await search.press("Escape");
  const diaryPath = "/blog/dnevnik-mysley-kpt";
  await page.getByRole("link", { name: "Дневник мыслей в КПТ", exact: true }).first().click();
  await expectViews(capture, ["/", "/blog", diaryPath]);
  await page.goBack();
  await expectViews(capture, ["/", "/blog", diaryPath, "/blog"]);
  expect(capture.scripts).toHaveLength(1);
  await page.reload();
  await expectViews(capture, ["/", "/blog", diaryPath, "/blog", "/blog"]);
});

test("прямой вход в статью и согласие после перехода учитывают только текущий адрес", async ({ page, capture }) => {
  const path = "/blog/kak-kpt-pomogaet";
  await page.goto(site + "/blog?q=" + probe);
  await page.getByRole("searchbox").press("Escape");
  await page.locator(`main a[href="${path}"]`).first().click();
  await grant(page);
  await expectViews(capture, [path]);
  expect(capture.calls.find(call => call[1] === "hit")?.[3]).toEqual({ referer: site + path });
  await page.goto(site + path + "?q=" + probe + "#" + probe);
  await expectViews(capture, [path, path]);
  await page.goto(site + "/blog/" + probe);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Страница не найдена");
  await expect(page.locator(".site-header")).toHaveAttribute("data-menu-ready", "");
  await expectViews(capture, [path, path]);
});

test("считает посещение тестов, без передачи ответов и результата", async ({ page, capture }) => {
  await page.goto(site + "/proverit-sebya");
  await grant(page);
  const topic = page.locator("#nastroenie");
  await topic.getByRole("checkbox").nth(1).check();
  await topic.getByRole("button", { name: "Посмотреть результат" }).click();
  await topic.getByRole("link", { name: "Пройти шкалу депрессии Бека" }).click();
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Далее", exact: true }).click();
  const resources = page.getByRole("navigation", { name: "Полезные материалы" });
  await resources.getByRole("link", { name: "Тест на тревогу" }).click();
  await expectViews(capture, ["/proverit-sebya", "/test/depression", "/test/anxiety"]);
  const beforeAnswers = structuredClone(capture.calls);
  for (let question = 1; question <= 21; question++) {
    await page.getByRole("radio").nth(1).check();
    await page.getByRole("button", { name: question === 21 ? "Показать результат" : "Далее", exact: true }).click();
  }
  await expect(page.locator(".beck-score")).toHaveText("21 из 63 баллов");
  expect(capture.calls).toEqual(beforeAnswers);
  await resources.getByRole("link", { name: "Частые вопросы" }).click();
  await expectViews(capture, ["/proverit-sebya", "/test/depression", "/test/anxiety", "/faq"]);
  expect(capture.calls.filter(call => call[1] === "reachGoal")).toEqual([]);
});

test("шесть целей передают только идентификатор действия", async ({ page, context, capture }) => {
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => {} }, configurable: true });
  });
  await page.goto(site + "/contact?topic=" + probe);
  await grant(page);
  await expectViews(capture, ["/contact"]);
  await page.getByRole("radio", { name: "О стоимости" }).check();
  await page.getByRole("button", { name: "Скопировать текст" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Сообщение скопировано" })).toBeVisible();
  for (const name of ["Написать в Telegram", "Написать в MAX"]) {
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("main").getByRole("link", { name, exact: true }).click(),
    ]);
    await popup.close();
  }
  await page.getByRole("navigation", { name: "Навигация в подвале" }).getByRole("link", { name: "Статьи" }).click();
  await page.getByRole("link", { name: "Скачать бланк в PDF" }).click();
  const goals = ["booking_open", "booking_price", "booking_copy", "contact_telegram", "contact_max", "diary_download"];
  await expect.poll(() => capture.calls.filter(call => call[1] === "reachGoal"))
    .toEqual(goals.map(goal => [counter, "reachGoal", goal]));
});

for (const [preference, value] of [["doNotTrack", "1"], ["globalPrivacyControl", true]] as const) {
  test(`сигнал ${preference} сильнее сохранённого согласия`, async ({ page, context, capture }) => {
    await seedConsent(context);
    await context.addInitScript(([key, value]) => {
      Object.defineProperty(navigator, key, { configurable: true, value });
    }, [preference, value] as const);
    await page.goto(site + "/contact?topic=" + probe);
    await page.getByRole("radio", { name: "О стоимости" }).check();
    await page.getByRole("link", { name: "Вопросы о консультации" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expectSilent(capture);
  });
}

test("на локальном домене даже сохранённое согласие не включает Метрику", async ({ context, page, capture }) => {
  await seedConsent(context);
  await page.goto("/");
  await page.getByRole("link", { name: "Все статьи", exact: true }).click();
  await expect(page.getByRole("searchbox")).toBeVisible();
  expectSilent(capture);
});
