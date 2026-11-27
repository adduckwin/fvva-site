import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context, baseURL }) => {
  // Synthetic answers must never leave the local test server.
  await context.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort()
  );
});

test("мобильный портрет отображается при блокировке картинки декоративной ленты", async ({ page }) => {
  await page.setViewportSize({ width: 428, height: 800 });
  await page.route("**/images/desk-corner.webp", route => route.abort());
  await page.goto("/");
  const cover = page.locator(".studio-cover");
  await expect(cover.getByAltText("Александра Федорова")).toBeInViewport();
  await expect.poll(() => cover.locator("img").evaluateAll(images =>
    images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0)
  )).toBe(true);
});

test("нижняя кнопка записи открывает первый экран контактов", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Связаться со мной" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  for (const channel of ["Telegram", "MAX"]) {
    await expect(page.getByRole("main").getByRole("link", { name: "Написать в " + channel, exact: true })).toBeInViewport({ ratio: 1 });
  }
  await page.goBack();
  await expect(page.getByRole("link", { name: "Связаться со мной" })).toBeInViewport();
});

test("помощь доступна сразу и имеет приоритет над суммарным баллом", async ({ page, baseURL }) => {
  const unexpected: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== baseURL || url.pathname.startsWith("/api/")) unexpected.push(url.href);
  });
  await page.goto("/");
  await page.getByRole("link", { name: "Пройти тест", exact: true }).first().click();
  await expect(page).toHaveURL(/\/test\/depression$/);
  for (let number = 1; number <= 21; number++) {
    const group = page.getByRole("radiogroup");
    const heading = page.locator("#beck-question-title");
    await expect(page.getByText(`Вопрос ${number} из 21`, { exact: true })).toBeVisible();
    await group.getByRole("radio").nth(number === 9 ? 3 : 0).check();
    if (number === 9) {
      await expect(page.getByRole("region", { name: "Поддержка прямо сейчас" })).toBeFocused();
      await expect(heading).toBeVisible();
    }
    if (number < 21) await page.getByRole("button", { name: "Далее", exact: true }).click();
  }
  await page.getByRole("button", { name: "Показать результат" }).click();
  await expect(page.getByRole("heading", { name: "Результат теста" })).toBeVisible();
  await expect(page.getByRole("main")).toContainText(/3\s*из 63 баллов/);
  await expect(page.getByRole("heading", { name: "Поддержка прямо сейчас" })).toBeVisible();
  await expect(page.getByText("Минимальный уровень", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Что дальше" })).toHaveCount(0);
  expect(unexpected).toEqual([]);
});

test("самопроверка отличает пропуск от явного отрицательного ответа", async ({ page }) => {
  await page.goto("/proverit-sebya");
  const result = page.getByRole("button", { name: "Посмотреть результат" }).first();
  await expect(result).toBeDisabled();
  await page.getByRole("button", { name: "Ничего из перечисленного" }).first().click();
  await result.click();
  await expect(page.getByText("Ничего из списка вам не подошло", { exact: true }).first()).toBeVisible();
});

test("статья о тревоге ведёт к соответствующей шкале", async ({ page }) => {
  await page.goto("/blog/trevoga-norma-ili-rasstrojstvo");
  await expect(page.getByRole("link", { name: "Пройти тест на тревогу", exact: true })).toHaveAttribute("href", "/test/anxiety");
});

test("мобильное меню закрывается с клавиатуры и возвращает фокус", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Меню" });
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});

test.describe("касания в мобильном меню", () => {
  test.use({ viewport: { width: 393, height: 750 }, hasTouch: true, isMobile: true });

  test("ссылка дожидается касания после потери фокуса, а нажатие снаружи закрывает меню", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator(".site-menu summary");
    const nav = page.locator("#mobile-navigation");
    for (const [label, path] of [["Статьи", "/blog"], ["О подходе", "/#podhod"]]) {
      await toggle.tap();
      await toggle.focus();
      const link = nav.getByRole("link", { name: label, exact: true });
      // WebKit releases focus from summary before dispatching the link's click.
      await link.evaluate(node => node.addEventListener("pointerdown", () => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      }, { once: true }));
      await link.tap();
      await expect(page).toHaveURL(path);
      await expect(nav).toBeHidden();
    }
    await expect(page.locator("#podhod h2").first()).toBeInViewport();
    await toggle.tap();
    await expect(nav).toBeVisible();
    await page.touchscreen.tap(10, 730);
    await expect(nav).toBeHidden();
  });
});

test.describe("сайт без JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("пункт О подходе открывает раздел вне выпадающего меню", async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 750 });
    await page.goto("/");
    await page.locator(".site-menu summary").click();
    await page.locator("#mobile-navigation").getByRole("link", { name: "О подходе" }).click();
    await expect(page).toHaveURL("/#podhod");
    const title = page.locator("#podhod h2").first();
    await expect(title).toBeInViewport();
    await expect.poll(() => title.evaluate(node => {
      const bounds = node.getBoundingClientRect();
      const hit = document.elementFromPoint(bounds.left + 5, bounds.top + bounds.height / 2);
      return Boolean(hit?.closest("#podhod"));
    })).toBe(true);
  });

  test("прямая ссылка отдаёт текст статьи и её карточку для мессенджеров", async ({ page }) => {
    const route = "/blog/trevoga-norma-ili-rasstrojstvo";
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toContainText("Тревога");
    await expect(page.locator("main h2").first()).toBeVisible();
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", "https://fvva.ru" + route);
    await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", /^https:\/\/fvva\.ru\/images\//);
  });

  test("консультация при тревоге доступна поисковому роботу по адресу из карты сайта", async ({ page, request }) => {
    const route = "/psiholog-pri-trevoge";
    const canonical = "https://fvva.ru" + route;
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain(`<loc>${canonical}</loc>`);

    const response = await page.goto(route + "?source=search#details");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/тревог/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[name="robots"][content*="noindex" i]')).toHaveCount(0);
    await expect(page.locator('main a[href="/contact"]').first()).toBeVisible();
  });

  test("неизвестная статья и неизвестный адрес возвращают 404", async ({ page }) => {
    for (const route of ["/blog/nesushchestvuyushchaya-statya", "/nesushchestvuyushchaya-stranitsa"]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Страница не найдена");
      await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
    }
  });
});

test("в статье работают ссылки на упражнение и PDF-памятку", async ({ page }) => {
  await page.goto("/blog/dyhatelnye-tehniki-pri-trevoge");
  const content = page.locator("main .prose");
  await expect(content.getByRole("link", { name: /подсказку для спокойного вдоха/ })).toHaveAttribute("href", "/panicheskaya-ataka#dyhanie");
  await expect(content.getByRole("link", { name: /Пройти упражнение с подсказками/ })).toHaveAttribute("href", "/panicheskaya-ataka#zazemlenie");
  const download = content.getByRole("link", { name: /скачайте памятку/ });
  await expect(download).toHaveAttribute("href", "/7-tehnik-pri-trevoge.pdf");
  const response = await page.request.get("/7-tehnik-pri-trevoge.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("поиск сохраняет фокус и восстанавливает результаты после чтения статьи", async ({ page }) => {
  await page.goto("/blog");
  const input = page.getByRole("searchbox", { name: "Найти статью" });
  await input.fill("после разговора");
  await expect(page.getByRole("region", { name: "Результаты поиска" })
    .getByRole("link", { name: /Почему я снова прокручиваю разговор/ })).toBeVisible();
  await input.fill("");
  await input.pressSequentially("подобрать слова");
  await expect(input).toBeFocused();
  const results = page.getByRole("region", { name: "Результаты поиска" });
  await results.getByRole("link", { name: /Как попросить о поддержке/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Как попросить о поддержке");
  await page.goBack();
  await expect(input).toHaveValue("подобрать слова");
  await expect(results.getByRole("link", { name: /Как попросить о поддержке/ })).toBeVisible();
  await input.press("Escape");
  await expect(input).toHaveValue("");
  await expect(page.getByRole("navigation", { name: "Темы блога" })).toBeVisible();
});

test.describe("связанные материалы в статической версии", () => {
  test.use({ javaScriptEnabled: false });

  test("со страницы разговора открывается дневник и его бланк", async ({ page }) => {
    await page.goto("/blog/posle-razgovora-prokruchivayu-v-golove");
    await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", "https://fvva.ru/images/issue-replay.webp");
    const next = page.getByRole("navigation", { name: "Что почитать дальше" });
    await expect(next.getByRole("link")).toHaveCount(2);
    await next.getByRole("link", { name: /Дневник мыслей/ }).click();
    await expect(page.getByRole("link", { name: "Открыть две страницы дневника в PDF" }))
      .toHaveAttribute("href", "/dnevnik-mysley-kpt.pdf");
  });
});

test("шкала тревоги позволяет исправить ответ из результата и сразу пересчитывает баллы", async ({ page }) => {
  await page.goto("/test/anxiety");
  for (let number = 1; number <= 21; number++) {
    const options = page.getByRole("radio");
    await options.nth(0).check();
    await page.getByRole("button", { name: number < 21 ? "Далее" : "Показать результат", exact: true }).click();
  }
  await expect(page.getByRole("heading", { name: "Результат теста" })).toBeFocused();
  await expect(page.locator(".beck-score")).toHaveText("0 из 63 баллов");
  await page.getByText("Проверить и изменить ответы", { exact: true }).click();
  await page.locator(".beck-index button").first().click();
  await expect(page.getByRole("radio").first()).toBeChecked();
  await page.getByRole("radio").nth(2).check();
  await page.getByRole("button", { name: "Вернуться к результату" }).click();
  await expect(page.locator(".beck-score")).toHaveText("2 из 63 баллов");
  await page.getByRole("link", { name: "Когда с тревогой стоит обратиться за помощью" }).click();
  await page.goBack();
  await expect(page.locator(".beck-score")).toHaveText("2 из 63 баллов");
  await expect(page.getByRole("heading", { name: "Что дальше" })).toBeVisible();
  await page.reload();
  await expect(page.getByText("Вопрос 1 из 21", { exact: true })).toBeVisible();
  await expect(page.getByRole("radio").first()).not.toBeChecked();
});

test("из итога самопроверки можно вернуться к своим отметкам", async ({ page }) => {
  await page.goto("/proverit-sebya");
  const topic = page.locator("#nastroenie");
  await topic.getByRole("checkbox").nth(1).check();
  await topic.getByRole("button", { name: "Посмотреть результат" }).click();
  await expect(topic.getByRole("link", { name: "Пройти шкалу депрессии Бека" })).toHaveAttribute("href", "/test/depression");
  await topic.getByRole("link", { name: "Пройти шкалу депрессии Бека" }).click();
  await page.goBack();
  await topic.getByRole("button", { name: "Изменить ответы" }).click();
  await expect(topic.getByRole("checkbox").nth(1)).toBeChecked();
  await expect(page.locator("#trevoga").getByRole("checkbox").first()).not.toBeChecked();
});
