import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, ArrowRight, RotateCcw } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

interface Tier {
  title: string;
  text: string;
}

interface MiniCheckProps {
  eyebrow: string;
  title: string;
  statements: string[];
  testHref: string;
  testLabel: string;
  tiers: [Tier, Tier, Tier];
}

function MiniCheck({ eyebrow, title, statements, testHref, testLabel, tiers }: MiniCheckProps) {
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [shown, setShown] = useState(false);

  const toggle = (i: number) =>
    setSel((prev) => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  const count = sel.size;
  const tier = count <= 1 ? 0 : count <= 3 ? 1 : 2;
  const result = tiers[tier];

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-serif text-2xl text-forest mt-3 mb-1">{title}</h2>
      <p className="text-muted-foreground text-sm mb-5">
        Отметьте то, что было про вас в последние пару недель.
      </p>

      <div className="space-y-2.5">
        {statements.map((st, i) => {
          const on = sel.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              aria-pressed={on}
              className={`w-full flex items-center gap-3 text-left rounded-2xl px-4 py-3 transition-colors ${
                on
                  ? "bg-terracotta/10 border border-terracotta/40"
                  : "bg-cream/40 border border-border hover:border-terracotta/30"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  on ? "bg-terracotta text-white" : "bg-cream border border-border"
                }`}
              >
                {on && <Check size={15} />}
              </span>
              <span className="text-ink/85 text-sm leading-snug">{st}</span>
            </button>
          );
        })}
      </div>

      {!shown ? (
        <button
          onClick={() => setShown(true)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest hover:bg-forest-deep text-cream px-6 py-3 text-sm font-medium transition-colors active:scale-[0.98]"
        >
          Посмотреть результат
          <ArrowRight size={16} />
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl bg-forest/5 border border-forest/15 p-5"
        >
          <p className="font-serif text-lg text-forest mb-1.5">{result.title}</p>
          <p className="text-ink/75 text-sm leading-relaxed mb-4">{result.text}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={testHref}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta hover:bg-terracotta-deep text-white px-5 py-2.5 text-sm font-medium transition-colors no-underline"
            >
              {testLabel}
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="text-terracotta-text hover:text-terracotta-deep text-sm font-medium"
            >
              Написать Александре
            </Link>
            <button
              onClick={() => {
                setShown(false);
                setSel(new Set());
              }}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-forest text-sm transition-colors"
            >
              <RotateCcw size={14} /> Заново
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

const ANXIETY = {
  eyebrow: "Тревога",
  title: "Похоже ли это на тревогу?",
  testHref: "/test/anxiety",
  testLabel: "Пройти тест на тревогу",
  statements: [
    "Часто ловлю себя на тревожных мыслях, которые трудно остановить.",
    "Тело будто на взводе: напряжение, учащённое сердцебиение, трудно расслабиться.",
    "Много беспокоюсь о том, что может случиться.",
    "Тревога мешает сосредоточиться, спать или отдыхать.",
    "Стараюсь избегать ситуаций, которые вызывают тревогу.",
    "Из-за тревоги бывает трудно заниматься обычными делами.",
  ],
  tiers: [
    {
      title: "Похоже, сейчас в целом справляетесь",
      text: "Ярких признаков немного. Если что-то всё же беспокоит — присмотреться к себе никогда не лишне, и вы всегда можете написать.",
    },
    {
      title: "Несколько пунктов — про вас",
      text: "Это не диагноз, но бережный повод присмотреться к своему состоянию. Полный тест на тревогу поможет понять точнее.",
    },
    {
      title: "Многое из этого вам знакомо",
      text: "Возможно, тревоге сейчас нужна поддержка — и это нормально. Полный тест поможет увидеть картину яснее, а поговорить с Александрой можно в любой момент.",
    },
  ] as [Tier, Tier, Tier],
};

const MOOD = {
  eyebrow: "Настроение",
  title: "Похоже ли это на сниженное настроение?",
  testHref: "/test/depression",
  testLabel: "Пройти тест на депрессию",
  statements: [
    "Большую часть времени настроение подавленное или пустое.",
    "Почти всё, что раньше радовало, сейчас не радует.",
    "Мало сил и энергии, многое даётся через силу.",
    "Сон или аппетит заметно изменились.",
    "Часто думаю о себе плохо или виню себя.",
    "Трудно поверить, что впереди будет что-то хорошее.",
  ],
  tiers: [
    {
      title: "Похоже, сейчас в целом справляетесь",
      text: "Ярких признаков немного. Если настроение всё же тревожит — присмотреться к себе не лишне, и вы всегда можете написать.",
    },
    {
      title: "Несколько пунктов — про вас",
      text: "Это не диагноз, но бережный повод присмотреться к себе. Полный тест на депрессию поможет понять точнее.",
    },
    {
      title: "Многое из этого вам знакомо",
      text: "Возможно, состоянию сейчас нужна поддержка — и это нормально, так бывает у многих. Полный тест поможет увидеть яснее, а поговорить с Александрой можно в любой момент.",
    },
  ] as [Tier, Tier, Tier],
};

export default function SelfCheck() {
  useMeta({
    title: "Быстрая самопроверка — признаки тревоги и сниженного настроения",
    description:
      "Короткая самопроверка за пару минут: похоже ли ваше состояние на тревогу или сниженное настроение. Это не диагноз — мягкий повод присмотреться к себе.",
    keywords:
      "самопроверка тревога, признаки тревоги, признаки депрессии, чек-лист тревога, тест нужен ли психолог, как понять что у меня тревога",
  });

  return (
    <div className="container py-14 md:py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto text-center mb-10"
      >
        <motion.span custom={0} variants={fadeUp} className="eyebrow eyebrow-center">
          Быстрая самопроверка
        </motion.span>
        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-3xl md:text-5xl text-forest mt-4 mb-5"
        >
          Стоит ли присмотреться к своему состоянию?
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          className="text-lg text-ink/75 leading-relaxed"
        >
          Это не тест и не диагноз — пара минут, чтобы мягко понять, на что
          похоже ваше состояние. Если захочется — рядом полный тест и
          возможность написать.
        </motion.p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <MiniCheck {...ANXIETY} />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <MiniCheck {...MOOD} />
        </motion.div>
      </div>

      <p className="max-w-2xl mx-auto text-center text-muted-foreground text-sm mt-8">
        Самопроверка носит информационный характер и не заменяет консультацию
        специалиста.
      </p>
    </div>
  );
}
