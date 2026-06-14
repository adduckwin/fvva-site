import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Eye, Ear, Hand, Flower2, Coffee, ArrowRight, RotateCcw, FileText, Download } from "lucide-react";
import { useMeta } from "@/hooks/useMeta";
import BoxBreathing from "@/components/BoxBreathing";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const GROUNDING = [
  { n: 5, label: "которые вы видите", icon: Eye, hint: "Оглядитесь и назовите их про себя — не спеша." },
  { n: 4, label: "которые вы слышите", icon: Ear, hint: "Прислушайтесь: близкие и далёкие звуки." },
  { n: 3, label: "которых вы касаетесь", icon: Hand, hint: "Почувствуйте ткань, поверхность, опору под собой." },
  { n: 2, label: "которые чувствуете на запах", icon: Flower2, hint: "Или просто вспомните два любимых запаха." },
  { n: 1, label: "который ощущаете на вкус", icon: Coffee, hint: "Или отметьте вкус во рту прямо сейчас." },
];

function Grounding() {
  const [step, setStep] = useState(0);
  const done = step >= GROUNDING.length;
  const item = GROUNDING[Math.min(step, GROUNDING.length - 1)];
  const Icon = item.icon;

  return (
    <div className="glass-dark rounded-3xl p-8 md:p-10 max-w-xl mx-auto">
      {!done ? (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-terracotta/12 flex items-center justify-center mx-auto mb-5">
            <Icon className="text-terracotta" size={26} />
          </div>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="font-serif text-5xl text-forest leading-none">
              {item.n}
            </span>
            <span className="text-lg text-ink/80">
              {item.n === 1 ? "вещь," : item.n < 5 ? "вещи," : "вещей,"}
            </span>
          </div>
          <p className="text-xl text-forest mb-3">{item.label}</p>
          <p className="text-muted-foreground text-sm mb-7 max-w-sm mx-auto">
            {item.hint}
          </p>
          <button
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex items-center gap-2 rounded-full bg-forest hover:bg-forest-deep text-cream px-6 py-3 text-base font-medium transition-colors active:scale-[0.98]"
          >
            {step === GROUNDING.length - 1 ? "Завершить" : "Дальше"}
            <ArrowRight size={18} />
          </button>
          <div className="flex items-center justify-center gap-2 mt-6">
            {GROUNDING.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i <= step ? "w-6 bg-terracotta" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-serif text-2xl text-forest mb-3">
            Вы здесь и сейчас
          </p>
          <p className="text-ink/75 mb-7 max-w-sm mx-auto">
            Вы вернулись в момент. Если волна ещё не схлынула — это нормально,
            можно пройти круг ещё раз или вернуться к дыханию.
          </p>
          <button
            onClick={() => setStep(0)}
            className="inline-flex items-center gap-2 rounded-full bg-cream-dark hover:bg-border text-forest px-6 py-3 text-base font-medium transition-colors"
          >
            <RotateCcw size={18} />
            Пройти заново
          </button>
        </div>
      )}
    </div>
  );
}

export default function PanicAttack() {
  useMeta({
    title: "Паническая атака: что делать прямо сейчас — техники самопомощи",
    description:
      "Паническая атака — это пугающе, но не опасно, и она пройдёт. Дыхание по квадрату, заземление 5-4-3-2-1 и спокойные шаги, чтобы помочь себе прямо сейчас.",
    keywords:
      "паническая атака что делать, как успокоиться при панической атаке, дыхание при панике, заземление 54321, помощь при тревоге",
  });

  return (
    <div className="relative">
      <div className="container py-14 md:py-20">
        {/* Hero + breathing */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center mb-10"
        >
          <motion.span
            custom={0}
            variants={fadeUp}
            className="eyebrow eyebrow-center"
          >
            Помощь сейчас
          </motion.span>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-3xl md:text-5xl text-forest mt-4 mb-5"
          >
            Паническая атака. Сейчас станет легче.
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-lg text-ink/75 leading-relaxed"
          >
            То, что вы чувствуете, пугает — но это не опасно, и это обязательно
            пройдёт. Давайте вместе замедлим дыхание: медленный выдох даёт телу
            сигнал, что вы в безопасности.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-md mx-auto"
        >
          <BoxBreathing />
        </motion.div>

        {/* Grounding */}
        <section className="mt-20 md:mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8"
          >
            <motion.span custom={0} variants={fadeUp} className="eyebrow eyebrow-center">
              Вернуться в момент
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-2xl md:text-3xl text-forest mt-4"
            >
              Заземление 5-4-3-2-1
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-ink/70 max-w-xl mx-auto mt-3"
            >
              Если мысли разгоняются, мягко переключите внимание на органы чувств.
              Это возвращает из тревожных мыслей в «здесь и сейчас».
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Grounding />
          </motion.div>
        </section>

        {/* Lead magnet — downloadable cheat sheet */}
        <section className="mt-16 md:mt-20 max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="glass-dark rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
          >
            <div className="w-14 h-14 rounded-2xl bg-terracotta/12 flex items-center justify-center shrink-0">
              <FileText className="text-terracotta" size={26} />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl text-forest mb-1">
                Памятка «7 техник при тревоге»
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Короткая шпаргалка на одну страницу — сохраните на телефон, чтобы
                была под рукой в трудную минуту.
              </p>
            </div>
            <a
              href="/7-tehnik-pri-trevoge.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-forest hover:bg-forest-deep text-cream px-6 py-3 text-base font-medium transition-colors shrink-0 active:scale-[0.98]"
            >
              <Download size={18} /> Скачать PDF
            </a>
          </motion.div>
        </section>

        {/* What's happening in the body */}
        <section className="mt-20 md:mt-28 max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-dark rounded-3xl p-8 md:p-10"
          >
            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-2xl text-forest mb-4"
            >
              Что сейчас происходит с телом
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-ink/75 leading-relaxed mb-4"
            >
              Паническая атака — это ложная тревога системы «бей или беги». Тело
              выбросило адреналин, как будто рядом опасность, хотя её нет. Отсюда
              частое сердцебиение, нехватка воздуха, дрожь — очень неприятно, но
              не вредно.
            </motion.p>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-ink/75 leading-relaxed"
            >
              Это всегда временно: пик обычно проходит за несколько минут. Вам не
              нужно «остановить» атаку силой — достаточно дать ей пройти, медленно
              дыша и оставаясь рядом с собой.
            </motion.p>
          </motion.div>
        </section>

        {/* Gentle CTA */}
        <section className="mt-16 md:mt-20 max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <p className="text-ink/75 leading-relaxed mb-5">
              Если приступы повторяются — с паническими атаками хорошо работает
              терапия: можно научиться их предупреждать и меньше их бояться. Когда
              будете готовы, это можно обсудить — без обязательств.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 rounded-full bg-terracotta hover:bg-terracotta-deep text-white px-8 py-3.5 text-base font-medium transition-colors active:scale-[0.98]">
                Написать Александре
                <ArrowRight size={18} />
              </button>
            </Link>
            <p className="text-sm text-muted-foreground mt-6">
              Если вы не уверены, что это паническая атака, чувствуете сильную боль
              в груди или вам становится хуже — позвоните 112.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
