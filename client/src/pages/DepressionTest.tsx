/**
 * DepressionTest page — Beck Depression Inventory (BDI-II)
 * Full 21-question test with anonymous scoring
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Progress } from "@/components/ui/progress";
import { useMeta } from "@/hooks/useMeta";

interface Question {
  id: number;
  title: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    title: "Печаль",
    options: [
      "Я не чувствую себя печальным(ой)",
      "Я часто чувствую себя печальным(ой)",
      "Я всё время чувствую себя печальным(ой)",
      "Я настолько печален(на) или несчастен(на), что не могу этого вынести",
    ],
  },
  {
    id: 2,
    title: "Пессимизм",
    options: [
      "Я не испытываю пессимизма или уныния по поводу своего будущего",
      "Я чувствую себя более пессимистично настроенным(ой) по поводу своего будущего, чем обычно",
      "Я не жду, что мои дела наладятся",
      "Я чувствую, что моё будущее безнадёжно и будет только хуже",
    ],
  },
  {
    id: 3,
    title: "Ощущение неудачи",
    options: [
      "Я не чувствую себя неудачником(цей)",
      "Я терпел(а) больше неудач, чем следовало бы",
      "Оглядываясь назад, я вижу множество неудач",
      "Я чувствую, что я полный(ая) неудачник(ца) как личность",
    ],
  },
  {
    id: 4,
    title: "Потеря удовольствия",
    options: [
      "Я получаю столько же удовольствия от жизни, как и раньше",
      "Я не получаю столько же удовольствия от жизни, как раньше",
      "Я получаю очень мало удовольствия от того, что раньше доставляло мне радость",
      "Я не получаю никакого удовольствия от того, что раньше доставляло мне радость",
    ],
  },
  {
    id: 5,
    title: "Чувство вины",
    options: [
      "Я не испытываю особого чувства вины",
      "Я чувствую себя виноватым(ой) за многое из того, что сделал(а) или должен(на) был(а) сделать",
      "Я чувствую себя виноватым(ой) большую часть времени",
      "Я чувствую себя виноватым(ой) постоянно",
    ],
  },
  {
    id: 6,
    title: "Ощущение наказания",
    options: [
      "Я не чувствую, что меня наказывают",
      "Я чувствую, что меня могут наказать",
      "Я ожидаю, что буду наказан(а)",
      "Я чувствую, что меня наказывают",
    ],
  },
  {
    id: 7,
    title: "Отношение к себе",
    options: [
      "Я отношусь к себе так же, как и раньше",
      "Я потерял(а) уверенность в себе",
      "Я разочарован(а) в себе",
      "Я не люблю себя",
    ],
  },
  {
    id: 8,
    title: "Самокритичность",
    options: [
      "Я критикую или виню себя не больше, чем обычно",
      "Я более критичен(на) к себе, чем раньше",
      "Я критикую себя за все свои недостатки",
      "Я виню себя за всё плохое, что происходит",
    ],
  },
  {
    id: 9,
    title: "Суицидальные мысли",
    options: [
      "У меня нет никаких мыслей о суициде",
      "У меня есть мысли о суициде, но я не стал(а) бы их осуществлять",
      "Мне хотелось бы покончить с собой",
      "Я бы покончил(а) с собой при удобном случае",
    ],
  },
  {
    id: 10,
    title: "Плаксивость",
    options: [
      "Я плачу не больше, чем раньше",
      "Я плачу больше, чем раньше",
      "Я плачу по каждому пустяку",
      "Мне хочется плакать, но я не могу",
    ],
  },
  {
    id: 11,
    title: "Беспокойство",
    options: [
      "Я не более беспокоен(йна), чем обычно",
      "Я чувствую себя более беспокойным(ой), чем обычно",
      "Я настолько беспокоен(йна), что мне трудно усидеть на месте",
      "Я настолько беспокоен(йна), что мне нужно постоянно двигаться или что-то делать",
    ],
  },
  {
    id: 12,
    title: "Потеря интереса",
    options: [
      "Я не потерял(а) интерес к другим людям или занятиям",
      "Я меньше, чем раньше, интересуюсь другими людьми и вещами",
      "Я потерял(а) большую часть интереса к другим людям и вещам",
      "Мне трудно интересоваться чем-либо вообще",
    ],
  },
  {
    id: 13,
    title: "Нерешительность",
    options: [
      "Я принимаю решения примерно так же, как и раньше",
      "Мне труднее принимать решения, чем обычно",
      "Мне гораздо труднее принимать решения, чем раньше",
      "У меня проблемы с принятием любых решений",
    ],
  },
  {
    id: 14,
    title: "Ощущение никчёмности",
    options: [
      "Я не чувствую себя никчёмным(ой)",
      "Я не считаю себя таким(ой) же ценным(ой) и полезным(ой), как раньше",
      "Я чувствую себя более никчёмным(ой) по сравнению с другими людьми",
      "Я чувствую себя совершенно никчёмным(ой)",
    ],
  },
  {
    id: 15,
    title: "Потеря энергии",
    options: [
      "У меня столько же энергии, как и раньше",
      "У меня меньше энергии, чем раньше",
      "У меня недостаточно энергии, чтобы делать многие вещи",
      "У меня нет энергии вообще ни на что",
    ],
  },
  {
    id: 16,
    title: "Изменения в режиме сна",
    options: [
      "Мой режим сна не изменился",
      "Я сплю немного больше/меньше, чем обычно",
      "Я сплю значительно больше/меньше, чем обычно",
      "Я сплю почти весь день или просыпаюсь на 1-2 часа раньше и не могу заснуть снова",
    ],
  },
  {
    id: 17,
    title: "Раздражительность",
    options: [
      "Я не более раздражителен(на), чем обычно",
      "Я более раздражителен(на), чем обычно",
      "Я гораздо более раздражителен(на), чем обычно",
      "Я раздражён(а) постоянно",
    ],
  },
  {
    id: 18,
    title: "Изменения аппетита",
    options: [
      "Мой аппетит не изменился",
      "Мой аппетит немного снизился/повысился по сравнению с обычным",
      "Мой аппетит значительно снизился/повысился по сравнению с обычным",
      "У меня совсем нет аппетита или я постоянно хочу есть",
    ],
  },
  {
    id: 19,
    title: "Трудности с концентрацией",
    options: [
      "Я могу сосредоточиться так же хорошо, как и раньше",
      "Я не могу сосредоточиться так же хорошо, как обычно",
      "Мне трудно долго сосредотачиваться на чём-либо",
      "Я не могу сосредоточиться ни на чём",
    ],
  },
  {
    id: 20,
    title: "Усталость",
    options: [
      "Я не чувствую себя более усталым(ой), чем обычно",
      "Я устаю быстрее, чем обычно",
      "Я слишком устал(а) для многих вещей, которые раньше делал(а)",
      "Я слишком устал(а), чтобы делать что-либо",
    ],
  },
  {
    id: 21,
    title: "Потеря интереса к сексу",
    options: [
      "Я не заметил(а) каких-либо изменений в моём интересе к сексу",
      "Я меньше интересуюсь сексом, чем раньше",
      "Сейчас я значительно меньше интересуюсь сексом",
      "Я полностью потерял(а) интерес к сексу",
    ],
  },
];

function getResult(score: number) {
  if (score <= 13) {
    return {
      level: "Минимальная депрессия",
      color: "#4CAF50",
      description:
        "Ваш результат указывает на минимальный уровень депрессивных симптомов. Это нормальный диапазон, который не требует специального вмешательства. Продолжайте заботиться о своём психическом здоровье.",
    };
  }
  if (score <= 19) {
    return {
      level: "Лёгкая депрессия",
      color: "#FFC107",
      description:
        "Ваш результат указывает на лёгкий уровень депрессивных симптомов. Обратите внимание на своё состояние. Если симптомы сохраняются более двух недель, рекомендуется обратиться к специалисту.",
    };
  }
  if (score <= 28) {
    return {
      level: "Умеренная депрессия",
      color: "#FF9800",
      description:
        "Ваш результат указывает на умеренный уровень депрессивных симптомов. Рекомендуется обратиться к психологу или психотерапевту для профессиональной оценки и возможного начала терапии.",
    };
  }
  return {
    level: "Выраженная депрессия",
    color: "#F44336",
    description:
      "Ваш результат указывает на выраженный уровень депрессивных симптомов. Настоятельно рекомендуется обратиться к специалисту. Когнитивно-поведенческая терапия может существенно помочь в вашей ситуации.",
  };
}

export default function DepressionTest() {
  useMeta({
    title: "Тест на депрессию онлайн — Шкала депрессии Бека (BDI-II)",
    description: "Пройдите бесплатный анонимный тест на депрессию по шкале Бека. 21 вопрос, 10 минут, мгновенный результат с интерпретацией. Данные не сохраняются.",
    keywords: "тест на депрессию, шкала Бека, тест Бека, BDI, депрессия тест онлайн, самодиагностика депрессия, опросник депрессии",
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const result = getResult(score);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentQ < totalQuestions - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    }
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
    setCurrentQ(0);
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
            Шкала депрессии Бека (BDI-II)
          </h1>
          <p className="text-[#FDF8F0]/70 mt-3">
            Выберите одно утверждение в каждой группе, которое лучше всего
            описывает ваше состояние за последние две недели, включая сегодня.
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
                        <span className="text-[#1A3C34]/70">0–13 баллов</span>
                        <span className="text-[#4CAF50] font-medium">
                          Минимальная депрессия
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#1A3C34]/5">
                        <span className="text-[#1A3C34]/70">14–19 баллов</span>
                        <span className="text-[#FFC107] font-medium">
                          Лёгкая депрессия
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#1A3C34]/5">
                        <span className="text-[#1A3C34]/70">20–28 баллов</span>
                        <span className="text-[#FF9800] font-medium">
                          Умеренная депрессия
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#1A3C34]/70">29–63 балла</span>
                        <span className="text-[#F44336] font-medium">
                          Выраженная депрессия
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
                    <span>
                      Вопрос {currentQ + 1} из {totalQuestions}
                    </span>
                    <span>{answeredCount} отвечено</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-[#1A3C34]/10" />
                </div>

                {/* Question navigation dots */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {questions.map((q, i) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQ(i)}
                      className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                        i === currentQ
                          ? "bg-[#1A3C34] text-[#FDF8F0]"
                          : answers[q.id] !== undefined
                            ? "bg-[#C4785B] text-white"
                            : "bg-[#1A3C34]/10 text-[#1A3C34]/60 hover:bg-[#1A3C34]/20"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {/* Current question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#1A3C34]/5"
                  >
                    <h3 className="font-serif text-xl text-[#1A3C34] mb-6">
                      {currentQ + 1}. {questions[currentQ].title}
                    </h3>
                    <div className="space-y-3">
                      {questions[currentQ].options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() =>
                            handleAnswer(questions[currentQ].id, optIdx)
                          }
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                            answers[questions[currentQ].id] === optIdx
                              ? "border-[#1A3C34] bg-[#1A3C34]/5"
                              : "border-[#1A3C34]/10 hover:border-[#1A3C34]/30 hover:bg-[#FDF8F0]"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                                answers[questions[currentQ].id] === optIdx
                                  ? "border-[#1A3C34] bg-[#1A3C34]"
                                  : "border-[#1A3C34]/30"
                              }`}
                            >
                              {answers[questions[currentQ].id] === optIdx && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <span className="text-[#1A3C34]/80 text-sm leading-relaxed">
                              {option}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                    disabled={currentQ === 0}
                    className="border-[#1A3C34]/20 text-[#1A3C34]"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Назад
                  </Button>

                  {currentQ < totalQuestions - 1 ? (
                    <Button
                      onClick={() => setCurrentQ(currentQ + 1)}
                      className="bg-[#1A3C34] text-[#FDF8F0]"
                    >
                      Далее <ArrowRight size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={answeredCount < totalQuestions}
                      className="bg-[#C4785B] hover:bg-[#B06A4F] text-white"
                    >
                      Показать результат
                    </Button>
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
