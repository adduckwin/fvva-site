import { Link } from "wouter";
import { DESK_PREVIEWS } from "@/lib/desk-placeholders";
import DiaryLeaves from "@/components/DiaryLeaves";
import { PractitionerSchema } from "@/components/SearchSchema";
import { useMeta } from "@/hooks/useMeta";
import { PRACTICE } from "@/lib/practice";
import { articles } from "@/lib/articles";
import { articleArt } from "./reading-topics";
import "./home.css";

const EDUCATION = [
  {
    school: "РГГУ, Институт психологии им. Л. С. Выготского",
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
    text: "Разбираем недавний эпизод. Что в нём произошло? Какая мысль первой пришла в голову? Что вы сделали потом? Так легче заметить привычную реакцию и решить, хотите ли вы попробовать поступить иначе.",
  },
  {
    title: "Практика принятия и ответственности (ACT)",
    text: "Учимся замечать тяжёлые мысли и чувства. Обсуждаем, что для вас важно и какой шаг в эту сторону посилен сейчас.",
  },
  {
    title: "Подход, сфокусированный на сострадании (CFT)",
    text: "Замечаем, как вы говорите с собой, когда что-то не получилось. Ищем слова поддержки, которым вы сами сможете поверить.",
  },
];

const featuredThumbnails: Record<string, string | undefined> = {
  "chto-takoe-depressiya": "/images/thumbs/studio-mood",
  "trevoga-norma-ili-rasstrojstvo": "/images/thumbs/studio-anxiety",
  "kak-kpt-pomogaet": "/images/thumbs/folio-cbt",
};

const readingLead = articles.find(article => article.slug === "kak-poprosit-o-podderzhke");

export default function Home() {
  useMeta({
    title: "КПТ-психолог онлайн при тревоге и апатии — Александра Федорова",
    description: `Онлайн-консультации в подходе КПТ с Александрой Федоровой. С чем можно прийти, как проходит первая встреча и как записаться. Встреча длится ${PRACTICE.sessionLength}, стоимость по запросу.`,
    ogType: "website",
  });

  return (
    <div className="practice-home">
      <PractitionerSchema />
      <section
        className="studio-intro studio-width"
        aria-labelledby="home-title"
      >
        <h1 id="home-title">
          КПТ-психолог{" "}
          <br />
          онлайн
        </h1>
        <figure className="studio-cover">
          <img
            className="studio-cover-paper"
            src="/images/desk-cover.webp"
            width="1280"
            height="880"
            alt=""
            style={{ backgroundImage: "url(" + DESK_PREVIEWS.cover + ")" }}
          />
          <img
            className="studio-cover-portrait"
            src="/images/alexandra.jpg"
            width="820"
            height="1080"
            alt="Александра Федорова"
            fetchPriority="high"
          />
        </figure>
        <div className="studio-intro-body">
          <p>
            Я Александра Федорова. Ко мне приходят, когда тревога мешает решиться
            на важный разговор или <a className="studio-inline" href="#pri-apatii">из-за апатии</a> трудно взяться за привычные дела.
            Мы встречаемся по видеосвязи.
          </p>
          <Link className="studio-invitation" href="/contact">
            Записаться на консультацию
          </Link>
          <p className="studio-terms">
            Встреча длится {PRACTICE.sessionLength}. Стоимость{" "}
            {PRACTICE.priceSummary.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="studio-opening studio-width">
        <div>
          <h2>С чего начать разговор</h2>
          <img
            className="studio-note"
            src="/images/studio-note.webp"
            width="480"
            height="480"
            loading="lazy"
            alt=""
          />
        </div>
        <div>
          <p>
            Разговор давно закончился, а вы всё ещё{" "}
            <Link className="studio-inline" href="/blog/posle-razgovora-prokruchivayu-v-golove">прокручиваете его в голове</Link>.
            Вспоминаете, что сказали и как на вас посмотрели. С такого эпизода можно
            начать <Link className="studio-inline" href="/psiholog-pri-trevoge">консультацию при тревоге</Link>.
          </p>
          <section id="pri-apatii" className="studio-apathy" aria-labelledby="apathy-heading">
            <h3 id="apathy-heading">С чем прийти к психологу при апатии</h3>
            <p>
              Можно начать с одного вечера. Например, «Я всегда любила готовить.
              А вчера открыла рецепт, прочитала две строчки и закрыла.
              Даже выбирать, что будет на ужин, расхотелось».
            </p>
            <p>
              На <a className="studio-inline" href="#pervaya-vstrecha">первой встрече</a> я
              спрошу, давно ли вы это замечаете и чего вам больше всего не хватает.
              Может быть, вы скучаете по самой готовке, а может, по ужинам с друзьями,
              ради которых хотелось что-нибудь придумать.
            </p>
            <p className="studio-terms">
              Встречаемся по видеосвязи. Консультация длится {PRACTICE.sessionLength}.
              Стоимость {PRACTICE.priceSummary.toLowerCase()}.
            </p>
            <Link className="studio-link" href="/contact">Узнать стоимость и выбрать время в Telegram или MAX</Link>
          </section>
        </div>
      </section>

      <section
        id="podhod"
        className="studio-approach studio-width"
        aria-labelledby="approach-heading"
      >
        <div className="studio-approach-copy">
          <h2 id="approach-heading">Как я работаю</h2>
          <p>
            Мы берём пример из вашей жизни и разбираем, что вы подумали, что
            почувствовали и как поступили. В когнитивно-поведенческом подходе
            (КПТ) для этого иногда используют дневник мыслей.
          </p>
          <div className="studio-disclosures">
            {methods.map(method => (
              <details key={method.title}>
                <summary>{method.title}</summary>
                <p>{method.text}</p>
              </details>
            ))}
          </div>
        </div>
        <DiaryLeaves />
      </section>

      <section id="pervaya-vstrecha" className="studio-width studio-meeting">
        <div>
          <h2>Первая консультация</h2>
          <p>
            Можно прийти без готового запроса. Мы начинаем с того, что вы готовы
            рассказать.
          </p>
          <Link className="studio-link" href="/faq">
            Вопросы перед первой встречей
          </Link>
          <img className="studio-meeting-photo" src="/images/desk-conversation.webp" width="1008" height="672" loading="lazy" alt="" style={{ backgroundImage: "url(" + DESK_PREVIEWS.conversation + ")" }} />
        </div>
        <ol>
          {steps.map(step => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="obrazovanie" className="studio-width studio-education">
        <details>
          <summary>
            <img src="/images/desk-studies.webp" width="900" height="600" loading="lazy" alt="" style={{ backgroundImage: "url(" + DESK_PREVIEWS.studies + ")" }} />
            <span>Образование и квалификация</span>
          </summary>
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
        </details>
      </section>

      <section id="chtenie" className="studio-width studio-bookshelf" aria-labelledby="shelf-title">
        <div className="shelf-heading">
          <h2 id="shelf-title">Что почитать</h2>
          <Link href="/blog" className="studio-link">Все статьи</Link>
        </div>
        <div className="shelf-body">
          {readingLead && (
            <Link href={"/blog/" + readingLead.slug} className="shelf-feature">
              <img src={articleArt[readingLead.slug]?.src} alt="" width="960" height="640" loading="lazy" />
              <div>
                <h3>{readingLead.title}</h3>
                <p>{readingLead.excerpt}</p>
              </div>
            </Link>
          )}
          <div className="studio-reading">
            <ul>
              {articles.map(article => {
                const thumbnail = featuredThumbnails[article.slug];
                if (!thumbnail) return null;
                return (
                  <li key={article.slug}>
                    <Link href={"/blog/" + article.slug}>
                      <img
                        src={thumbnail + "-160.webp"}
                        srcSet={[80, 160, 240, 360].map(width => `${thumbnail}-${width}.webp ${width}w`).join(", ")}
                        sizes="clamp(4.8rem, 8vw, 7.5rem)"
                        width="120"
                        height="80"
                        loading="lazy"
                        alt=""
                      />
                      <span>{article.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <div className="studio-width studio-resources studio-last">
        <div className="studio-tests">
          <h2>Тесты Бека</h2>
          <p>В каждом тесте 21 вопрос. Ответы остаются в вашей вкладке.</p>
          {[
            { href: "/test/depression", title: "Шкала депрессии Бека" },
            { href: "/test/anxiety", title: "Шкала тревоги Бека" },
          ].map(test => (
            <div key={test.href}>
              <h3>{test.title}</h3>
              <Link className="studio-link" href={test.href}>
                Пройти тест
              </Link>
            </div>
          ))}
        </div>
        <section className="studio-contact">
          <h2>Написать Александре</h2>
          <p>
            Если вы хотите узнать стоимость или выбрать время для разговора,
            напишите мне в Telegram или MAX.
          </p>
          <Link className="studio-invitation" href="/contact">
            Связаться со мной
          </Link>
        </section>
      </div>
    </div>
  );
}
