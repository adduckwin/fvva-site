import { lazy, Suspense } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Markdown from "react-markdown";
import { articles, type Article } from "@/lib/articles";
import { useMeta } from "@/hooks/useMeta";
import NotFound from "./NotFound";
import "./reading.css";

// Keep the article readable in static HTML. Browsers load the Markdown parser on demand.
const ArticleMarkdown = import.meta.env.SSR ? Markdown : lazy(() => import("react-markdown"));

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);
  return article ? <ArticleView article={article} /> : <NotFound />;
}

function ArticleView({ article }: { article: Article }) {
  const repeatedHeading = `## ${article.title}\n\n`;
  const body = article.content.startsWith(repeatedHeading)
    ? article.content.slice(repeatedHeading.length)
    : article.content;
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
        <Link href="/blog" className="reading-back">
          <ArrowLeft size={16} aria-hidden="true" /> Все статьи
        </Link>
        <header className={article.image ? "reading-title reading-title-illustrated" : "reading-title"}>
          <div>
            <p className="reading-topic">{article.category}</p>
            <h1>{article.title}</h1>
          </div>
          {article.image && <img src={article.image} alt="" decoding="async" />}
        </header>
        <div className="prose reading-prose">
          <Suspense fallback={<p role="status">Загрузка статьи…</p>}>
            <ArticleMarkdown>{body}</ArticleMarkdown>
          </Suspense>
        </div>
        <aside className="reading-next">
          <h2>Нужна профессиональная помощь?</h2>
          <p>
            Если вы узнали себя в описанных ситуациях, не откладывайте
            обращение к специалисту. Первый шаг — самый важный.
          </p>
          <div className="reading-actions">
            <Link href="/contact" className="reading-book">
              Записаться на консультацию
            </Link>
            {article.relatedTest && (
              <Link href={`/test/${article.relatedTest}`} className="reading-link">
                {article.relatedTest === "anxiety" ? "Пройти тест на тревогу" : "Пройти тест на депрессию"}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        </aside>
      </article>
    </div>
  );
}
