/**
 * BlogArticle page — Liquid Glass over the warm editorial palette.
 * Renders individual blog articles from static data (articles.ts).
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/lib/articles";
import { Streamdown } from "streamdown";
import { useMeta } from "@/hooks/useMeta";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  useMeta({
    title: article?.meta.title || article?.title || "Статья не найдена",
    description: article?.meta.description || article?.excerpt,
    keywords: article?.meta.keywords || undefined,
    ogImage: article?.image || undefined,
    ogType: "article",
  });

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="glass rounded-3xl p-10 text-center">
          <h1 className="text-3xl text-forest mb-4">Статья не найдена</h1>
          <Link href="/blog">
            <Button className="rounded-full bg-forest hover:bg-forest-deep text-cream">
              <ArrowLeft size={16} className="mr-2" /> Вернуться к блогу
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            className="glass rounded-3xl p-8 md:p-10"
          >
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-forest
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-ink/80 prose-p:leading-relaxed
                prose-li:text-ink/80
                prose-strong:text-forest
                prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline"
            >
              <Streamdown>{article.content}</Streamdown>
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
              <Link href="/contact">
                <Button className="rounded-full bg-terracotta hover:bg-terracotta-deep text-white px-8 py-5 transition-transform duration-200 hover:-translate-y-0.5">
                  Записаться на консультацию
                </Button>
              </Link>
              <Link href="/test/depression">
                <Button
                  variant="outline"
                  className="rounded-full bg-cream/10 backdrop-blur border-cream/30 text-cream hover:bg-cream/20 hover:text-cream px-8 py-5"
                >
                  Пройти тест <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
