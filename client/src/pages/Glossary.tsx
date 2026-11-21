import "./secondary-pages.css";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, ArrowRight } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import { GLOSSARY } from "@/lib/glossary";

const GLOSSARY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Словарь терминов психологии",
  hasDefinedTerm: GLOSSARY.map(term => ({
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
  })),
};

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
    title: "Словарь терминов психологии — простыми словами",
    description:
      "Понятный словарь терминов о тревоге, апатии и психологии: КПТ, ACT, паническая атака, когнитивные искажения, руминация, заземление и другие — простыми словами от психолога Александры Федоровой.",
    keywords:
      "словарь терминов психология, что такое КПТ, что такое ACT, когнитивные искажения, руминация, паническая атака, психология термины",
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

  return (
    <div className="secondary-page container py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOSSARY_SCHEMA).replace(/</g, "\\u003c") }} />
      <motion.div
        initial="hidden"
        animate="visible"
        className="secondary-intro max-w-2xl mx-auto mb-8"
      >
        <motion.h1
          custom={1}
          variants={fadeUp}
          className="secondary-title mb-5"
        >
          Словарь психологических терминов
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          className="text-lg text-ink/75 leading-relaxed"
        >
          Короткие объяснения слов, которые встречаются на сайте и на встречах.
        </motion.p>
      </motion.div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="secondary-search flex items-center gap-3 px-5 py-3">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Найти термин…"
            aria-label="Поиск по словарю"
            className="bg-transparent outline-none flex-1 min-w-0 text-ink placeholder:text-muted-foreground text-sm"
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
            className="glossary-entry scroll-mt-24"
          >
            <h2 className="font-sans text-lg text-forest mb-1.5">{t.term}</h2>
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
