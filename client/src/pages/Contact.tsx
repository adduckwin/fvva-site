import { ArrowLeft, ArrowUpRight, Copy } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useMeta } from "@/hooks/useMeta";
import { BOOKING_TERMS, CONTACT_LINKS, PRACTICE_FACTS } from "@/lib/practice";
import "./contact.css";

const BOOKING_MESSAGE = "Здравствуйте! Хочу записаться на консультацию.";

export default function Contact() {
  useMeta({
    title: "Запись на онлайн-консультацию — психолог Александра Федорова",
    description:
      `Запись к психологу Александре Федоровой через Telegram или MAX. ${BOOKING_TERMS}`,
    keywords:
      "контакты психолога, запись к психологу, Александра Федорова, психолог телеграм, консультация психолога онлайн",
  });

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(BOOKING_MESSAGE);
      toast.success("Сообщение скопировано");
    } catch {
      toast.error("Выделите текст сообщения и скопируйте его вручную");
    }
  }

  return (
    <div className="booking-page">
      <Link href="/" className="booking-back">
        <ArrowLeft size={16} aria-hidden="true" /> На главную
      </Link>

      <div className="booking-intro">
        <section aria-labelledby="booking-title" className="booking-invite">
          <h1 id="booking-title">Запись на онлайн-консультацию</h1>
          <p className="booking-terms">{BOOKING_TERMS}</p>
          <div className="booking-actions">
            <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener noreferrer">
              Написать в Telegram <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={CONTACT_LINKS.max} target="_blank" rel="noopener noreferrer">
              Написать в MAX <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>

          <div className="booking-message">
            <h2>Первое сообщение для записи</h2>
            <p>«{BOOKING_MESSAGE}»</p>
            <button type="button" onClick={copyTemplate}>
              <Copy size={15} aria-hidden="true" /> Скопировать текст
            </button>
          </div>
        </section>

        <aside className="booking-profile" aria-labelledby="booking-profile-name">
          <img src="/images/sasha.jpg" alt="Александра Федорова" width={600} height={810} />
          <div>
            <h2 id="booking-profile-name">Александра Федорова</h2>
            <p className="booking-specialty">Психолог · КПТ · ACT</p>
            <p className="booking-bio">
              Работаю с апатией, тревожными расстройствами, паническими атаками.
              Помогаю обрести психологическую гибкость и вернуть качество жизни.
            </p>
          </div>
        </aside>
      </div>

      <section className="booking-details" aria-labelledby="booking-conditions">
        <div>
          <h2 id="booking-conditions">Форматы и условия</h2>
          <dl className="booking-facts">
            {PRACTICE_FACTS.map(({ key, label, value }) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="booking-community">
          <a href={CONTACT_LINKS.vk} target="_blank" rel="noopener noreferrer">
            Сообщество ВКонтакте <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p>Полезные материалы и публикации о тревоге, апатии и психологии.</p>
        </div>
      </section>
    </div>
  );
}
