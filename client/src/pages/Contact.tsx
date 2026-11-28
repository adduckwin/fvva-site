import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";
import { BOOKING_TERMS, CONTACT_LINKS, PRACTICE, PRACTICE_FACTS } from "@/lib/practice";
import { trackGoal } from "@/lib/analytics";
import "./contact.css";

const FIRST_MESSAGES = {
  appointment: "Здравствуйте! Хочу записаться на консультацию.",
  price: "Здравствуйте! Подскажите, пожалуйста, сколько стоит консультация?",
};

type MessageTopic = keyof typeof FIRST_MESSAGES;

export default function Contact() {
  useMeta({
    title: "Запись на онлайн-консультацию — психолог Александра Федорова",
    description: `Запись к психологу Александре Федоровой через Telegram или MAX. ${BOOKING_TERMS}`,
    keywords:
      "контакты психолога, запись к психологу, Александра Федорова, психолог телеграм, консультация психолога онлайн",
  });

  const [topic, setTopic] = useState<MessageTopic>("appointment");
  const [ready, setReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState<{ topic: MessageTopic; text: string } | null>(null);

  useEffect(() => {
    setReady(true);
  }, []);
  const canCopy = ready && typeof navigator.clipboard?.writeText === "function";

  function chooseTopic(next: MessageTopic) {
    setTopic(next);
    setCopyStatus(null);
    if (next === "price") trackGoal("booking_price");
  }

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(FIRST_MESSAGES[topic]);
      setCopyStatus({ topic, text: "Сообщение скопировано" });
      trackGoal("booking_copy");
    } catch {
      setCopyStatus({ topic, text: "Выделите текст сообщения и скопируйте его вручную." });
    }
  }

  return (
    <div className="booking-page">
      <section className="booking-letter" aria-labelledby="booking-title">
        <figure className="booking-portrait">
          <div className="booking-print">
            <img className="booking-portrait-photo" src="/images/sasha.jpg" alt="Психолог Александра Федорова" width={600} height={810} />
            <img className="booking-portrait-clip" src="/images/post-clip.webp" width={176} height={175} alt="" />
          </div>
          <figcaption>Александра Федорова</figcaption>
        </figure>
        <h1 id="booking-title">Напишите мне</h1>
        <div className="booking-correspondence">
          <p className="booking-intro">
            Мы встретимся {PRACTICE.format}. Консультация длится {PRACTICE.sessionLength}.
            Стоимость {PRACTICE.priceSummary.toLowerCase()}. Выберите, где вам удобно обсудить время.
          </p>
          <div className="booking-channels">
            {Object.entries(FIRST_MESSAGES).map(([key, message]) => (
              <a key={key} data-message={key} href={`${CONTACT_LINKS.telegram}?text=${encodeURIComponent(message)}`}
                target="_blank" rel="noopener noreferrer" aria-label="Написать в Telegram">Telegram</a>
            ))}
            <a href={CONTACT_LINKS.max} target="_blank" rel="noopener noreferrer" aria-label="Написать в MAX">MAX</a>
          </div>
        </div>
      </section>

      <section className="booking-draft" aria-labelledby="booking-draft-title">
        <img className="booking-envelope" src="/images/post-envelope.webp" width={760} height={598} loading="lazy" alt="" />
        <div className="booking-notepaper">
          <h2 id="booking-draft-title">Можно начать так</h2>
          <fieldset className="booking-topics">
            <legend className="sr-only">Тема первого сообщения</legend>
            <label><input type="radio" name="first-message" value="appointment" checked={topic === "appointment"} onChange={() => chooseTopic("appointment")} />О записи</label>
            <label><input type="radio" name="first-message" value="price" checked={topic === "price"} onChange={() => chooseTopic("price")} />О стоимости</label>
          </fieldset>
          <blockquote className="booking-draft-message">
            <span className="booking-message-appointment">{FIRST_MESSAGES.appointment}</span>
            <span className="booking-message-price">{FIRST_MESSAGES.price}</span>
          </blockquote>
          {canCopy && <button className="booking-copy" type="button" onClick={copyTemplate}>Скопировать текст</button>}
          <p className="booking-copy-status" role="status">{copyStatus?.topic === topic ? copyStatus.text : ""}</p>
        </div>
      </section>

      <section className="booking-details" aria-labelledby="booking-conditions">
        <div className="booking-details-heading">
          <h2 id="booking-conditions">Перед встречей</h2>
          <Link href="/faq">Вопросы о консультации</Link>
          <img className="booking-flower" src="/images/post-flower.webp" width={261} height={480} loading="lazy" alt="" />
        </div>
        <dl className="booking-facts">
          {PRACTICE_FACTS.map(({ key, label, value }) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd>{key === "frequency" ? `Вначале ${PRACTICE.frequency}, дальше реже` : value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="booking-community">
        О тревоге, апатии и работе с психологом я также пишу в&nbsp;
        <a href={CONTACT_LINKS.vk} target="_blank" rel="noopener noreferrer">сообществе ВКонтакте</a>.
      </p>
    </div>
  );
}
