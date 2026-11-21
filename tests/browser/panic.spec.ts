import { expect, test } from "@playwright/test";

test.describe("Мобильная помощь при панике", () => {
  test.use({ viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true });

  test("из меню сразу видны первый шаг и оба упражнения, любое можно прервать", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Меню" }).tap();
    await page.getByRole("link", { name: "Помощь сейчас", exact: true }).filter({ visible: true }).first().tap();
    await expect(page.getByText(/Вызовите скорую/)).toBeInViewport({ ratio: 1 });
    await expect(page.getByRole("link", { name: "Подышать" })).toBeInViewport({ ratio: 1 });
    await expect(page.getByText(/Почувствуйте опору под ногами/)).toBeInViewport({ ratio: 1 });
    const grounding = page.getByRole("link", { name: "Пройти по шагам" });
    await expect(grounding).toBeInViewport({ ratio: 1 });
    await grounding.tap();
    const guide = page.getByRole("region", { name: "Оглянитесь вокруг" });
    await expect(guide.getByRole("button", { name: "Дальше" })).toBeInViewport({ ratio: 1 });
    await guide.getByRole("button", { name: "Дальше" }).tap();
    await expect(guide.getByRole("heading", { name: /четыре прикосновения/ })).toBeFocused();
    await guide.getByRole("button", { name: "Остановиться" }).tap();
    await guide.getByRole("button", { name: "Вернуться к шагу 2" }).tap();
    await expect(guide.getByRole("heading", { name: /четыре прикосновения/ })).toBeFocused();
    await guide.getByRole("button", { name: "Назад" }).tap();
    for (let step = 1; step <= 4; step++) {
      await expect(guide.getByText(`Шаг ${step} из 5`)).toBeVisible();
      await guide.getByRole("button", { name: "Дальше" }).tap();
    }
    await guide.getByRole("button", { name: "Завершить" }).tap();
    await expect(guide.getByRole("heading", { name: "Упражнение закончено" })).toBeFocused();
    await guide.getByRole("button", { name: "Начать сначала" }).tap();
    await expect(guide.getByText("Шаг 1 из 5")).toBeVisible();
  });

  test("дыхательная подсказка включается по желанию и останавливается касанием", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/panicheskaya-ataka");
    await page.getByRole("link", { name: "Подышать", exact: true }).tap();
    const guide = page.getByRole("region", { name: "Спокойное дыхание" });
    await expect(guide.getByRole("status")).toBeEmpty();
    await guide.getByRole("button", { name: "Включить подсказку" }).tap();
    await expect(guide.getByRole("status")).toHaveText("Вдох");
    await guide.getByRole("button", { name: "Остановить подсказку" }).tap();
    await expect(guide.getByRole("status")).toBeEmpty();
    await expect(guide.getByRole("button", { name: "Включить подсказку" })).toBeVisible();
  });
});

test.describe("Помощь при отключённом JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("без загрузки сценариев доступны пять шагов и инструкция по дыханию", async ({ page }) => {
    await page.goto("/panicheskaya-ataka");
    await expect(page.locator("main a[href^='tel:']")).toHaveCount(0);
    await page.getByRole("link", { name: "Пройти по шагам" }).click();
    const grounding = page.getByRole("region", { name: "Оглянитесь вокруг" });
    await expect(grounding.getByRole("listitem")).toHaveCount(5);
    await expect(grounding.getByRole("button")).toHaveCount(0);
    const breathing = page.getByRole("region", { name: "Спокойное дыхание" });
    await expect(breathing).toContainText("Дышите легко");
    await expect(breathing.getByRole("button")).toHaveCount(0);
  });
});
