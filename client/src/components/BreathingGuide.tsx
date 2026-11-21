import { useEffect, useState, type CSSProperties } from "react";
import "./breathing-guide.css";

const PHASE_MS = 4000;
const PHASE_COUNT = 6;
type GuideState = "idle" | "finished" | number;

export default function BreathingGuide() {
  const [interactive, setInteractive] = useState(false);
  const [step, setStep] = useState<GuideState>("idle");
  const running = typeof step === "number";
  const inhaling = running && step % 2 === 0;

  useEffect(() => {
    setInteractive(true);
  }, []);

  useEffect(() => {
    if (!running) return;

    const stop = () => setStep("idle");
    const onVisibilityChange = () => {
      if (document.hidden) stop();
    };
    if (document.hidden) {
      stop();
      return;
    }

    const timer = window.setTimeout(() => {
      setStep(step + 1 < PHASE_COUNT ? step + 1 : "finished");
    }, PHASE_MS);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", stop);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", stop);
    };
  }, [step, running]);

  let buttonLabel = "Включить подсказку";
  let cue = "";
  if (running) {
    buttonLabel = "Остановить подсказку";
    cue = inhaling ? "Вдох" : "Выдох";
  } else if (step === "finished") {
    buttonLabel = "Повторить подсказку";
    cue = "Можно продолжить в своём темпе.";
  }

  return (
    <div className="breathing-guide">
      <p className="breathing-guide-instruction">
        Мягко вдохните через нос, затем выдохните через рот. Дышите легко,
        в своём темпе.
      </p>
      {interactive && (
        <div className="breathing-guide-controls">
          <button
            type="button"
            className="breathing-guide-toggle"
            onClick={() => setStep(running ? "idle" : 0)}
          >
            {buttonLabel}
          </button>
          <p role="status" aria-atomic="true" className="breathing-guide-cue">
            {cue}
          </p>
          {running && (
            <span aria-hidden="true" className="breathing-guide-track">
              <span
                key={step}
                className="breathing-guide-stroke"
                data-phase={inhaling ? "in" : "out"}
                style={{ "--phase-time": `${PHASE_MS}ms` } as CSSProperties}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
