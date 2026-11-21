import { Link } from "wouter";
import BeckQuestionnaire from "@/components/BeckQuestionnaire";
import { useMeta } from "@/hooks/useMeta";

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

const questions = symptoms.map(symptom => ({
  id: symptom.id,
  title: symptom.text,
  options: ratingLabels,
}));

const RESULT_LEVELS = [
  {
    threshold: 7,
    level: "Минимальный уровень",
    description: "Большинство перечисленных ощущений за эту неделю вас совсем не беспокоило. Отдельное ощущение могло быть неприятным даже при небольшой сумме баллов.",
  },
  {
    threshold: 15,
    level: "Лёгкий уровень",
    description: "Сумма учитывает и число ощущений, и то, насколько неприятным было каждое. Ниже можно открыть свои ответы, чтобы вспомнить подробности.",
  },
  {
    threshold: 25,
    level: "Умеренный уровень",
    description: "Посмотрите, какие ощущения за неделю беспокоили вас больше всего. Все ваши отметки доступны ниже.",
  },
  {
    threshold: Infinity,
    level: "Выраженный уровень",
    description: "Ощущения, которые вы отметили как наиболее неприятные, можно назвать при разговоре со специалистом. Список ваших ответов доступен ниже.",
  },
] as const;

function getResult(score: number) {
  return RESULT_LEVELS.find(level => score <= level.threshold) ?? RESULT_LEVELS[RESULT_LEVELS.length - 1];
}

function nextSteps(score: number) {
  const discuss = score > 15;
  return (
    <>
      <p>
        {discuss
          ? "Если эти ощущения мешают вам в обычной жизни, стоит обсудить их с врачом или психологом. Можно взять один недавний пример и рассказать, что вы чувствовали и чем тогда занимались."
          : "Вспомните, что побудило вас пройти тест. Если об этом по-прежнему хочется поговорить, можно обратиться к врачу или психологу даже при небольшом балле."}
      </p>
      {discuss ? (
        <Link href="/contact">Обсудить результат с психологом</Link>
      ) : (
        <Link href="/blog/trevoga-norma-ili-rasstrojstvo">Когда с тревогой стоит обратиться за помощью</Link>
      )}
      {!discuss && <Link href="/contact">Написать Александре</Link>}
      <Link href="/panicheskaya-ataka">Что можно сделать, если тревожно прямо сейчас</Link>
    </>
  );
}

export default function AnxietyTest() {
  useMeta({
    title: "Тест на тревогу онлайн — Шкала тревоги Бека (BAI)",
    description:
      "Бесплатный тест на тревогу по шкале Бека: 21 симптом, около 10 минут. Вы увидите результат сразу. Ответы остаются в вашей вкладке.",
    keywords:
      "тест на тревогу, шкала тревоги Бека, BAI, тревожность тест, тревога онлайн тест, самодиагностика тревога, опросник тревоги",
  });

  return (
    <BeckQuestionnaire
      title="Шкала тревоги Бека (BAI)"
      image="/images/beck-anxiety.webp"
      instructions="Оцените, насколько каждый из перечисленных симптомов беспокоил вас в течение последней недели, включая сегодня."
      questions={questions}
      getResult={getResult}
      levels={RESULT_LEVELS}
      period="за последнюю неделю"
      renderNext={nextSteps}
    />
  );
}
