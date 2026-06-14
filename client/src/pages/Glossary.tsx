import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, ArrowRight } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { GLOSSARY } from "@/lib/glossary";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.45 },
  }),
};

export default function Glossary() {
  useMeta({
    title: "Словарь терминов психотерапии — простыми словами",
    description:
      "Понятный словарь терминов о тревоге, депрессии и психотерапии: КПТ, ACT, паническая атака, когнитивные искажения, руминация, заземление и другие — простыми словами от психолога Александры Федоровой.",
    keywords:
      "словарь терминов психология, что такое КПТ, что такое ACT, когнитивные искажения, руминация, паническая атака, психотерапия термины",
  });

  const [q, setQ] = useState("");

  const sorted = useMemo(
    () => [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "ru")),
    [],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return sorted;
    return sorted.filter(
      (t) =>
        t.term.toLowerCase().includes(s) ||
        t.definition.toLowerCase().includes(s),
    );
  }, [q, sorted]);

  // JSON-LD DefinedTermSet
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "Словарь терминов психотерапии",
      hasDefinedTerm: GLOSSARY.map((t) => ({
        "@type": "DefinedTerm",
        name: t.term,
        description: t.definition,
      })),
    });
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, []);

  return (
    <div className="container py-14 md:py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto text-center mb-8"
      >
        <motion.span custom={0} variants={fadeUp} className="eyebrow eyebrow-center">
          Словарь
        </motion.span>
        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-3xl md:text-5xl text-forest mt-4 mb-5"
        >
          Понятным языком о терапии
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          className="text-lg text-ink/75 leading-relaxed"
        >
          Короткие объяснения слов, которые встречаются на сайте и на встречах.
          Без жаргона — чтобы было яснее, что происходит и как это работает.
        </motion.p>
      </motion.div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="glass-dark rounded-full flex items-center gap-3 px-5 py-3">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Найти термин…"
            aria-label="Поиск по словарю"
            className="bg-transparent outline-none flex-1 text-ink placeholder:text-muted-foreground text-sm"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="max-w-2xl mx-auto space-y-3">
        {filtered.map((t, i) => (
          <motion.div
            key={t.slug}
            id={t.slug}
            initial="hidden"
            animate="visible"
            custom={Math.min(i, 8)}
            variants={fadeUp}
            className="glass-dark rounded-2xl p-5 md:p-6 scroll-mt-24"
          >
            <h2 className="font-serif text-lg text-forest mb-1.5">{t.term}</h2>
            <p className="text-ink/75 text-sm leading-relaxed">{t.definition}</p>
            {t.link && (
              <Link
                href={t.link.href}
                className="inline-flex items-center gap-1.5 text-terracotta-text hover:text-terracotta-deep text-sm font-medium mt-3"
              >
                {t.link.label}
                <ArrowRight size={14} />
              </Link>
            )}
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            Ничего не нашлось по запросу «{q}». Попробуйте другое слово — или{" "}
            <Link href="/contact" className="text-terracotta-text font-medium">
              просто напишите
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
