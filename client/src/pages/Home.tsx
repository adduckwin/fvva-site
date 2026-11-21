import { Link } from "wouter";
import { ART_PLACEHOLDERS } from "@/lib/art-placeholders";
import { useMeta } from "@/hooks/useMeta";
import { BOOKING_TERMS, PRACTICE } from "@/lib/practice";
import { articles } from "@/lib/articles";
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
      <section
        className="studio-intro studio-width"
        aria-labelledby="home-title"
      >
        <h1 id="home-title">
          Я Александра,{" "}
          <br />
          психолог.
        </h1>
        <figure className="studio-cover">
          <img
            className="studio-cover-paper"
            src="/images/studio-light.webp"
            width="1200"
            height="800"
            alt=""
            style={{ backgroundImage: "url(" + ART_PLACEHOLDERS.light + ")" }}
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
            Я консультирую онлайн. Ко мне приходят с тревогой и апатией. На
            первой встрече можно рассказать об одной ситуации, которая не
            отпускает.
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
            Разговор давно закончился, а вы всё ещё прокручиваете его в голове.
            Вспоминаете, что сказали и как на вас посмотрели. Можно начать прямо
            с этого.
          </p>
          <p>
            Иногда труднее всего объяснить, почему привычные дела теперь требуют
            столько сил. Об этом тоже можно поговорить.
          </p>
          <a className="studio-link" href="#pervaya-vstrecha">
            Как проходит встреча
          </a>
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
        <aside
          className="studio-example"
          aria-label="Пример из дневника мыслей"
        >
          <h3>Из дневника мыслей</h3>
          <p className="studio-example-intro">
            Вымышленная ситуация из упражнения
          </p>
          <dl>
            <dt>Что произошло?</dt>
            <dd>
              Утром я отправил коллеге макет и попросил посмотреть до пятницы. К
              вечеру четверга ответа не было.
            </dd>
            <dt>Какая мысль мелькнула?</dt>
            <dd>
              «Макет не понравился, а коллега подбирает слова, чтобы мне об этом
              сказать».
            </dd>
          </dl>
          <Link className="studio-link" href="/blog/dnevnik-mysley-kpt">
            Прочитать запись целиком
          </Link>
        </aside>
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

      <section className="studio-width studio-education">
        <details>
          <summary>Образование и квалификация</summary>
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

      <section className="studio-width studio-resources">
        <div className="studio-reading">
          <h2>Что почитать</h2>
          <ul>
            {articles
              .filter(article => featuredSlugs.includes(article.slug))
              .map(article => (
                <li key={article.slug}>
                  <Link href={"/blog/" + article.slug}>{article.title}</Link>
                </li>
              ))}
          </ul>
          <Link href="/blog" className="studio-link">
            Все статьи
          </Link>
        </div>
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
      </section>

      <section className="studio-width studio-contact">
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
  );
}
