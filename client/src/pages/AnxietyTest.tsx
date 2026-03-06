/**
 * AnxietyTest page — Beck Anxiety Inventory (BAI)
 * Full 21-question test with anonymous scoring
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Progress } from "@/components/ui/progress";

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

function getResult(score: number) {
  if (score <= 7) {
    return {
      level: "Минимальная тревога",
      color: "#4CAF50",
      description:
        "Ваш результат указывает на минимальный уровень тревоги. Это нормальный диапазон, который не требует специального вмешательства.",
    };
  }
  if (score <= 15) {
    return {
      level: "Лёгкая тревога",
      color: "#FFC107",
      description:
        "Ваш результат указывает на лёгкий уровень тревоги. Обратите внимание на своё состояние и используйте техники релаксации. Если симптомы усиливаются, обратитесь к специалисту.",
    };
  }
  if (score <= 25) {
    return {
      level: "Умеренная тревога",
      color: "#FF9800",
      description:
        "Ваш результат указывает на умеренный уровень тревоги. Рекомендуется обратиться к психологу для профессиональной оценки и возможного начала терапии.",
    };
  }
  return {
    level: "Выраженная тревога",
    color: "#F44336",
    description:
      "Ваш результат указывает на выраженный уровень тревоги. Настоятельно рекомендуется обратиться к специалисту. Терапия принятия и ответственности (ACT) и КПТ могут существенно помочь.",
  };
}

export default function AnxietyTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = symptoms.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const result = getResult(score);

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
      <section className="bg-[#1A3C34] py-12">
        <div className="container max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#FDF8F0]/60 hover:text-[#FDF8F0] text-sm mb-4 no-underline transition-colors"
          >
            <ArrowLeft size={14} /> На главную
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-[#FDF8F0]">
            Шкала тревоги Бека (BAI)
          </h1>
          <p className="text-[#FDF8F0]/70 mt-3">
            Оцените, насколько каждый из перечисленных симптомов беспокоил вас в
            течение последней недели, включая сегодня.
          </p>
          <p className="text-[#FDF8F0]/50 text-sm mt-2">
            Тест анонимный. Данные не сохраняются и не передаются третьим лицам.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#FDF8F0]">
        <div className="container max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {showResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-[#1A3C34]/5">
                  <h2 className="font-serif text-2xl text-[#1A3C34] mb-6 text-center">
                    Результат теста
                  </h2>

                  <div className="text-center mb-8">
                    <div
                      className="inline-flex items-center justify-center w-24 h-24 rounded-full text-white text-3xl font-bold mb-4"
                      style={{ backgroundColor: result.color }}
                    >
                      {score}
                    </div>
                    <p className="text-lg text-[#1A3C34]/60">из 63 баллов</p>
                  </div>

                  <div
                    className="rounded-xl p-6 mb-8"
                    style={{ backgroundColor: result.color + "15" }}
                  >
                    <h3
                      className="font-serif text-xl mb-3"
                      style={{ color: result.color }}
                    >
                      {result.level}
                    </h3>
                    <p className="text-[#1A3C34]/70 leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  <div className="bg-[#FDF8F0] rounded-xl p-6 mb-8">
                    <h4 className="font-serif text-lg text-[#1A3C34] mb-3">
                      Шкала интерпретации
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-2 border-b border-[#1A3C34]/5">
                        <span className="text-[#1A3C34]/70">0–7 баллов</span>
                        <span className="text-[#4CAF50] font-medium">
                          Минимальная тревога
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#1A3C34]/5">
                        <span className="text-[#1A3C34]/70">8–15 баллов</span>
                        <span className="text-[#FFC107] font-medium">
                          Лёгкая тревога
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#1A3C34]/5">
                        <span className="text-[#1A3C34]/70">16–25 баллов</span>
                        <span className="text-[#FF9800] font-medium">
                          Умеренная тревога
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#1A3C34]/70">26–63 балла</span>
                        <span className="text-[#F44336] font-medium">
                          Выраженная тревога
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#1A3C34]/50 text-xs text-center mb-8">
                    Результаты теста носят информационный характер и не являются
                    клиническим диагнозом. Для постановки диагноза обратитесь к
                    квалифицированному специалисту.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="border-[#1A3C34] text-[#1A3C34]"
                    >
                      <RotateCcw size={16} className="mr-2" /> Пройти заново
                    </Button>
                    <Link href="/contact">
                      <Button className="bg-[#C4785B] hover:bg-[#B06A4F] text-white">
                        Записаться на консультацию
                      </Button>
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
                  <div className="flex justify-between text-sm text-[#1A3C34]/60 mb-2">
                    <span>Прогресс</span>
                    <span>
                      {answeredCount} из {totalQuestions}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2 bg-[#1A3C34]/10" />
                </div>

                {/* All symptoms in a table-like layout */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#1A3C34]/5 overflow-hidden">
                  {/* Header row - visible on md+ */}
                  <div className="hidden md:grid md:grid-cols-[1fr_repeat(4,120px)] bg-[#1A3C34] text-[#FDF8F0] p-4 text-xs font-medium">
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
                        idx % 2 === 0 ? "bg-white" : "bg-[#FDF8F0]/50"
                      } ${idx !== symptoms.length - 1 ? "border-b border-[#1A3C34]/5" : ""}`}
                    >
                      <span className="text-[#1A3C34]/80 text-sm font-medium mb-3 md:mb-0 block">
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
                                ? "border-[#1A3C34] bg-[#1A3C34]/5 text-[#1A3C34]"
                                : "border-[#1A3C34]/10 text-[#1A3C34]/60"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      {/* Desktop: radio buttons */}
                      {ratingLabels.map((_, value) => (
                        <div
                          key={value}
                          className="hidden md:flex justify-center"
                        >
                          <button
                            onClick={() => handleAnswer(symptom.id, value)}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                              answers[symptom.id] === value
                                ? "border-[#1A3C34] bg-[#1A3C34]"
                                : "border-[#1A3C34]/20 hover:border-[#1A3C34]/40"
                            }`}
                          >
                            {answers[symptom.id] === value && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Submit */}
                <div className="mt-8 text-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={answeredCount < totalQuestions}
                    className="bg-[#C4785B] hover:bg-[#B06A4F] text-white px-10 py-5 text-base"
                  >
                    Показать результат
                  </Button>
                  {answeredCount < totalQuestions && (
                    <p className="text-[#1A3C34]/50 text-sm mt-3">
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
