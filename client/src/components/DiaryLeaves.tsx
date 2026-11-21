import { Fragment } from "react";
import { Link } from "wouter";

const leaves = [
  {
    id: "episode",
    label: "Ситуация",
    lines: [
      ["Что произошло?", "Утром я отправил коллеге макет и попросил посмотреть до пятницы. К вечеру четверга ответа не было."],
      ["Какая мысль мелькнула?", "«Макет не понравился, а коллега подбирает слова, чтобы мне об этом сказать»."],
    ],
  },
  {
    id: "facts",
    label: "Факты",
    lines: [
      ["Что говорит в пользу этой мысли?", "В прошлый раз коллега быстро ответил, что всё подходит. Когда просил внести правки, ответ пришёл позже."],
      ["Какие ещё факты стоит учесть?", "Срок ответа наступит только завтра. В календаре у коллеги сегодня несколько встреч. Сам он пока ничего о макете не сказал."],
    ],
  },
  {
    id: "new-thought",
    label: "Переоценка",
    lines: [
      ["Как ещё я могу описать происходящее?", "«Я пока не знаю, что он думает. Если завтра ответа не будет, спрошу, успел ли он посмотреть и нужны ли изменения»."],
      ["Что я чувствую теперь?", "Мне всё ещё тревожно ждать, но уже меньше хочется переделывать работу наугад."],
    ],
  },
];

export default function DiaryLeaves() {
  return (
    <aside className="diary-stack" aria-labelledby="diary-title">
      <div className="studio-example">
        <h3 id="diary-title">Из дневника мыслей</h3>
        <p className="studio-example-intro">Вымышленная ситуация из упражнения</p>
        <fieldset className="diary-leaves">
          <legend className="sr-only">Выберите страницу примера</legend>
          {leaves.map((leaf, i) => (
            <Fragment key={leaf.id}>
              <input type="radio" className="sr-only" name="diary-leaf" id={"leaf-" + leaf.id} defaultChecked={i === 0} aria-controls={"entry-" + leaf.id} />
              <label htmlFor={"leaf-" + leaf.id}>{leaf.label}</label>
              <dl id={"entry-" + leaf.id} aria-label={leaf.label}>
                {leaf.lines.map(([prompt, answer]) => (
                  <div key={prompt}><dt>{prompt}</dt><dd>{answer}</dd></div>
                ))}
              </dl>
            </Fragment>
          ))}
        </fieldset>
        <Link className="studio-link" href="/blog/dnevnik-mysley-kpt">Прочитать запись целиком</Link>
      </div>
    </aside>
  );
}
