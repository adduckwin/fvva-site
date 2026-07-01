/**
 * DepressionTest page — Beck Depression Inventory (BDI-II)
 * Full 21-question test with anonymous scoring.
 * Brand chrome uses design tokens (forest / cream / terracotta).
 * Severity colors are an intentional clinical scale — single source: RESULT_LEVELS.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Progress } from "@/components/ui/progress";
import { useMeta } from "@/hooks/useMeta";
import CrisisSupport from "@/components/CrisisSupport";

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

const MAX_SCORE = 63;

/* Clinical severity scale — single source of truth.
   Colors are a warm traffic-light ramp, intentionally distinct from brand chrome. */
const RESULT_LEVELS = [
  {
    threshold: 13,
    level: "Минимальный уровень",
    color: "#5C9A6F",
    description:
      "Сейчас признаков снижения настроения немного — это спокойный диапазон. Если что-то всё же беспокоит, прислушаться к себе всегда полезно.",
  },
  {
    threshold: 19,
    level: "Лёгкий уровень",
    color: "#D9A441",
    description:
      "Похоже, вам сейчас непросто. Это лёгкий уровень — хороший момент поддержать себя; если состояние держится, его стоит обсудить со специалистом. С этим работают, и становится легче.",
  },
  {
    threshold: 28,
    level: "Умеренный уровень",
    color: "#C77D4A",
    description:
      "Вам сейчас тяжело, и это важно не оставлять без внимания. Такое состояние хорошо поддаётся помощи — с поддержкой специалиста становится заметно легче. Это не слабость и не приговор.",
  },
  {
    threshold: Infinity,
    level: "Выраженный уровень",
    color: "#B4533B",
    description:
      "Сейчас вам очень тяжело — и вы заслуживаете поддержки. Это выраженное состояние, но даже из него есть выход: оно поддаётся помощи, и вы не обязаны справляться в одиночку. Будьте бережны к себе — первый шаг можно сделать прямо сейчас.",
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

export default function DepressionTest() {
  useMeta({
    title: "Тест на депрессию онлайн — Шкала депрессии Бека (BDI-II)",
    description:
      "Пройдите бесплатный анонимный тест по шкале Бека. 21 вопрос, 10 минут, мгновенный результат с интерпретацией. Данные не сохраняются.",
    keywords:
      "тест на депрессию, шкала Бека, тест Бека, BDI, депрессия тест онлайн, самодиагностика, опросник",
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const result = getResult(score);
  // Пункт №9 — мысли о суициде. Показываем поддержку при любом ненулевом ответе
  // или при умеренном/выраженном уровне.
  const suicidalAnswer = answers[9] ?? 0;
  const showCrisis = score > 19 || suicidalAnswer > 0;

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
            Шкала депрессии Бека (BDI-II)
          </h1>
          <p className="text-cream/70 mt-3">
            Выберите одно утверждение в каждой группе, которое лучше всего
            описывает ваше состояние за последние две недели, включая сегодня.
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
                      Это снимок вашего состояния за последние две недели, а не
                      диагноз. Состояния меняются, и с этим можно работать.
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
                    <span>
                      Вопрос {currentQ + 1} из {totalQuestions}
                    </span>
                    <span>{answeredCount} отвечено</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-forest/10" />
                </div>

                {/* Question navigation dots */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {questions.map((q, i) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQ(i)}
                      className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                        i === currentQ
                          ? "bg-forest text-cream"
                          : answers[q.id] !== undefined
                            ? "bg-terracotta text-white"
                            : "bg-forest/10 text-muted-foreground hover:bg-forest/20"
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
                    className="glass-dark rounded-2xl p-6 md:p-8"
                  >
                    <h3 className="text-xl text-forest mb-6">
                      {currentQ + 1}. {questions[currentQ].title}
                    </h3>
                    <div className="space-y-3">
                      {questions[currentQ].options.map((option, optIdx) => {
                        const selected =
                          answers[questions[currentQ].id] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() =>
                              handleAnswer(questions[currentQ].id, optIdx)
                            }
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                              selected
                                ? "border-forest bg-forest/5"
                                : "border-forest/10 hover:border-terracotta/40 hover:bg-cream"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                                  selected
                                    ? "border-forest bg-forest"
                                    : "border-forest/30"
                                }`}
                              >
                                {selected && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>
                              <span className="text-ink/80 text-sm leading-relaxed">
                                {option}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                    disabled={currentQ === 0}
                    className="rounded-full border-forest/20 text-forest"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Назад
                  </Button>

                  {currentQ < totalQuestions - 1 ? (
                    <Button
                      onClick={() => setCurrentQ(currentQ + 1)}
                      className="rounded-full bg-forest hover:bg-forest-deep text-cream"
                    >
                      Далее <ArrowRight size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={answeredCount < totalQuestions}
                      className="rounded-full bg-terracotta hover:bg-terracotta-deep text-white transition-transform duration-200 hover:-translate-y-0.5"
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
