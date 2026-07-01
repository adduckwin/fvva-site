/**
 * AnxietyTest page — Beck Anxiety Inventory (BAI)
 * Full 21-question test with anonymous scoring.
 * Brand chrome uses design tokens (forest / cream / terracotta).
 * Severity colors are an intentional clinical scale — single source: RESULT_LEVELS.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Progress } from "@/components/ui/progress";
import { useMeta } from "@/hooks/useMeta";
import CrisisSupport from "@/components/CrisisSupport";

interface Symptom {
  id: number;
  text: string;
}

const symptoms: Symptom[] = [
  { id: 1, text: "Ощущение онемения или покалывания в теле" },
  { id: 2, text: "Ощущение жары" },
  { id: 3, text: "Дрожь в ногах" },
  { id: 4, text: "Неспособность расслабиться" },
  { id: 5, text: "Страх, что произойдёт самое плохое" },
  { id: 6, text: "Головокружение или ощущение лёгкости в голове" },
  { id: 7, text: "Ускоренное сердцебиение" },
  { id: 8, text: "Неустойчивость" },
  { id: 9, text: "Ощущение ужаса" },
  { id: 10, text: "Нервозность" },
  { id: 11, text: "Ощущение удушья" },
  { id: 12, text: "Дрожь в руках" },
  { id: 13, text: "Шаткость" },
  { id: 14, text: "Страх потери контроля" },
  { id: 15, text: "Затруднённость дыхания" },
  { id: 16, text: "Страх смерти" },
  { id: 17, text: "Испуг" },
  { id: 18, text: "Желудочно-кишечный дискомфорт" },
  { id: 19, text: "Обморочное состояние" },
  { id: 20, text: "Приливы крови к лицу" },
  { id: 21, text: "Усиленное потоотделение (не связанное с жарой)" },
];

const ratingLabels = [
  "Совсем не беспокоило",
  "Слегка, не слишком беспокоило",
  "Умеренно, было неприятно, но терпимо",
  "Сильно, едва мог(ла) вынести",
];

const MAX_SCORE = 63;

/* Clinical severity scale — single source of truth.
   Colors are a warm traffic-light ramp, intentionally distinct from brand chrome. */
const RESULT_LEVELS = [
  {
    threshold: 7,
    level: "Минимальный уровень",
    color: "#5C9A6F",
    description:
      "Уровень тревоги сейчас минимальный — это спокойный диапазон.",
  },
  {
    threshold: 15,
    level: "Лёгкий уровень",
    color: "#D9A441",
    description:
      "Тревога есть, но в лёгкой форме. Хороший момент освоить пару техник саморегуляции; если она усиливается — стоит обсудить это со специалистом.",
  },
  {
    threshold: 25,
    level: "Умеренный уровень",
    color: "#C77D4A",
    description:
      "Тревога ощутимо мешает — и с этим точно можно работать. КПТ и ACT хорошо помогают вернуть опору. Вы не обязаны терпеть это в одиночку.",
  },
  {
    threshold: Infinity,
    level: "Выраженный уровень",
    color: "#B4533B",
    description:
      "Тревога сейчас очень сильная, и вам тяжело — это важно не оставлять без поддержки. Такое состояние поддаётся помощи, и облегчение возможно. Будьте бережны к себе.",
  },
];

function getResult(score: number) {
  return RESULT_LEVELS.find((l) => score <= l.threshold) ?? RESULT_LEVELS[0];
}

function rangeLabel(index: number) {
  const start = index === 0 ? 0 : RESULT_LEVELS[index - 1].threshold + 1;
  const end =
    RESULT_LEVELS[index].threshold === Infinity
      ? MAX_SCORE
      : RESULT_LEVELS[index].threshold;
  return `${start}–${end}`;
}

export default function AnxietyTest() {
  useMeta({
    title: "Тест на тревогу онлайн — Шкала тревоги Бека (BAI)",
    description:
      "Пройдите бесплатный анонимный тест на тревогу по шкале Бека. 21 симптом, 10 минут, мгновенный результат с интерпретацией. Данные не сохраняются.",
    keywords:
      "тест на тревогу, шкала тревоги Бека, BAI, тревожность тест, тревога онлайн тест, самодиагностика тревога, опросник тревоги",
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = symptoms.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const result = getResult(score);
  const showCrisis = score > 15;

  const handleAnswer = (symptomId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [symptomId]: value }));
  };

  const handleSubmit = () => {
    if (answeredCount === totalQuestions) {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-4 lg:pt-6 pb-8">
        <div className="container max-w-3xl mx-auto">
          <div className="glass-dark rounded-3xl p-8 md:p-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cream/60 hover:text-cream text-sm mb-5 no-underline transition-colors"
          >
            <ArrowLeft size={14} /> На главную
          </Link>
          <span className="eyebrow text-terracotta-light">
            Самодиагностика · Шкала Бека
          </span>
          <h1 className="text-3xl md:text-4xl text-cream mt-4">
            Шкала тревоги Бека (BAI)
          </h1>
          <p className="text-cream/70 mt-3">
            Оцените, насколько каждый из перечисленных симптомов беспокоил вас в
            течение последней недели, включая сегодня.
          </p>
          <p className="text-cream/50 text-sm mt-2">
            Тест анонимный. Данные не сохраняются и не передаются третьим лицам.
          </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {showResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="glass-dark rounded-2xl p-8 md:p-12">
                  <h2 className="text-2xl text-forest mb-6 text-center">
                    Результат теста
                  </h2>

                  <div className="text-center mb-8">
                    <div
                      className="inline-flex items-center justify-center w-24 h-24 rounded-full text-white text-3xl font-semibold mb-4"
                      style={{ backgroundColor: result.color }}
                    >
                      {score}
                    </div>
                    <p className="text-lg text-muted-foreground">из {MAX_SCORE} баллов</p>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mt-3">
                      Это снимок вашего состояния за последнюю неделю, а не
                      диагноз. Тревога поддаётся работе, и ей можно научиться
                      управлять.
                    </p>
                  </div>

                  {showCrisis && <CrisisSupport />}

                  <div
                    className="rounded-xl p-6 mb-8"
                    style={{ backgroundColor: result.color + "15" }}
                  >
                    <h3
                      className="text-xl mb-3"
                      style={{ color: result.color }}
                    >
                      {result.level}
                    </h3>
                    <p className="text-ink/70 leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  <div className="bg-cream rounded-xl p-6 mb-8">
                    <h4 className="text-lg text-forest mb-3">
                      Шкала интерпретации
                    </h4>
                    <div className="space-y-2 text-sm">
                      {RESULT_LEVELS.map((lvl, i) => (
                        <div
                          key={lvl.level}
                          className={`flex justify-between items-center py-2 ${
                            i !== RESULT_LEVELS.length - 1
                              ? "border-b border-forest/5"
                              : ""
                          }`}
                        >
                          <span className="text-ink/70">
                            {rangeLabel(i)} баллов
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: lvl.color }}
                          >
                            {lvl.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-ink/50 text-xs text-center mb-8">
                    Результаты теста носят информационный характер и не являются
                    клиническим диагнозом. Для постановки диагноза обратитесь к
                    квалифицированному специалисту.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="rounded-full border-forest text-forest hover:bg-forest hover:text-cream"
                    >
                      <RotateCcw size={16} className="mr-2" /> Пройти заново
                    </Button>
                    <Link href="/contact">
                      <Button className="rounded-full bg-terracotta hover:bg-terracotta-deep text-white transition-transform duration-200 hover:-translate-y-0.5">
                        Записаться на консультацию
                      </Button>
                    </Link>
                  </div>
                  <p className="text-center text-muted-foreground text-sm mt-4">
                    Полноценная работа начинается с первой сессии.
                  </p>
                  <div className="mt-5 text-center">
                    <Link
                      href="/panicheskaya-ataka"
                      className="inline-flex items-center gap-1.5 text-terracotta-text hover:text-terracotta-deep text-sm font-medium"
                    >
                      <Wind size={15} /> Тревога накрывает прямо сейчас? Техники, которые помогают за минуты
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="test"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Прогресс</span>
                    <span>
                      {answeredCount} из {totalQuestions}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2 bg-forest/10" />
                </div>

                {/* All symptoms in a table-like layout */}
                <div className="glass-dark rounded-2xl overflow-hidden">
                  {/* Header row - visible on md+ */}
                  <div className="hidden md:grid md:grid-cols-[1fr_repeat(4,120px)] bg-forest text-cream p-4 text-xs font-medium">
                    <span>Симптом</span>
                    {ratingLabels.map((label, i) => (
                      <span key={i} className="text-center">
                        {label}
                      </span>
                    ))}
                  </div>

                  {symptoms.map((symptom, idx) => (
                    <div
                      key={symptom.id}
                      className={`p-4 md:grid md:grid-cols-[1fr_repeat(4,120px)] md:items-center ${
                        idx % 2 === 0 ? "bg-white" : "bg-cream/50"
                      } ${idx !== symptoms.length - 1 ? "border-b border-forest/5" : ""}`}
                    >
                      <span className="text-ink/80 text-sm font-medium mb-3 md:mb-0 block">
                        {symptom.id}. {symptom.text}
                      </span>

                      {/* Mobile: show labels */}
                      <div className="md:hidden space-y-2 mt-2">
                        {ratingLabels.map((label, value) => (
                          <button
                            key={value}
                            onClick={() => handleAnswer(symptom.id, value)}
                            className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                              answers[symptom.id] === value
                                ? "border-forest bg-forest/5 text-forest"
                                : "border-forest/10 text-muted-foreground"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Desktop: full-cell clickable rating targets */}
                      {ratingLabels.map((label, value) => {
                        const selected = answers[symptom.id] === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            aria-label={label}
                            aria-pressed={selected}
                            onClick={() => handleAnswer(symptom.id, value)}
                            className={`hidden md:flex items-center justify-center self-stretch min-h-[52px] rounded-xl border-2 transition-all ${
                              selected
                                ? "border-forest bg-forest/10"
                                : "border-transparent hover:border-terracotta/40 hover:bg-cream"
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                selected
                                  ? "border-forest bg-forest"
                                  : "border-forest/30"
                              }`}
                            >
                              {selected && (
                                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Submit */}
                <div className="mt-8 text-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={answeredCount < totalQuestions}
                    className="rounded-full bg-terracotta hover:bg-terracotta-deep text-white px-10 py-5 text-base transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Показать результат
                  </Button>
                  {answeredCount < totalQuestions && (
                    <p className="text-ink/50 text-sm mt-3">
                      Ответьте на все {totalQuestions} вопросов, чтобы увидеть
                      результат
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
