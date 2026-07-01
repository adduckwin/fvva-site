/**
 * Blog page — Liquid Glass over the warm editorial palette.
 * Lists all blog articles from static data (articles.ts).
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/articles";
import { useMeta } from "@/hooks/useMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

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
    <div>
      {/* Header */}
      <section className="pt-4 lg:pt-6 pb-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-dark rounded-3xl p-8 md:p-12"
          >
            <span className="eyebrow text-terracotta-light">Блог</span>
            <h1 className="text-4xl md:text-5xl text-cream mt-4">
              Полезные статьи
            </h1>
            <p className="text-cream/75 mt-4 max-w-2xl text-lg">
              Статьи о тревоге, сниженном настроении и повседневных ситуациях, связанных с
              ментальным здоровьем. Практические советы и научно обоснованная
              информация.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container">
          {articles.length === 0 ? (
            <p className="text-center text-muted-foreground py-20 text-lg">
              Статьи скоро появятся.
            </p>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {articles.map((article, i) => (
                <motion.div key={article.slug} custom={i} variants={fadeUp}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="no-underline block group h-full"
                  >
                    <div className="glass-dark rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {article.image && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <span className="text-terracotta text-xs font-medium tracking-wider uppercase mb-2">
                          {article.category}
                        </span>
                        <h2 className="text-lg text-forest mb-3 group-hover:text-terracotta transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-ink/65 text-sm leading-relaxed flex-1">
                          {article.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-2 text-forest text-sm font-medium mt-4 group-hover:text-terracotta transition-colors">
                          Читать далее <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
