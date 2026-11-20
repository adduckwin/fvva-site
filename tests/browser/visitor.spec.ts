import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context, baseURL }) => {
  // Synthetic answers must never leave the local test server.
  await context.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort()
  );
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
    const heading = page.getByRole("heading", { level: 3, name: new RegExp("^" + number + "\\.") });
    const options = heading.locator("..").getByRole("button");
    await options.nth(number === 9 ? 3 : 0).click();
    if (number === 9) {
      await expect(page.getByRole("region", { name: "Поддержка прямо сейчас" })).toBeFocused();
      await expect(heading).toBeVisible();
      await page.getByRole("button", { name: "Далее", exact: true }).click();
    }
  }
  await page.getByRole("button", { name: "Показать результат" }).click();
  await expect(page.getByRole("heading", { name: "Результат теста" })).toBeVisible();
  await expect(page.getByRole("main")).toContainText(/3\s*из 63 баллов/);
  await expect(page.getByRole("heading", { name: "Поддержка прямо сейчас" })).toBeVisible();
  await expect(page.getByText(/спокойный диапазон/)).toHaveCount(0);
  expect(unexpected).toEqual([]);
});

test("самопроверка отличает пропуск от явного отрицательного ответа", async ({ page }) => {
  await page.goto("/proverit-sebya");
  const result = page.getByRole("button", { name: "Посмотреть результат" }).first();
  await expect(result).toBeDisabled();
  await page.getByRole("button", { name: "Ничего из перечисленного" }).first().click();
  await result.click();
  await expect(page.getByText(/Похоже, сейчас в целом справляетесь/).first()).toBeVisible();
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

test.describe("сайт без JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("прямая ссылка отдаёт текст статьи и её карточку для мессенджеров", async ({ page }) => {
    const route = "/blog/trevoga-norma-ili-rasstrojstvo";
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toContainText("Тревога");
    await expect(page.locator("main h2").first()).toBeVisible();
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", "https://fvva.ru" + route);
    await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", /^https:\/\/fvva\.ru\/images\//);
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
  await expect(content.getByRole("link", { name: /Паническая атака/ })).toHaveAttribute("href", "/panicheskaya-ataka");
  const download = content.getByRole("link", { name: /скачайте памятку/ });
  await expect(download).toHaveAttribute("href", "/7-tehnik-pri-trevoge.pdf");
  const response = await page.request.get("/7-tehnik-pri-trevoge.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});
