import { Link } from "wouter";
import { ArrowDown, ArrowRight, Clock3 } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { BOOKING_TERMS, PRACTICE } from "@/lib/practice";
import { articles } from "@/lib/articles";
import "./home.css";

const EDUCATION = [
  {
    school: "РГГУ · Институт психологии им. Л. С. Выготского",
    program:
      "Специальная психология; практическая психология и консультирование. Диплом о высшем образовании.",
    year: "2013",
  },
  {
    school: "Институт психологии Smart",
    program:
      "Психолог-консультант с применением методов КПТ. Профессиональная переподготовка.",
    year: "2025",
  },
  {
    school: "СПб институт ДПО для психологов и психотерапевтов",
    program:
      "«КПТ второй и третьей волны: работа с эмоциями — от реструктуризации мышления до сострадания и принятия».",
    year: "2025",
  },
  {
    school: "СПб институт ДПО для психологов и психотерапевтов",
    program:
      "«Методы третьей волны КПТ при работе с травмой: ACT, схема-подход, CFT, DBT».",
    year: "2026",
  },
  {
    school: "OEAEP, Чехия",
    program:
      "Психология эмиграции, кросскультурная психология и консультирование. Международный диплом MBA.",
    year: "2026",
  },
];

const steps = [
  {
    title: "Разговор",
    text: "Вы рассказываете, что вас беспокоит, в удобном для вас темпе. Я слушаю и задаю уточняющие вопросы.",
  },
  {
    title: "Разбор ситуации",
    text: "Вместе разбираем, какие мысли возникли, что вы почувствовали и как поступили в тот момент.",
  },
  {
    title: "План",
    text: "Намечаем формат и первые шаги. Вы решаете, хотите ли продолжать.",
  },
];

const methods = [
  {
    title: "Когнитивно-поведенческий подход (КПТ)",
    text: "КПТ помогает выявить и изменить негативные паттерны мышления, которые поддерживают апатию и тревогу. Мы работаем с автоматическими мыслями, убеждениями и поведенческими стратегиями, формируя более адаптивные способы реагирования.",
  },
  {
    title: "Практика принятия и ответственности (ACT)",
    text: "ACT учит принимать сложные эмоции и мысли, не борясь с ними, а направляя энергию на действия, соответствующие вашим ценностям. Подход развивает психологическую гибкость и помогает жить более осмысленно.",
  },
  {
    title: "Подход, сфокусированный на сострадании (CFT)",
    text: "CFT помогает мягче относиться к себе: работать с самокритикой, чувством вины и стыда, формировать ощущение внутренней безопасности и эмоциональную устойчивость. Особенно полезна тем, кто слишком требователен к себе.",
  },
];

const featuredSlugs = [
  "chto-takoe-depressiya",
  "trevoga-norma-ili-rasstrojstvo",
  "kak-kpt-pomogaet",
];

export default function Home() {
  useMeta({
    title: "КПТ-психолог онлайн при тревоге и апатии — Александра Федорова",
    description: `Консультации Александры Федоровой при тревоге, панических атаках и апатии. ${BOOKING_TERMS}`,
    keywords:
      "психолог, сниженное настроение, апатия, тревога, КПТ, ACT, CFT, ПТСР, психология эмиграции, Александра Федорова, когнитивно-поведенческий подход, тест Бека, психолог онлайн",
    ogType: "website",
    ogImage: "/images/alexandra.jpg",
  });

  return (
    <div className="practice-home">
      <section className="home-width home-intro" aria-labelledby="home-title">
        <div className="home-intro-copy">
          <p className="home-specialty">Психолог · Онлайн-консультации</p>
          <h1 id="home-title">
            Бережная помощь <em>при тревоге</em> и апатии
          </h1>
          <p className="home-lead">
            Работаю в когнитивно-поведенческом подходе (КПТ). Помогаю
            разобраться, что поддерживает тревогу и апатию и с чего можно начать
            изменения.
          </p>
          <div className="home-actions">
            <Link className="home-button" href="/contact">
              Записаться на консультацию{" "}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <a className="home-text-link" href="#pervaya-vstrecha">
              Как проходит встреча <ArrowDown aria-hidden="true" size={16} />
            </a>
          </div>
          <p className="home-terms">
            <Clock3 size={16} aria-hidden="true" />
            <span>
              {PRACTICE.sessionLength} <span aria-hidden="true">·</span>{" "}
              Стоимость — {PRACTICE.priceSummary.toLowerCase()}
            </span>
          </p>
        </div>
        <figure className="home-portrait">
          <img
            src="/images/alexandra.jpg"
            width="820"
            height="1080"
            fetchPriority="high"
            alt="Психолог Александра Федорова"
          />
          <figcaption>
            <span>Александра Федорова</span>
            <a href="#podhod">
              О подходе <ArrowDown size={14} aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </section>

      <section className="home-orientation">
        <div className="home-width home-split">
          <h2>Когда стоит обратиться с тревогой</h2>
          <div>
            <p>
              Например, если вы долго прокручиваете разговоры в голове,
              избегаете встреч или откладываете важные дела из-за беспокойства.
              На консультации можно начать с одной такой ситуации.
            </p>
            <Link
              href="/blog/trevoga-norma-ili-rasstrojstvo"
              className="home-text-link"
            >
              Когда тревога начинает мешать{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section id="pervaya-vstrecha" className="home-width home-chapter">
        <div className="home-split">
          <h2>Как проходит первая консультация</h2>
          <p>
            Можно прийти без готового запроса. Для начала подойдёт пример из
            вашей жизни. Скажем, вы хотите выйти из дома, но тревога каждый раз
            заставляет менять планы.
          </p>
        </div>
        <ol className="home-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <Link href="/faq" className="home-text-link">
          Вопросы перед первой встречей с психологом{" "}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </section>

      <section id="podhod" className="home-methods">
        <div className="home-width home-methods-layout">
          <div>
            <h2>Научно обоснованная помощь при апатии и тревоге</h2>
            <p>
              Когда то, что раньше радовало, давно не радует. Когда найти смыслы
              в жизни не так просто как раньше. Когда затяжная апатия не
              отпускает, а тревога мешает жить. Я работаю с доказательными
              методами — КПТ, ACT, CFT — и помогаю разобраться, что поддерживает
              ваше состояние, и вместе найти путь обратно к себе.
            </p>
            <p>
              Это не просто разговоры. Это бережная, структурированная работа,
              которая помогает вернуть ясность и опору.
            </p>
            <img
              src="/images/hero-bg.webp"
              width="1600"
              height="893"
              loading="lazy"
              alt=""
            />
          </div>
          <div className="home-method-list">
            {methods.map(method => (
              <div key={method.title}>
                <h3>{method.title}</h3>
                <p>{method.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-width home-chapter home-split home-education">
        <h2>Образование и квалификация</h2>
        <ol>
          {EDUCATION.map(item => (
            <li key={item.program}>
              <span>{item.year}</span>
              <div>
                <h3>{item.school}</h3>
                <p>{item.program}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-tests">
        <div className="home-width home-split">
          <div>
            <h2>Тесты Бека онлайн</h2>
            <p>
              Ответы остаются в вашей вкладке. Результат помогает описать своё
              состояние перед разговором со специалистом.
            </p>
          </div>
          <div className="home-test-list">
            {[
              { href: "/test/depression", title: "Шкала депрессии Бека" },
              { href: "/test/anxiety", title: "Шкала тревоги Бека" },
            ].map(test => (
              <div key={test.href}>
                <h3>{test.title}</h3>
                <p>21 вопрос · 10 минут</p>
                <Link href={test.href} className="home-text-link">
                  Пройти тест <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-width home-chapter">
        <div className="home-section-heading">
          <h2>Полезные статьи</h2>
          <Link href="/blog" className="home-text-link">
            Все статьи <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="home-reading">
          {articles
            .filter(article => featuredSlugs.includes(article.slug))
            .map(article => (
              <Link href={"/blog/" + article.slug} key={article.slug}>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </Link>
            ))}
        </div>
      </section>

      <section className="home-contact">
        <div className="home-width home-split">
          <h2>Запись на консультацию</h2>
          <div>
            <p>
              Напишите мне, чтобы узнать стоимость и выбрать время для
              разговора.
            </p>
            <Link className="home-button" href="/contact">
              Связаться со мной <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
