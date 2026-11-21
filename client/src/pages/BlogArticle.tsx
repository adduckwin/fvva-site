import { lazy, Suspense } from "react";
import { useParams, Link } from "wouter";
import Markdown from "react-markdown";
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
  const illustration = articleArt[article.slug];
  useMeta({
    title: article.meta.title || article.title,
    description: article.meta.description || article.excerpt,
    keywords: article.meta.keywords,
    ogImage: article.image,
    ogType: "article",
  });

  return (
    <div className="reading-room">
      <article className="reading-page">
        <header
          className={
            illustration ? "article-opening with-image" : "article-opening"
          }
        >
          <div>
            <Link href="/blog" className="reading-back">
              Все статьи
            </Link>
            <h1>{article.title}</h1>
          </div>
          {illustration && (
            <img
              src={illustration.src}
              alt=""
              width="960"
              height="640"
              decoding="async"
              style={{ backgroundImage: `url(${illustration.placeholder})` }}
            />
          )}
        </header>
        <div className="prose reading-prose">
          <Suspense fallback={<p role="status">Загрузка статьи…</p>}>
            <ArticleMarkdown>{body}</ArticleMarkdown>
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
      </article>
    </div>
  );
}
