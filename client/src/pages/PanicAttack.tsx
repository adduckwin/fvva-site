import { ArrowDown, ArrowDownToLine, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import BreathingGuide from "@/components/BreathingGuide";
import GroundingGuide from "@/components/GroundingGuide";
import { useMeta } from "@/hooks/useMeta";
import "./panic-help.css";

export default function PanicAttack() {
  useMeta({
    title: "Паническая атака: что делать прямо сейчас — техники самопомощи",
    description:
      "Когда обратиться за медицинской помощью и что можно сделать при знакомом приступе паники. Спокойное дыхание и упражнение на заземление.",
    keywords:
      "паническая атака что делать, как успокоиться при панической атаке, дыхание при панике, заземление 54321, помощь при тревоге",
  });

  return (
    <div className="panic-help">
      <div className="panic-opening">
        <h1>Помощь при панике</h1>
        <div className="panic-urgent">
          <p><strong>Сильно болит в груди или очень трудно дышать?</strong> Вызовите скорую.</p>
          <p className="panic-first-time">
            Если такое впервые или ощущения непривычны, обратитесь за медицинской помощью.
          </p>
        </div>
        <section className="panic-first-step" aria-labelledby="familiar-panic">
          <h2 id="familiar-panic">При знакомом приступе</h2>
          <p>Почувствуйте опору под ногами или спиной. Назовите про себя один предмет рядом.</p>
          <nav aria-label="Упражнения при знакомом приступе">
            <a href="#zazemlenie">Пройти по шагам <ArrowDown aria-hidden="true" size={16} /></a>
            <a href="#dyhanie">Подышать</a>
          </nav>
        </section>
        <div className="panic-print" aria-hidden="true" />
      </div>

      <section className="panic-exercise" id="zazemlenie" tabIndex={-1} aria-labelledby="grounding-title">
        <h2 id="grounding-title">Оглянитесь вокруг</h2>
        <GroundingGuide />
      </section>
      <section className="panic-exercise" id="dyhanie" tabIndex={-1} aria-labelledby="breathing-title">
        <h2 id="breathing-title">Спокойное дыхание</h2>
        <BreathingGuide />
      </section>
      <section className="panic-after" aria-labelledby="after-panic-title">
        <div>
          <h2 id="after-panic-title">После приступа</h2>
          <p>Если страх нового приступа меняет ваши планы, это можно обсудить на консультации.</p>
          <Link href="/contact">Написать Александре <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
        <div className="panic-reading">
          <Link href="/blog/panicheskie-ataki">Что происходит с телом при панике <ArrowRight aria-hidden="true" size={16} /></Link>
          <Link href="/blog/dyhatelnye-tehniki-pri-trevoge">Дыхательные упражнения для спокойного времени <ArrowRight aria-hidden="true" size={16} /></Link>
          <a href="/7-tehnik-pri-trevoge.pdf" download>Скачать памятку «7 техник при тревоге» (PDF) <ArrowDownToLine aria-hidden="true" size={16} /></a>
        </div>
      </section>
    </div>
  );
}
