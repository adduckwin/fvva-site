import { useState } from "react";
import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";
import { BOOKING_TERMS, CONTACT_LINKS, PRACTICE, PRACTICE_FACTS } from "@/lib/practice";
import "./contact.css";

const BOOKING_MESSAGE = "Здравствуйте! Хочу записаться на консультацию.";

export default function Contact() {
  useMeta({
    title: "Запись на онлайн-консультацию — психолог Александра Федорова",
    description: `Запись к психологу Александре Федоровой через Telegram или MAX. ${BOOKING_TERMS}`,
    keywords:
      "контакты психолога, запись к психологу, Александра Федорова, психолог телеграм, консультация психолога онлайн",
  });

  const [copyStatus, setCopyStatus] = useState("");

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(BOOKING_MESSAGE);
      setCopyStatus("Сообщение скопировано");
    } catch {
      setCopyStatus("Выделите текст выше и скопируйте его вручную.");
    }
  }

  return (
    <div className="booking-page">
      <section className="booking-letter" aria-labelledby="booking-title">
        <figure className="booking-portrait">
          <img src="/images/sasha.jpg" alt="Психолог Александра Федорова" width={600} height={810} />
          <figcaption>Александра Федорова</figcaption>
        </figure>
        <h1 id="booking-title">Напишите мне</h1>
        <div className="booking-correspondence">
          <p className="booking-intro">
            Мы встретимся {PRACTICE.format}. Консультация длится {PRACTICE.sessionLength}.
            Стоимость {PRACTICE.priceSummary.toLowerCase()}. Выберите, где вам удобно обсудить время.
          </p>

          <div className="booking-channels">
            <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener noreferrer" aria-label="Написать в Telegram">Telegram</a>
            <a href={CONTACT_LINKS.max} target="_blank" rel="noopener noreferrer" aria-label="Написать в MAX">MAX</a>
          </div>

          <div className="booking-draft">
            <h2>Можно начать так</h2>
            <blockquote>{BOOKING_MESSAGE}</blockquote>
            <button type="button" onClick={copyTemplate}>Скопировать текст</button>
            <p className="booking-copy-status" role="status">{copyStatus}</p>
          </div>
        </div>
      </section>

      <section className="booking-details" aria-labelledby="booking-conditions">
        <div className="booking-details-heading">
          <h2 id="booking-conditions">Перед встречей</h2>
          <Link href="/faq">Вопросы о консультации</Link>
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
