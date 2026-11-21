import { Link } from "wouter";
import { ArrowRight, FileText } from "lucide-react";
import { articles } from "@/lib/articles";
import { useMeta } from "@/hooks/useMeta";
import "./reading.css";

const diary = articles.find((article) => article.slug === "dnevnik-mysley-kpt");

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
        <header className="library-intro">
          <h1>Полезные статьи</h1>
          <p>
            Статьи о тревоге, сниженном настроении и повседневных ситуациях, связанных с
            ментальным здоровьем. Практические советы и научно обоснованная информация.
          </p>
        </header>
        {diary && (
          <article className="library-diary">
            <div className="library-diary-copy">
              <p className="reading-topic">{diary.category}</p>
              <h2><Link href={`/blog/${diary.slug}`}>{diary.title}</Link></h2>
              <p>{diary.excerpt}</p>
              <Link href={`/blog/${diary.slug}`} className="reading-link">
                Открыть пример <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <a href="/dnevnik-mysley-kpt.pdf" className="diary-preview">
              <img src="/images/dnevnik-blank.webp" alt="" width="690" height="439" className="diary-preview-sheet" />
              <span><FileText size={17} aria-hidden="true" /> Бланк для печати · PDF</span>
            </a>
          </article>
        )}
        {articles.length === 0 ? (
          <p className="library-empty">Статьи скоро появятся.</p>
        ) : (
          <div className="library-shelves">
            {articles.filter((article) => article !== diary).map((article) => (
              <article className="library-entry" key={article.slug}>
                <Link href={`/blog/${article.slug}`}>
                  <div className="library-entry-text">
                    <p className="reading-topic">{article.category}</p>
                    <h2>{article.title}</h2>
                    <p className="library-excerpt">{article.excerpt}</p>
                  </div>
                  {article.image && <img src={article.image} alt="" loading="lazy" decoding="async" />}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
