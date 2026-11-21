import { Link } from "wouter";
import DiarySpread from "@/components/DiarySpread";
import { articles } from "@/lib/articles";
import { useMeta } from "@/hooks/useMeta";
import { articleArt, readingTopics, topicFor } from "./reading-topics";
import "./reading.css";

const diary = articles.find(article => article.slug === "dnevnik-mysley-kpt");
const groups = readingTopics
  .map(topic => ({
    ...topic,
    entries: articles.filter(
      article => article !== diary && topicFor(article) === topic.id
    ),
  }))
  .filter(group => group.entries.length);

export default function Blog() {
  useMeta({
    title: "Блог о тревоге, сниженном настроении и психическом здоровье",
    description:
      "Статьи психолога Александры Федоровой о тревожных расстройствах, панических атаках и повседневных ситуациях. Научно обоснованная информация и практические советы.",
    keywords:
      "блог психолога, статьи о тревоге, сниженное настроение, психическое здоровье, КПТ, ACT, психология",
    ogType: "website",
  });

  return (
    <div className="reading-room">
      <div className="reading-library">
        <h1 className="library-name">Статьи и упражнения</h1>
        {diary && (
          <section className="library-lead" aria-labelledby="diary-title">
            <div className="library-lead-copy">
              <h2 id="diary-title">
                <Link href={`/blog/${diary.slug}`}>Дневник мыслей в КПТ</Link>
              </h2>
              <p>
                Коллега не ответил на письмо. Вы подумали: «Я что-то испортил».
                На этом примере можно посмотреть, как заполнить дневник, а затем
                попробовать со своей ситуацией.
              </p>
              <div className="reading-actions">
                <Link href={`/blog/${diary.slug}`}>Прочитать пример</Link>
                <a href="/dnevnik-mysley-kpt.pdf">Скачать бланк в PDF</a>
              </div>
            </div>
            <DiarySpread />
          </section>
        )}
        {groups.length > 0 && (
          <div className="library-index">
            <nav className="library-contents" aria-label="Темы блога">
              <h2>По темам</h2>
              {groups.map(group => (
                <a key={group.id} href={`#${group.id}`}>
                  {group.title}
                </a>
              ))}
            </nav>
            <div className="library-sections">
              {groups.map(group => (
                <section id={group.id} key={group.id} className="library-topic">
                  <h2>{group.title}</h2>
                  <ul>
                    {group.entries.map((article, index) => {
                      const art = articleArt[article.slug];
                      return (
                        <li key={article.slug}>
                          <Link
                            className={`catalog-entry${art ? " illustrated" : ""}${index === 0 && art ? " catalog-feature" : ""}`}
                            href={`/blog/${article.slug}`}
                          >
                            {art && (
                              <img
                                src={art.src}
                                alt=""
                                width="960"
                                height="640"
                                loading="lazy"
                                decoding="async"
                                style={{
                                  backgroundImage: `url(${art.placeholder})`,
                                }}
                              />
                            )}
                            <div className="catalog-entry-copy">
                              <h3>{article.title}</h3>
                              <p>{article.excerpt}</p>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
