import { Link } from "wouter";
import { useMeta } from "@/hooks/useMeta";
import { PRACTICE } from "@/lib/practice";
import "./contact.css";
import "./anxiety-consultation.css";

export default function AnxietyConsultation() {
  useMeta({
    title: "Психолог при тревоге онлайн — Александра Федорова",
    description: `Как проходит консультация при тревоге с КПТ-психологом Александрой Федоровой. Встреча по видеосвязи, ${PRACTICE.sessionLength}. Стоимость по запросу, запись в Telegram или MAX.`,
    ogImage: "/images/sasha.jpg",
  });

  return (
    <div className="booking-page anxiety-consultation">
      <header className="booking-letter">
        <figure className="booking-portrait">
          <div className="booking-print">
            <img className="booking-portrait-photo" src="/images/sasha.jpg" width="600" height="810" alt="Александра Федорова" />
          </div>
        </figure>
        <h1>Психолог при тревоге</h1>
        <div className="booking-correspondence">
          <p className="booking-intro">
            Я Александра Федорова, КПТ-психолог. Со мной можно поговорить о том,
            сколько времени уходит на переживания и что из-за них приходится
            откладывать. Для начала хватит одного примера из вашей жизни.
          </p>
          <p className="consultation-terms">
            Встречаемся по видеосвязи. Консультация длится {PRACTICE.sessionLength},
            стоимость {PRACTICE.priceSummary.toLowerCase()}.
          </p>
          <div className="booking-channels">
            <Link href="/contact">Записаться на консультацию</Link>
          </div>
        </div>
      </header>

      <section className="consultation-section">
        <h2>С чего можно начать</h2>
        <div>
          <p>
            Допустим, вы хотите попросить руководителя об отпуске. Уже выбрали
            даты, но третий вечер переписываете сообщение. Каждый раз одна и та же
            мысль — «Сейчас столько работы. Он решит, что я подвожу команду».
          </p>
          <p>
            На встрече я бы спросила, что вы знаете о реакции руководителя
            по прошлым разговорам и чего опасаетесь именно сейчас. Может оказаться,
            что вам трудно даже задать вопрос, пока вы не уверены в ответе.
            Тогда можно вместе подобрать первую фразу, с которой вам будет проще
            начать разговор.
          </p>
        </div>
      </section>

      <section className="consultation-section">
        <h2>Что будем делать на встрече</h2>
        <div>
          <p>
            Вы расскажете о своём эпизоде. Мы разберём, в какой момент появилась
            тревога, какая мысль за ней стояла и что вы сделали дальше.
            Потом обсудим, что вы хотели бы делать свободнее. Для одного человека
            это задать вопрос на совещании, для другого — выйти из дома без ещё
            одной проверки.
          </p>
          <p>
            Иногда такой разбор удобнее записать. Можно заранее посмотреть{" "}
            <Link href="/blog/dnevnik-mysley-kpt">пример дневника мыслей в КПТ</Link>.
            Заполнять его перед консультацией необязательно.
          </p>
          <p>
            Я окончила Институт психологии им. Л. С. Выготского РГГУ и прошла
            переподготовку по консультированию с применением методов КПТ.{" "}
            <Link href="/#obrazovanie">Подробнее о моём образовании</Link>.
          </p>
        </div>
      </section>

      <section className="consultation-section">
        <h2>Как договориться о времени</h2>
        <div>
          <p>
            Напишите мне в Telegram или MAX. Для записи достаточно спросить о
            стоимости и ближайшем свободном времени. Рассказывать, что именно
            вас тревожит, можно уже на встрече.
          </p>
          <p><Link href="/contact">Выбрать, где написать Александре</Link></p>
        </div>
      </section>
    </div>
  );
}
