import { useEffect, useId, useRef, useState } from "react";
import "./grounding-guide.css";

const steps = [
  {
    title: "Найдите глазами пять предметов",
    hint: "Назовите их про себя. Например, окно, лампа, пуговица на рукаве.",
  },
  {
    title: "Заметьте четыре прикосновения",
    hint: "Например, пол под ногами, стул под собой, рукав на запястье или телефон в ладони.",
  },
  {
    title: "Прислушайтесь к трём звукам",
    hint: "Что слышно совсем рядом? А чуть дальше? Это может быть шелест одежды или шум за окном.",
  },
  {
    title: "Попробуйте уловить два запаха",
    hint: "Может быть, пахнет чаем или мылом. Если запахов вокруг нет, можно идти дальше.",
  },
  {
    title: "Заметьте один вкус",
    hint: "Какой вкус сейчас во рту? Может быть, остался привкус чая. Если ничего не ощущаете, на этом можно закончить.",
  },
];

export default function GroundingGuide() {
  const [interactive, setInteractive] = useState(false);
  const [index, setIndex] = useState(0);
  const [ended, setEnded] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusAfterAction = useRef(false);
  const descriptionId = useId();
  const stepId = useId();
  const step = steps[index];
  const last = index === steps.length - 1;

  useEffect(() => setInteractive(true), []);

  useEffect(() => {
    if (!focusAfterAction.current || !heading.current) return;
    focusAfterAction.current = false;
    const node = heading.current;
    node.focus({ preventScroll: true });
    const bounds = node.getBoundingClientRect();
    const topMargin = parseFloat(getComputedStyle(node).scrollMarginTop);
    if (bounds.top < topMargin || bounds.bottom > window.innerHeight) {
      node.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [ended, index]);

  function showStep(nextIndex: number) {
    focusAfterAction.current = true;
    setIndex(nextIndex);
    setEnded(false);
  }

  function finish() {
    focusAfterAction.current = true;
    setEnded(true);
  }

  if (!interactive) {
    return (
      <div className="grounding-guide">
        <p>Идите в своём темпе. Любой шаг можно пропустить.</p>
        <ol className="grounding-list">
          {steps.map(item => (
            <li key={item.title}>
              <strong>{item.title}.</strong> {item.hint}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (ended) {
    return (
      <div className="grounding-guide">
        <h3 ref={heading} tabIndex={-1} aria-describedby={descriptionId}>
          {last ? "Упражнение закончено" : "Вы остановили упражнение"}
        </h3>
        <p id={descriptionId} className="grounding-hint">
          {last ? "Можно отложить телефон и немного посидеть." : "Можно отложить телефон или вернуться к тому же шагу."}
        </p>
        <div className="grounding-actions">
          {!last && (
            <button type="button" className="grounding-advance" onClick={() => showStep(index)}>
              Вернуться к шагу {index + 1}
            </button>
          )}
          {(last || index > 0) && (
            <button type="button" className={last ? "grounding-advance" : "grounding-text"} onClick={() => showStep(0)}>
              Начать сначала
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grounding-guide">
      <p id={stepId} className="grounding-progress">Шаг {index + 1} из {steps.length}</p>
      <h3 ref={heading} tabIndex={-1} aria-describedby={`${stepId} ${descriptionId}`}>{step.title}</h3>
      <p id={descriptionId} className="grounding-hint">{step.hint}</p>
      {index === 0 && <p className="grounding-note">Если шаг вам не подходит, сразу переходите дальше.</p>}
      <div className="grounding-actions">
        <button type="button" className="grounding-advance" onClick={last ? finish : () => showStep(index + 1)}>
          {last ? "Завершить" : "Дальше"}
        </button>
        {index > 0 && <button type="button" className="grounding-text" onClick={() => showStep(index - 1)}>Назад</button>}
        {!last && <button type="button" className="grounding-text" onClick={finish}>Остановиться</button>}
      </div>
    </div>
  );
}
