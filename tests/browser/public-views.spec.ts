import { expect, test as base, type Request } from "@playwright/test";

const site = "https://fvva.ru";
const counter = "https://mc.yandex.ru/watch/108242561";

// Route the production hostname to the local build so the real origin check
// runs. Capture every third-party request, including unexpected SDK traffic.
const test = base.extend<{ external: Request[] }>({
  external: async ({ context, baseURL }, use) => {
    const external: Request[] = [];
    await context.route("**/*", async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin === baseURL) return route.continue();
      if (url.origin === site) {
        const response = await route.fetch({ url: baseURL + url.pathname + url.search, maxRedirects: 0 });
        return route.fulfill({ response });
      }
      external.push(request);
      return route.fulfill({ status: 204 });
    });
    await use(external);
  },
});

async function expectViews(requests: Request[], paths: string[]) {
  await expect.poll(() => requests.length).toBe(paths.length);
  for (const [index, path] of paths.entries()) {
    const request = requests[index];
    const url = new URL(request.url());
    const headers = await request.allHeaders();
    const group = site + path;
    expect(url.origin + url.pathname).toBe(counter);
    expect(request.method()).toBe("GET");
    expect(request.postData()).toBeNull();
    expect(headers.cookie).toBeUndefined();
    expect([...url.searchParams.keys()].filter(key => key !== "page-url")).toEqual([]);
    if (url.searchParams.has("page-url")) {
      expect(url.searchParams.get("page-url")).toBe(group);
      // Browser privacy settings may reduce a cross-site referrer to its origin.
      expect([group, site + "/", undefined]).toContain(headers.referer);
    } else {
      expect(headers.referer).toBe(group);
    }
  }
}

test("учитывает переходы и возврат, скрывает поисковую фразу и тему статьи", async ({ context, page, external }) => {
  await context.addCookies([{ name: "test_cookie", value: "private-probe", domain: "mc.yandex.ru", path: "/", secure: true, sameSite: "None" }]);
  await page.goto(site + "/?utm_source=private-probe#private-probe", {
    referer: "https://example.org/private-probe",
  });
  await expectViews(external, ["/"]);
  await page.getByRole("navigation", { name: "Навигация в подвале" }).getByRole("link", { name: "О подходе" }).click();
  await expect(page).toHaveURL(site + "/#podhod");
  await page.getByRole("link", { name: "Все статьи", exact: true }).click();
  await expectViews(external, ["/", "/blog"]);

  const search = page.getByRole("searchbox", { name: "Найти статью" });
  await search.fill("private-probe");
  await search.press("Escape");
  const diary = page.getByRole("link", { name: "Дневник мыслей в КПТ", exact: true }).first();
  await diary.click();
  await expectViews(external, ["/", "/blog", "/blog"]);
  const related = page.getByRole("navigation", { name: "Что почитать дальше" });
  await related.getByRole("link").first().click();
  await expectViews(external, ["/", "/blog", "/blog", "/blog"]);
  await page.goBack();
  await expectViews(external, ["/", "/blog", "/blog", "/blog", "/blog"]);
  await page.reload();
  await expectViews(external, ["/", "/blog", "/blog", "/blog", "/blog", "/blog"]);
});

test("на чувствительных страницах и при ответах отсутствуют внешние запросы", async ({ page, external }) => {
  await page.goto(site + "/");
  await expectViews(external, ["/"]);
  const nav = page.getByRole("navigation", { name: "Навигация в подвале" });
  const resources = page.getByRole("navigation", { name: "Полезные материалы" });
  await nav.getByRole("link", { name: "Самопроверка" }).click();
  const topic = page.locator("#nastroenie");
  await topic.getByRole("checkbox").nth(1).check();
  await topic.getByRole("button", { name: "Посмотреть результат" }).click();
  await topic.getByRole("link", { name: "Пройти шкалу депрессии Бека" }).click();
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Далее", exact: true }).click();
  await resources.getByRole("link", { name: "Тест на тревогу" }).click();
  for (let question = 1; question <= 21; question++) {
    await page.getByRole("radio").nth(1).check();
    await page.getByRole("button", { name: question === 21 ? "Показать результат" : "Далее", exact: true }).click();
  }
  await expect(page.locator(".beck-score")).toHaveText("21 из 63 баллов");
  await nav.getByRole("link", { name: "Помощь сейчас" }).click();
  await expect(page).toHaveURL(site + "/panicheskaya-ataka");
  await page.reload();
  await expect(page.locator("header")).toHaveAttribute("data-menu-ready", "");
  await expectViews(external, ["/"]);

  await resources.getByRole("link", { name: "Частые вопросы" }).click();
  await expectViews(external, ["/", "/faq"]);
  await page.goto(site + "/blog/private-probe");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Страница не найдена");
  await expect(page.locator("header")).toHaveAttribute("data-menu-ready", "");
  await expectViews(external, ["/", "/faq"]);
});

test("локальный просмотр не попадает в статистику", async ({ page, external }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Все статьи", exact: true }).click();
  await expect(page.getByRole("searchbox")).toBeVisible();
  expect(external).toEqual([]);
});

for (const [preference, value] of [["doNotTrack", "1"], ["globalPrivacyControl", true]] as const) {
  test(`сигнал отказа ${preference} отключает счётчик`, async ({ page, external }) => {
    await page.addInitScript(([key, value]) => {
      Object.defineProperty(navigator, key, { configurable: true, value });
    }, [preference, value] as const);
    await page.goto(site + "/contact?topic=private-probe");
    await page.getByRole("radio", { name: "О стоимости" }).check();
    await page.getByRole("link", { name: "Вопросы о консультации" }).click();
    await expect(page).toHaveURL(site + "/faq");
    expect(external).toEqual([]);
  });
}
