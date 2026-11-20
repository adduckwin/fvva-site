/**
 * BlogArticle page — Liquid Glass over the warm editorial palette.
 * Renders individual blog articles from static data (articles.ts).
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles, type Article } from "@/lib/articles";
import NotFound from "./NotFound";
import { lazy, Suspense } from "react";
import Markdown from "react-markdown";
import { useMeta } from "@/hooks/useMeta";

// Render the entire article in the static HTML, while loading the parser on demand in the browser.
const ArticleMarkdown = import.meta.env.SSR ? Markdown : lazy(() => import("react-markdown"));

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  return article ? <ArticleView article={article} /> : <NotFound />;
}

function ArticleView({ article }: { article: Article }) {
  useMeta({
    title: article.meta.title || article.title,
    description: article.meta.description || article.excerpt,
    keywords: article.meta.keywords,
    ogImage: article.image,
    ogType: "article",
  });

  return (
    <div>
      {/* Header */}
      <section className="pt-4 lg:pt-6 pb-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-dark rounded-3xl p-8 md:p-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-cream text-sm mb-6 no-underline transition-colors"
            >
              <ArrowLeft size={14} /> Все статьи
            </Link>
            <span className="block eyebrow text-terracotta-light mb-3">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-cream leading-tight">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article Image */}
      {article.image && (
        <div className="container max-w-4xl mx-auto mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-2xl overflow-hidden ring-1 ring-white/40 shadow-xl"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-dark rounded-3xl p-8 md:p-10"
          >
            <div
              className="prose prose-lg max-w-none space-y-4
                [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:font-semibold [&_h2]:text-2xl
                [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-xl
                [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal
                [&_li]:py-1 [&_strong]:font-semibold [&_a]:underline [&_a]:underline-offset-2"
            >
              <Suspense fallback={<p role="status">Загрузка статьи…</p>}>
                <ArticleMarkdown>{article.content}</ArticleMarkdown>
              </Suspense>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 glass-dark rounded-3xl p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl text-cream mb-4">
              Нужна профессиональная помощь?
            </h3>
            <p className="text-cream/75 mb-6 max-w-lg mx-auto">
              Если вы узнали себя в описанных ситуациях, не откладывайте
              обращение к специалисту. Первый шаг — самый важный.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full bg-terracotta hover:bg-terracotta-deep text-white px-8 py-5 transition-transform duration-200 hover:-translate-y-0.5">
                <Link href="/contact">
                  Записаться на консультацию
                </Link>
              </Button>
              {article.relatedTest && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full bg-cream/10 backdrop-blur border-cream/30 text-cream hover:bg-cream/20 hover:text-cream px-8 py-5"
                >
                  <Link href={`/test/${article.relatedTest}`}>
                    {article.relatedTest === "anxiety" ? "Пройти тест на тревогу" : "Пройти тест на депрессию"}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
