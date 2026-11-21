// Regenerate the public PDF with the project's Playwright dependency and Chrome:
// node scripts/build-anxiety-handout.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const publicDir = new URL("../client/public/", import.meta.url);
const fontFaces = await Promise.all(["cyrillic", "latin"].map(async (subset) => {
  const file = await readFile(new URL(`fonts/rubik-${subset}-wght-normal.woff2`, publicDir));
  const range = subset === "cyrillic" ? "U+0400-045F,U+2116" : "U+0000-00FF,U+2000-206F";
  return `@font-face { font-family: Rubik; font-weight: 300 900; src: url(data:font/woff2;base64,${file.toString("base64")}) format("woff2"); unicode-range: ${range}; }`;
}));

const html = `<!doctype html>
<html lang="ru">
<meta charset="utf-8">
<title>7 техник при тревоге — Александра Фёдорова</title>
<style>
  ${fontFaces.join("\n")}
  @page { size: 94mm 176mm; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #faf9f5; color: #292830; font: 16px/1.4 Rubik, sans-serif; }
  article { width: 94mm; min-height: 176mm; padding: 7mm 6mm 5mm; display: flex; flex-direction: column; break-after: page; }
  article:last-child { break-after: auto; }
  h1, h2, h3, p, ul { margin: 0; }
  article > :is(h1, h2) { font-size: 34px; font-weight: 500; letter-spacing: -0.045em; line-height: 1.05; text-wrap: balance; }
  section :is(h2, h3) { font-size: 19px; font-weight: 550; letter-spacing: -0.025em; line-height: 1.2; margin-bottom: 5px; }
  section { margin-top: 18px; }
  p + p { margin-top: 6px; }
  .urgent { border-left: 3px solid #96543c; padding-left: 11px; }
  .senses { margin: 8px 0; list-style: none; padding: 0; }
  a { color: #454467; text-decoration: underline; }
  footer { display: flex; justify-content: space-between; align-items: baseline; margin-top: auto; padding-top: 15px; font-size: 13px; color: #54505a; }
</style>
<body>
  <article>
    <h1>7 техник при тревоге</h1>
    <section class="urgent">
      <h2>Если сильно болит грудь или очень трудно дышать</h2>
      <p>Вызовите скорую.</p>
      <p>Новые или непривычные симптомы обсудите с врачом, даже если они прошли.</p>
    </section>
    <section>
      <h2>При знакомом приступе</h2>
      <p>Почувствуйте опору под ногами или спиной. Назовите про себя один предмет рядом.</p>
    </section>
    <section>
      <h2>Заземление через пять чувств</h2>
      <ul class="senses">
        <li>5 предметов, которые видите</li>
        <li>4 ощущения от прикосновения</li>
        <li>3 звука вокруг</li>
        <li>2 запаха</li>
        <li>1 вкус</li>
      </ul>
      <p>Можно пропустить любой шаг.</p>
    </section>
    <footer><span>Александра Фёдорова</span><a href="https://fvva.ru/">fvva.ru</a></footer>
  </article>
  <article>
    <h2>Дыхание и движение</h2>
    <section>
      <h3>Удлинённый выдох</h3>
      <p>Вдохните как обычно. Если удобно, выдыхайте чуть медленнее. Можно вернуться к своему ритму в любой момент.</p>
    </section>
    <section>
      <h3>Дыхание по квадрату</h3>
      <p>Попробуйте в спокойное время. Представьте квадрат. Вдохните, сделайте короткую паузу, выдохните и снова сделайте паузу. Каждая сторона задаёт один этап.</p>
      <p>Если пауза неприятна, дышите как обычно или переключитесь на звуки вокруг.</p>
    </section>
    <section>
      <h3>Мягкое движение</h3>
      <p>Если хочется размяться, потянитесь или медленно разожмите ладони. Выберите движение, которое сейчас удобно.</p>
    </section>
    <footer><span>Александра Фёдорова</span><a href="https://fvva.ru/">fvva.ru</a></footer>
  </article>
  <article>
    <h2>Чувства и мысли</h2>
    <section>
      <h3>Назовите эмоцию</h3>
      <p>Попробуйте подобрать слово. Например, скажите себе «Мне сейчас тревожно» или «Мне страшно».</p>
    </section>
    <section>
      <h3>Проверьте мысль</h3>
      <p>Если пугает то, что может случиться, спросите себя «Что я точно знаю? Что пока только предполагаю?»</p>
    </section>
    <section>
      <h3>Заметьте мысль со стороны</h3>
      <p>Если в голове звучит «Я не справлюсь», попробуйте добавить несколько слов. «У меня появилась мысль, что я не справлюсь».</p>
    </section>
    <section>
      <h3>Если тревога возвращается</h3>
      <p>Если тревога мешает вам спать, работать или выходить из дома, об этом можно поговорить с психологом.</p>
    </section>
    <footer><a href="https://t.me/ALEKSA_FVVA">Telegram @ALEKSA_FVVA</a><a href="https://fvva.ru/">fvva.ru</a></footer>
  </article>
</body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: fileURLToPath(new URL("7-tehnik-pri-trevoge.pdf", publicDir)),
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  });
} finally {
  await browser.close();
}
