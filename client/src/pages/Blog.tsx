import { useRef } from "react";
import { Search, X } from "lucide-react";
import { Link } from "wouter";
import { useSearch } from "wouter/use-browser-location";
import DiarySpread from "@/components/DiarySpread";
import { articles, type Article } from "@/lib/articles";
import { useMeta } from "@/hooks/useMeta";
import { articleArt, readingTopics, topicFor } from "./reading-topics";
import "./reading.css";
import "./library-search.css";

const diary = articles.find(article => article.slug === "dnevnik-mysley-kpt");
const sectionLeads: Record<string, string> = {
  trevoga: "posle-razgovora-prokruchivayu-v-golove",
  nastroenie: "prokrastinaciya-i-depressiya",
  blizkie: "kak-poprosit-o-podderzhke",
  terapiya: "chto-skazat-na-pervoy-konsultatsii",
};
const groups = readingTopics
  .map(topic => {
    const entries = articles.filter(article => article !== diary && topicFor(article) === topic.id);
    const lead = entries.find(article => article.slug === sectionLeads[topic.id]);
    return { ...topic, entries: lead ? [lead, ...entries.filter(article => article !== lead)] : entries };
  })
  .filter(group => group.entries.length);

function normalize(text: string) {
  return text.toLocaleLowerCase("ru").replaceAll("ё", "е").replace(/[^а-яa-z0-9]+/g, " ").trim();
}

const searchIndex = articles.map(article => ({
  article,
  text: normalize([
    article.title,
    article.excerpt,
    article.meta.description,
    article.meta.keywords,
    article.category,
    readingTopics.find(topic => topic.id === topicFor(article))?.title,
  ].join(" ")),
}));
const plurals = new Intl.PluralRules("ru");
const articleForms: Record<string, string> = { one: "материал", few: "материала", many: "материалов", other: "материала" };

function CatalogEntry({ article, featured = false }: { article: Article; featured?: boolean }) {
  const art = articleArt[article.slug];
  const image = art?.src ?? (article === diary ? "/images/dnevnik-primer.webp" : undefined);
  return (
    <li>
      <Link
        className={`catalog-entry${image ? " illustrated" : ""}${featured && image ? " catalog-feature" : ""}`}
        href={`/blog/${article.slug}`}
      >
        {image && (
          <img
            className={article === diary ? "catalog-diary-page" : undefined}
            src={image}
            alt=""
            width="960"
            height="640"
            loading="lazy"
            decoding="async"
            style={art ? { backgroundImage: `url(${art.placeholder})` } : undefined}
          />
        )}
        <div className="catalog-entry-copy">
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default function Blog() {
  useMeta({
    title: "Блог о тревоге, сниженном настроении и психическом здоровье",
    description:
      "Статьи психолога Александры Федоровой о тревожных расстройствах, панических атаках и повседневных ситуациях. Научно обоснованная информация и практические советы.",
    keywords:
      "блог психолога, статьи о тревоге, сниженное настроение, психическое здоровье, КПТ, ACT, психология",
    ogType: "website",
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultTitle = useRef<HTMLHeadingElement>(null);
  const query = new URLSearchParams(useSearch()).get("q") ?? "";
  const words = normalize(query).split(" ").filter(Boolean);
  const searching = query.trim().length > 0;
  const matches = searching && words.length
    ? searchIndex.filter(entry => words.every(word => entry.text.includes(word)))
    : [];

  function changeQuery(value: string) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", url);
  }

  function clearQuery() {
    changeQuery("");
    inputRef.current?.focus();
  }

  return (
    <div className="reading-room">
      <div className="reading-library">
        <header className="library-masthead">
          <h1 className="library-name">Статьи и упражнения</h1>
          <form
            className="library-search"
            role="search"
            aria-label="Поиск по библиотеке"
            onSubmit={event => {
              event.preventDefault();
              resultTitle.current?.focus();
            }}
          >
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="library-query">Найти статью</label>
            <input
              ref={inputRef}
              type="search"
              id="library-query"
              placeholder="Найти статью"
              value={query}
              onChange={event => changeQuery(event.target.value)}
              onKeyDown={event => {
                if (event.key === "Escape" && query) {
                  event.preventDefault();
                  clearQuery();
                }
              }}
              autoComplete="off"
              enterKeyHint="search"
              aria-controls="library-items"
            />
            {query && <button type="button" onClick={clearQuery} aria-label="Очистить поиск"><X size={17} aria-hidden="true" /></button>}
          </form>
        </header>
        <div className={searching ? "library-result-count" : "sr-only"} role="status" aria-live="polite" aria-atomic="true">
          {searching && <h2 ref={resultTitle} tabIndex={-1}>{matches.length ? `${matches.length} ${articleForms[plurals.select(matches.length)]}` : "Ничего не нашлось"}</h2>}
        </div>
        <div id="library-items">
          {searching ? (
            <section className="library-matches" aria-label="Результаты поиска">
              {matches.length ? (
                <ul>
                  {matches.map(({ article }) => <CatalogEntry key={article.slug} article={article} />)}
                </ul>
              ) : (
                <div className="library-empty">
                  <p>Попробуйте одно слово, например «сон» или «тревога».</p>
                  <button type="button" onClick={clearQuery}>Посмотреть все материалы</button>
                </div>
              )}
            </section>
          ) : (
            <>
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
                      <a key={group.id} href={`#${group.id}`}>{group.title}</a>
                    ))}
                  </nav>
                  <div className="library-sections">
                    {groups.map(group => (
                      <section id={group.id} key={group.id} className="library-topic">
                        <h2>{group.title}</h2>
                        <ul>
                          {group.entries.map((article, index) => <CatalogEntry key={article.slug} article={article} featured={index === 0} />)}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
