import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { createCheckResultMemory } from "@/lib/check-result-memory";
import "./beck.css";

type Answers = Readonly<Record<number, number>>;
const completed = createCheckResultMemory<Answers>();
type Question = { id: number; title: string; options: readonly string[] };
type Level = { threshold: number; level: string };
type Props = {
  title: string;
  image: string;
  instructions: string;
  period: string;
  questions: readonly Question[];
  levels: readonly Level[];
  getResult: (score: number) => { level: string; description: string };
  renderNext: (score: number) => ReactNode;
  renderResultSupport?: (answers: Answers, score: number) => ReactNode;
  immediateSupport?: {
    questionId: number;
    isNeeded: (value: number) => boolean;
    content: ReactNode;
    resultNote: string;
  };
};

function AnswerIndex({ questions, answers, active, result, onChoose }: {
  questions: readonly Question[];
  answers: Answers;
  active?: number;
  result: boolean;
  onChoose: (index: number) => void;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  return (
    <details className="beck-index" ref={details}>
      <summary>{result ? "Проверить и изменить ответы" : "Перейти к вопросу"}</summary>
      <ol>
        {questions.map((question, index) => {
          const value = answers[question.id];
          return (
            <li key={question.id}>
              <button type="button" aria-current={active === index ? "step" : undefined}
                onClick={() => { if (details.current) details.current.open = false; onChoose(index); }}>
                <span className="beck-index-number">{index + 1}</span>
                <span>{question.title}<small>{value === undefined ? "Без ответа" : question.options[value]}</small></span>
              </button>
            </li>
          );
        })}
      </ol>
    </details>
  );
}

export default function BeckQuestionnaire({
  title, image, instructions, period, questions, levels, getResult, renderNext, renderResultSupport, immediateSupport,
}: Props) {
  const [returned] = useState(() => completed.read(title));
  const [answers, setAnswers] = useState<Answers>(returned ?? {});
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState<"questions" | "result" | "edit">(returned ? "result" : "questions");
  const heading = useRef<HTMLHeadingElement>(null);
  const support = useRef<HTMLDivElement>(null);
  const focusTarget = useRef<"question" | "result" | "support" | null>(null);
  const question = questions[index];
  const chosen = answers[question.id];
  const firstMissing = questions.findIndex(item => answers[item.id] === undefined);
  const answered = Object.keys(answers).length;
  const score = Object.values(answers).reduce((total, value) => total + value, 0);
  const maxScore = questions.reduce((total, item) => total + item.options.length - 1, 0);
  const result = getResult(score);
  const flaggedValue = immediateSupport && answers[immediateSupport.questionId];
  const flagged = flaggedValue !== undefined && immediateSupport?.isNeeded(flaggedValue);
  const urgentHere = flagged && immediateSupport?.questionId === question.id;
  const last = index === questions.length - 1;
  const viewingResult = screen === "result";

  // Move focus only after an intentional transition. A radio arrow should
  // change the selection without moving the reader away from the choices.
  useEffect(() => {
    if (focusTarget.current === null) return;
    const node = focusTarget.current === "support" ? support.current : heading.current;
    focusTarget.current = null;
    if (node) {
      node.focus({ preventScroll: true });
      node.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [index, screen, answers]);

  function openQuestion(next: number, editing = screen === "edit") {
    focusTarget.current = immediateSupport?.questionId === questions[next].id && flagged ? "support" : "question";
    if (next === index && !viewingResult) {
      const node = focusTarget.current === "support" ? support.current : heading.current;
      focusTarget.current = null;
      node?.focus();
      node?.scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
    setIndex(next);
    setScreen(editing ? "edit" : "questions");
  }

  function choose(value: number) {
    if (immediateSupport?.questionId === question.id && immediateSupport.isNeeded(value) && !urgentHere)
      focusTarget.current = "support";
    setAnswers(previous => ({ ...previous, [question.id]: value }));
  }

  function next() {
    if (chosen === undefined) return;
    if (firstMissing !== -1) return openQuestion(last ? firstMissing : index + 1);
    completed.save(title, answers);
    focusTarget.current = "result";
    setScreen("result");
  }

  function restart() {
    completed.clear(title);
    focusTarget.current = "question";
    setAnswers({});
    setIndex(0);
    setScreen("questions");
  }

  return (
    <div className="beck-page">
      <header className="beck-intro">
        <div className="beck-intro-copy">
          <Link className="beck-backlink" href="/proverit-sebya">Самопроверка</Link>
          <h1>{title}</h1>
          <p>{instructions}</p>
          <p className="beck-note">Ответы остаются в этой вкладке. При обновлении страницы они сбросятся.</p>
        </div>
        <img src={image} width="720" height="480" alt="" />
      </header>

      <noscript><div className="beck-no-script">
        <p>Для выбора ответов и подсчёта баллов включите JavaScript в браузере.</p>
        <Link href="/blog">Открыть статьи и упражнения</Link>
      </div></noscript>

      <div className="beck-main">
        {viewingResult ? (
          <section className="beck-result" aria-labelledby="beck-result-title">
            <h2 id="beck-result-title" tabIndex={-1} ref={heading} aria-describedby="beck-result-scale">Результат теста</h2>
            <p id="beck-result-scale" className="beck-result-scale">{title}</p>
            {flagged && <div className="beck-safety">{immediateSupport?.content}</div>}
            <p className="beck-score"><strong>{score}</strong>{" из "}{maxScore} баллов</p>
            {!flagged && <p className="beck-level">{result.level}</p>}
            <p>{flagged ? immediateSupport?.resultNote : result.description}</p>
            <p className="beck-note">Баллы отражают ваши ответы {period}. Диагноз по одной шкале поставить нельзя.</p>
            {!flagged && <>
              {renderResultSupport?.(answers, score)}
              <section className="beck-next">
                <h3>Что дальше</h3>
                {renderNext(score)}
              </section>
              <details className="beck-bands">
                <summary>Как читать баллы</summary>
                <dl>{levels.map((band, i) => (
                  <div key={band.level}>
                    <dt>{i === 0 ? 0 : levels[i - 1].threshold + 1}–{Math.min(maxScore, band.threshold)}</dt>
                    <dd>{band.level}</dd>
                  </div>
                ))}</dl>
              </details>
            </>}
            <AnswerIndex key="review" questions={questions} answers={answers} result onChoose={i => openQuestion(i, true)} />
            <details className="beck-restart">
              <summary>Пройти заново</summary>
              <p>Ответы этого прохождения будут сброшены.</p>
              <button type="button" onClick={restart}>Начать с первого вопроса</button>
            </details>
            <Link className="beck-backlink" href="/">На главную</Link>
          </section>
        ) : (
          <section className="beck-question" aria-labelledby="beck-question-title">
            <div className="beck-progress">
              <span id="beck-step">Вопрос {index + 1} из {questions.length}</span>
              <progress value={answered} max={questions.length} aria-label="Прогресс теста" aria-valuetext={`Ответов: ${answered} из ${questions.length}`} />
            </div>
            <h2 id="beck-question-title" tabIndex={-1} ref={heading} aria-describedby="beck-step">{question.title}</h2>
            <div key={question.id} className="beck-options" role="radiogroup" aria-labelledby="beck-question-title">
              {question.options.map((option, value) => (
                <label key={value} className="beck-choice">
                  <input type="radio" name={"beck-" + question.id} value={value} checked={chosen === value}
                    onChange={() => choose(value)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {urgentHere && <div ref={support} className="beck-safety" role="region" aria-label="Поддержка прямо сейчас" tabIndex={-1}>
              {immediateSupport?.content}
              <Link href="/">Выйти из теста</Link>
            </div>}
            <div className="beck-actions">
              {screen !== "edit" && index > 0 && <button type="button" onClick={() => openQuestion(index - 1)}>Назад</button>}
              <button type="button" className="beck-advance" disabled={chosen === undefined} onClick={next}>
                {screen === "edit" ? "Вернуться к результату" : firstMissing === -1 ? "Показать результат" :
                  !last ? "Далее" : firstMissing === index ? "Показать результат" : "К вопросу без ответа"}
              </button>
            </div>
            <AnswerIndex key="navigate" questions={questions} answers={answers} active={index} result={false} onChoose={i => openQuestion(i)} />
          </section>
        )}
      </div>
    </div>
  );
}
