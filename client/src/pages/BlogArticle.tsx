/**
 * BlogArticle page — Editorial Design
 * Renders individual blog articles from the database with markdown content
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";
import { useMeta } from "@/hooks/useMeta";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = trpc.blog.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  useMeta({
    title: article?.metaTitle || article?.title || "Статья не найдена",
    description: article?.metaDescription || article?.excerpt,
    keywords: article?.metaKeywords || undefined,
    ogImage: article?.image || undefined,
    ogType: "article",
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDF8F0]">
        <Loader2 className="animate-spin text-[#1A3C34]" size={40} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDF8F0]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#1A3C34] mb-4">
            Статья не найдена
          </h1>
          <Link href="/blog">
            <Button className="bg-[#1A3C34] text-[#FDF8F0]">
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
      <section className="bg-[#1A3C34] py-16">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#FDF8F0]/60 hover:text-[#FDF8F0] text-sm mb-6 no-underline transition-colors"
            >
              <ArrowLeft size={14} /> Все статьи
            </Link>
            <span className="block text-[#C4785B] font-medium tracking-widest uppercase text-sm mb-3">
              {article.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#FDF8F0] leading-tight">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article Image */}
      {article.image && (
        <div className="container max-w-4xl mx-auto -mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl"
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
      <section className="py-12 bg-[#FDF8F0]">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-[#1A3C34]
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[#1A3C34]/80 prose-p:leading-relaxed
              prose-li:text-[#1A3C34]/80
              prose-strong:text-[#1A3C34]
              prose-a:text-[#C4785B] prose-a:no-underline hover:prose-a:underline"
          >
            <Streamdown>{article.content}</Streamdown>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 bg-[#1A3C34] rounded-2xl p-8 md:p-12 text-center"
          >
            <h3 className="font-serif text-2xl text-[#FDF8F0] mb-4">
              Нужна профессиональная помощь?
            </h3>
            <p className="text-[#FDF8F0]/70 mb-6 max-w-lg mx-auto">
              Если вы узнали себя в описанных ситуациях, не откладывайте
              обращение к специалисту. Первый шаг — самый важный.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#C4785B] hover:bg-[#B06A4F] text-white px-8 py-5">
                  Записаться на консультацию
                </Button>
              </Link>
              <Link href="/test/depression">
                <Button
                  variant="outline"
                  className="border-[#FDF8F0]/30 text-[#FDF8F0] hover:bg-[#FDF8F0]/10 px-8 py-5"
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
