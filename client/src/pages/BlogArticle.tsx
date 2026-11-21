import { lazy, Suspense } from "react";
import { useParams, Link } from "wouter";
import Markdown from "react-markdown";
import ContinueReading from "@/components/ContinueReading";
import DiarySpread from "@/components/DiarySpread";
import { articles, type Article } from "@/lib/articles";
import { useMeta } from "@/hooks/useMeta";
import NotFound from "./NotFound";
import { articleArt } from "./reading-topics";
import "./reading.css";

// Keep the article readable in static HTML. Browsers load the Markdown parser on demand.
const ArticleMarkdown = import.meta.env.SSR
  ? Markdown
  : lazy(() => import("react-markdown"));

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);
  return article ? <ArticleView article={article} /> : <NotFound />;
}

function ArticleView({ article }: { article: Article }) {
  const repeatedHeading = `## ${article.title}\n\n`;
  const body = article.content.startsWith(repeatedHeading)
    ? article.content.slice(repeatedHeading.length)
    : article.content;
  const sections = body
    .split("\n")
    .flatMap((line, index) => {
      const heading = /^##\s+(.+?)\s*$/.exec(line);
      return heading ? [{ title: heading[1], line: index + 1 }] : [];
    })
    .map((section, index) => ({ ...section, id: `razdel-${index + 1}` }));
  const targets = new Map(sections.map(section => [section.line, section.id]));
  const showContents = sections.length >= 4;
  const contents = (
    <ul>
      {sections.map(section => (
        <li key={section.id}>
          <a href={`#${section.id}`}>{section.title}</a>
        </li>
      ))}
    </ul>
  );
  const illustration = articleArt[article.slug];
  const isDiary = article.slug === "dnevnik-mysley-kpt";
  useMeta({
    title: article.meta.title || article.title,
    description: article.meta.description || article.excerpt,
    keywords: article.meta.keywords,
    ogImage: isDiary ? "/images/dnevnik-primer.webp" : illustration?.src || article.image,
    ogType: "article",
  });

  return (
    <div className="reading-room">
      <article className="reading-page">
        <header
          className={
            isDiary
              ? "article-opening with-image with-diary"
              : illustration
                ? "article-opening with-image"
                : "article-opening"
          }
        >
          <div>
            <Link href="/blog" className="reading-back">
              Все статьи
            </Link>
            <h1>{article.title}</h1>
          </div>
          {isDiary && <DiarySpread />}
          {illustration && (
            <img
              src={illustration.src}
              alt=""
              width="960"
              height="640"
              decoding="async"
              fetchPriority="high"
              style={{ backgroundImage: `url(${illustration.placeholder})` }}
            />
          )}
        </header>
        <div
          className={
            showContents ? "reading-body with-contents" : "reading-body"
          }
        >
          {showContents && (
            <nav className="article-contents" aria-label="В этой статье">
              <div className="contents-wide">
                <p>В этой статье</p>
                {contents}
              </div>
              <details className="contents-narrow">
                <summary>В этой статье</summary>
                {contents}
              </details>
            </nav>
          )}
          <div className="reading-column">
            <div className="prose reading-prose">
              <Suspense fallback={<p role="status">Загрузка статьи…</p>}>
                <ArticleMarkdown
                  components={{
                    h2: ({ node, children }) => (
                      <h2
                        id={targets.get(node?.position?.start.line ?? 0)}
                        tabIndex={-1}
                      >
                        {children}
                      </h2>
                    ),
                  }}
                >
                  {body}
                </ArticleMarkdown>
              </Suspense>
            </div>
            <nav className="reading-after" aria-label="После статьи">
              {article.relatedTest && (
                <Link href={`/test/${article.relatedTest}`}>
                  {article.relatedTest === "anxiety"
                    ? "Пройти тест на тревогу"
                    : "Пройти тест на депрессию"}
                </Link>
              )}
              <Link href="/contact">Записаться на консультацию</Link>
            </nav>
          </div>
        </div>
        <ContinueReading slug={article.slug} />
      </article>
    </div>
  );
}
