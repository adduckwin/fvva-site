/**
 * Blog page — Editorial Design
 * Lists all blog articles with cards
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/articles";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

export default function Blog() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#1A3C34] py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C4785B] font-medium tracking-widest uppercase text-sm">
              Блог
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#FDF8F0] mt-3">
              Полезные статьи
            </h1>
            <p className="text-[#FDF8F0]/70 mt-4 max-w-2xl text-lg">
              Статьи о депрессии, тревоге и повседневных ситуациях, связанных с
              ментальным здоровьем. Практические советы и научно обоснованная
              информация.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-[#FDF8F0]">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, i) => (
              <motion.div key={article.slug} custom={i} variants={fadeUp}>
                <Link href={`/blog/${article.slug}`} className="no-underline block group h-full">
                  <div className="bg-white rounded-xl overflow-hidden border border-[#1A3C34]/5 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
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
                      <span className="text-[#C4785B] text-xs font-medium tracking-wider uppercase mb-2">
                        {article.category}
                      </span>
                      <h2 className="font-serif text-lg text-[#1A3C34] mb-3 group-hover:text-[#C4785B] transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-[#1A3C34]/60 text-sm leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[#1A3C34] text-sm font-medium mt-4 group-hover:text-[#C4785B] transition-colors">
                        Читать далее <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
