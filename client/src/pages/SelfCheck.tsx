import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";
import { createCheckResultMemory } from "@/lib/check-result-memory";
import "./self-check.css";

interface Topic {
  id: string;
  label: string;
  title: string;
  subject: string;
  statements: string[];
  scale: { href: string; label: string };
  reading: { href: string; label: string };
  followup: string;
}

const topics: Topic[] = [
  {
    id: "trevoga",
    label: "Тревога",
    title: "Беспокоит ли вас тревога?",
    subject: "о тревоге",
    scale: { href: "/test/anxiety", label: "Пройти шкалу тревоги Бека" },
    reading: {
      href: "/blog/trevoga-norma-ili-rasstrojstvo",
      label: "Почитать о тревоге",
    },
    followup:
      "Если захотите подробнее отметить, какие ощущения вас беспокоили, для этого есть шкала тревоги Бека.",
    statements: [
      "Часто ловлю себя на тревожных мыслях, которые трудно остановить.",
      "Тело будто на взводе: напряжение, учащённое сердцебиение, трудно расслабиться.",
      "Много беспокоюсь о том, что может случиться.",
      "Тревога мешает сосредоточиться, спать или отдыхать.",
      "Стараюсь избегать ситуаций, которые вызывают тревогу.",
      "Из-за тревоги бывает трудно заниматься обычными делами.",
    ],
  },
  {
    id: "nastroenie",
    label: "Настроение",
    title: "Как меняется настроение?",
    subject: "о настроении",
    scale: { href: "/test/depression", label: "Пройти шкалу депрессии Бека" },
    reading: {
      href: "/blog/chto-takoe-depressiya",
      label: "Почитать о сниженном настроении",
    },
    followup:
      "Если захотите подробнее описать изменения в настроении и повседневной жизни, для этого есть шкала депрессии Бека.",
    statements: [
      "Большую часть времени настроение подавленное или пустое.",
      "Почти всё, что раньше радовало, сейчас не радует.",
      "Мало сил и энергии, многое даётся через силу.",
      "Сон или аппетит заметно изменились.",
      "Часто думаю о себе плохо или виню себя.",
      "Трудно поверить, что впереди будет что-то хорошее.",
    ],
  },
];

const completed = createCheckResultMemory<{ selected: number[]; none: boolean }>();

function MiniCheck({ topic }: { topic: Topic }) {
  const [returned] = useState(() => completed.read(topic.id));
  const [selected, setSelected] = useState<number[]>(returned?.selected ?? []);
  const [none, setNone] = useState(returned?.none ?? false);
  const [shown, setShown] = useState(Boolean(returned));
  const focusNext = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstOption = useRef<HTMLInputElement>(null);
  const noneOption = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!focusNext.current) return;
    focusNext.current = false;
    const target = shown
      ? heading.current
      : none
        ? noneOption.current
        : firstOption.current;
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [shown, none]);

  function toggle(index: number) {
    setNone(false);
    setSelected(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  }

  function showResult(value: boolean) {
    if (value) completed.save(topic.id, { selected, none });
    else completed.clear(topic.id);
    focusNext.current = true;
    setShown(value);
  }

  const count = selected.length;
  const hasAnswer = count > 0 || none;
  const resultTitle = none
    ? "Ничего из списка вам не подошло"
    : count === 1
      ? "Вам знаком один пункт"
      : count <= 3
        ? "Несколько пунктов вам знакомы"
        : "Многое из этого вам знакомо";
  const explanation = none
    ? "Если вас беспокоит что-то другое, об этом тоже можно поговорить. Можно начать с одной ситуации, которую вы хорошо помните."
    : count === 1
      ? "Можно присмотреться к конкретному эпизоду. Когда вы заметили это в последний раз и как это повлияло на ваш день?"
      : count <= 3
        ? topic.followup
        : "Можно выбрать то, что больше всего мешает обычным делам, и обсудить это с психологом. Отмеченные пункты пригодятся как начало разговора.";

  return (
    <section
      id={topic.id}
      className="check-topic"
      aria-labelledby={topic.id + "-heading"}
    >
      <div className="check-topic-intro">
        <h2 id={topic.id + "-heading"}>{topic.title}</h2>
        {shown ? (
          <p>Здесь собраны ваши наблюдения за последние две недели.</p>
        ) : (
          <>
            <p>
              Вспомните последние две недели. Можно отметить несколько пунктов.
            </p>
            <Link className="check-scale-link" href={topic.scale.href}>
              {topic.scale.label}
            </Link>
          </>
        )}
      </div>
      {shown ? (
        <div className="check-answer">
          <p className="check-answer-context">
            Вы отметили {count} из {topic.statements.length} пунктов{" "}
            {topic.subject}
          </p>
          <h3 ref={heading} tabIndex={-1}>
            {resultTitle}
          </h3>
          <p>{explanation}</p>
          {!none && (
            <details>
              <summary>Что вы отметили</summary>
              <ul>
                {topic.statements.map(
                  (line, i) =>
                    selected.includes(i) && <li key={line}>{line}</li>
                )}
              </ul>
            </details>
          )}
          <div className="check-destinations">
            {count > 3 && <Link href="/contact">Написать Александре</Link>}
            {count <= 1 && (
              <Link href={topic.reading.href}>{topic.reading.label}</Link>
            )}
            <Link href={topic.scale.href}>{topic.scale.label}</Link>
            {count <= 3 && <Link href="/contact">Написать Александре</Link>}
          </div>
          <button
            type="button"
            className="check-text-action"
            onClick={() => showResult(false)}
          >
            Изменить ответы
          </button>
        </div>
      ) : (
        <div className="check-response">
          <fieldset className="check-options">
            <legend className="sr-only">{topic.title}</legend>
            {topic.statements.map((statement, index) => (
              <label key={statement}>
                <input
                  type="checkbox"
                  ref={index === 0 ? firstOption : undefined}
                  checked={selected.includes(index)}
                  onChange={() => toggle(index)}
                />
                <span>{statement}</span>
              </label>
            ))}
          </fieldset>
          <div className="check-controls">
            <button
              type="button"
              ref={noneOption}
              className="check-none"
              aria-pressed={none}
              onClick={() => {
                setSelected([]);
                setNone(!none);
              }}
            >
              Ничего из перечисленного
            </button>
            <div className="check-submit">
              <button
                type="button"
                className="check-button"
                disabled={!hasAnswer}
                onClick={() => showResult(true)}
              >
                Посмотреть результат
              </button>
              {hasAnswer && (
                <button
                  type="button"
                  className="check-text-action"
                  onClick={() => {
                    setSelected([]);
                    setNone(false);
                    firstOption.current?.focus();
                  }}
                >
                  Снять отметки
                </button>
              )}
            </div>
          </div>
          <noscript>
            <p className="check-static-reading">
              <a href={topic.reading.href}>{topic.reading.label}</a>
            </p>
          </noscript>
        </div>
      )}
    </section>
  );
}

export default function SelfCheck() {
  useMeta({
    title: "Быстрая самопроверка — признаки тревоги и сниженного настроения",
    description:
      "Короткая самопроверка за пару минут: похоже ли ваше состояние на тревогу или сниженное настроение. Это не диагноз — мягкий повод присмотреться к себе.",
    keywords:
      "самопроверка тревога, признаки тревоги, признаки апатии, чек-лист тревога, тест нужен ли психолог, как понять что у меня тревога",
  });

  return (
    <div className="check-page">
      <noscript>
        <style>
          {
            ".check-page .check-controls, .check-page .check-options input {display:none}"
          }
        </style>
      </noscript>
      <header className="check-intro">
        <img src="/images/check-observe.webp" width="900" height="600" alt="" />
        <div>
          <h1>Самопроверка</h1>
          <p>
            Что вы заметили за последние две недели? В каждом списке шесть
            наблюдений. Выберите тему, которая сейчас ближе, или пройдите обе.
          </p>
          <nav aria-label="Темы самопроверки">
            {topics.map(topic => (
              <a key={topic.id} href={"#" + topic.id}>
                {topic.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <p className="check-note">
        Это способ описать своё самочувствие. Для диагноза нужна оценка
        специалиста. Ответы остаются в этой вкладке и исчезают после
        перезагрузки.
      </p>
      <noscript>
        <p className="check-offline">
          Списки можно прочитать ниже. Чтобы отметить ответы и увидеть итог,
          включите JavaScript.
        </p>
      </noscript>
      {topics.map(topic => (
        <MiniCheck key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
