import { useEffect, useRef, useState } from "react";
import { getConsent, onConsentChange, privacySignal, productionOrigin, setConsent, type Consent } from "@/lib/analytics";
import "./analytics-consent.css";

export default function AnalyticsConsent({ pathname }: { pathname: string }) {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Consent | null>(null);
  const [browserOptOut, setBrowserOptOut] = useState(false);
  const [editing, setEditing] = useState(false);
  const settings = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!productionOrigin()) return;
    const sync = () => {
      setChoice(getConsent());
      setBrowserOptOut(privacySignal());
    };
    sync();
    setReady(true);
    return onConsentChange(sync);
  }, []);

  useEffect(() => {
    if (editing) heading.current?.focus();
  }, [editing]);

  if (!ready) return null;
  const show = editing || (!browserOptOut && choice === null);
  const inline = !editing && (pathname.startsWith("/test/") ||
    pathname === "/proverit-sebya" || pathname === "/panicheskaya-ataka");

  function choose(value: Consent) {
    if (editing) settings.current?.focus({ preventScroll: true });
    setEditing(false);
    setConsent(value);
  }

  return <div className="analytics-settings">
    <button ref={settings} type="button" className="analytics-settings__link"
      aria-expanded={show} onClick={() => setEditing(!editing)}>Настройки аналитики</button>
    {show && <section className={inline ? "analytics-notice analytics-notice--inline" : "analytics-notice"}
      aria-labelledby="analytics-heading">
      <h2 id="analytics-heading" ref={heading} tabIndex={-1}>Аналитика сайта</h2>
      {browserOptOut
        ? <p>Ваш браузер передаёт отказ от отслеживания. Яндекс Метрика выключена.</p>
        : <>
          <p>Разрешить Яндекс Метрике использовать cookies и учитывать посещённые страницы, источник перехода, действия при записи и скачивание дневника? Ответы и баллы тестов остаются в браузере.</p>
          {editing && choice && <p>Сейчас аналитика {choice === "granted" ? "включена" : "выключена"}.</p>}
          <div className="analytics-notice__actions">
            <button type="button" onClick={() => choose("granted")}>Разрешить</button>
            <button type="button" onClick={() => choose("denied")}>Отказаться</button>
          </div>
        </>}
      {browserOptOut && <button type="button" onClick={() => { setEditing(false); settings.current?.focus(); }}>Закрыть</button>}
    </section>}
  </div>;
}
