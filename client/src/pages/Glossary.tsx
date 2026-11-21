import "./glossary.css";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { Search, X } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { GLOSSARY, type GlossaryTerm } from "@/lib/glossary";

const GLOSSARY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Словарь терминов психологии",
  hasDefinedTerm: GLOSSARY.map(term => ({
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
  })),
};

const TERM_GROUPS = new Map<string, GlossaryTerm[]>();
for (const term of [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "ru"))) {
  const letter = term.term[0].toLocaleUpperCase("ru");
  const group = TERM_GROUPS.get(letter);
  if (group) group.push(term);
  else TERM_GROUPS.set(letter, [term]);
}

const TERM_FORMS: Record<string, string> = { one: "термин", few: "термина", many: "терминов", other: "термина" };
const PLURALS = new Intl.PluralRules("ru");
const normalize = (text: string) => text.toLocaleLowerCase("ru").replaceAll("ё", "е");

export default function Glossary() {
  useMeta({
    title: "Словарь терминов психологии — простыми словами",
    description:
      "Понятный словарь терминов о тревоге, апатии и психологии: КПТ, ACT, паническая атака, когнитивные искажения, руминация, заземление и другие — простыми словами от психолога Александры Федоровой.",
    keywords:
      "словарь терминов психология, что такое КПТ, что такое ACT, когнитивные искажения, руминация, паническая атака, психология термины",
  });

  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const search = normalize(query.trim());
  const groups = Array.from(TERM_GROUPS, ([letter, terms]) => ({
    letter,
    terms: search
      ? terms.filter(({ term, definition }) =>
          normalize(term).includes(search) || normalize(definition).includes(search))
      : terms,
  })).filter(group => group.terms.length);
  const count = groups.reduce((total, group) => total + group.terms.length, 0);

  function clearSearch() {
    setQuery("");
    searchRef.current?.focus();
  }

  return (
    <div className="lexicon">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOSSARY_SCHEMA).replace(/</g, "\\u003c") }} />
      <header className="lexicon-opening">
        <h1><span>Словарь</span> психологических терминов</h1>
        <p>Короткие объяснения слов, которые встречаются на сайте и на встречах.</p>
        <div className="lexicon-plate" aria-hidden="true">
          <img src="/images/press-lens.webp" alt="" width="720" height="480" />
        </div>
      </header>

      <div className="lexicon-body">
        <div className="lexicon-tools">
          <div className="lexicon-search" role="search" aria-label="Поиск по словарю">
            <label htmlFor="glossary-search">Поиск по словарю</label>
            <div className="lexicon-field">
              <Search size={17} aria-hidden="true" />
              <input
                type="search"
                ref={searchRef}
                id="glossary-search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Найти термин…"
                aria-controls="glossary-results"
              />
              {query && (
                <button type="button" aria-label="Сбросить поиск" onClick={clearSearch}>
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {groups.length > 0 && (
            <nav className="lexicon-index" aria-label="Алфавитный указатель">
              <p>По алфавиту</p>
              <ul>
                {groups.map(({ letter }) => (
                  <li key={letter}>
                    <a href={`#letter-${letter}`} aria-label={`Термины на букву ${letter}`}>{letter}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <p className="lexicon-count" role="status" aria-atomic="true">
            {count} {TERM_FORMS[PLURALS.select(count)]}
          </p>
        </div>

        <div className="lexicon-results" id="glossary-results">
          {groups.map(({ letter, terms }) => (
            <section key={letter} className="lexicon-group" aria-labelledby={`letter-${letter}`}>
              <h2 id={`letter-${letter}`} tabIndex={-1} className="lexicon-letter">{letter}</h2>
              <div>
                {terms.map(({ slug, term, definition, link }) => (
                  <article key={slug} id={slug} className="lexicon-entry">
                    <h3>{term}</h3>
                    <p>{definition}</p>
                    {link && <Link href={link.href}>{link.label}</Link>}
                  </article>
                ))}
              </div>
            </section>
          ))}
          {count === 0 && (
            <p className="lexicon-empty">
              Ничего не нашлось по запросу «{query}». Попробуйте другое слово — или{" "}
              <Link href="/contact">просто напишите</Link>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
