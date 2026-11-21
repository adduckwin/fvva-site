import { Link } from "wouter";
import { articles } from "@/lib/articles";
import { articleArt } from "@/pages/reading-topics";

const followups: Record<string, readonly string[]> = {
  "posle-razgovora-prokruchivayu-v-golove": ["dnevnik-mysley-kpt", "kak-poprosit-o-podderzhke"],
  "kak-poprosit-o-podderzhke": ["kak-podderzhit-blizkogo-s-depressiej", "chto-skazat-na-pervoy-konsultatsii"],
  "chto-skazat-na-pervoy-konsultatsii": ["kak-vybrat-psihologa", "dnevnik-mysley-kpt"],
  "dnevnik-mysley-kpt": ["posle-razgovora-prokruchivayu-v-golove", "kak-kpt-pomogaet"],
  "chto-takoe-depressiya": ["prokrastinaciya-i-depressiya", "kak-poprosit-o-podderzhke"],
  "trevoga-norma-ili-rasstrojstvo": ["posle-razgovora-prokruchivayu-v-golove", "dyhatelnye-tehniki-pri-trevoge"],
  "kak-kpt-pomogaet": ["dnevnik-mysley-kpt", "chto-skazat-na-pervoy-konsultatsii"],
  "prokrastinaciya-i-depressiya": ["terapiya-prinyatiya-act", "kak-poprosit-o-podderzhke"],
  "panicheskie-ataki": ["dyhatelnye-tehniki-pri-trevoge", "trevoga-norma-ili-rasstrojstvo"],
  "son-i-psihicheskoe-zdorovie": ["kak-uspokoitsya-pri-stresse", "vygoranie-priznaki-i-chto-delat"],
  "kak-podderzhit-blizkogo-s-depressiej": ["kak-poprosit-o-podderzhke", "chto-takoe-depressiya"],
  "kak-uspokoitsya-pri-stresse": ["vygoranie-priznaki-i-chto-delat", "dyhatelnye-tehniki-pri-trevoge"],
  "terapiya-prinyatiya-act": ["prokrastinaciya-i-depressiya", "kak-kpt-pomogaet"],
  "kak-vybrat-psihologa": ["chto-skazat-na-pervoy-konsultatsii", "kak-kpt-pomogaet"],
  "dyhatelnye-tehniki-pri-trevoge": ["panicheskie-ataki", "kak-uspokoitsya-pri-stresse"],
  "vygoranie-priznaki-i-chto-delat": ["son-i-psihicheskoe-zdorovie", "kak-poprosit-o-podderzhke"],
};

export default function ContinueReading({ slug }: { slug: string }) {
  const selected = (followups[slug] ?? []).flatMap(target =>
    articles.filter(article => article.slug === target)
  );
  if (!selected.length) return null;

  return (
    <nav className="reading-next" aria-labelledby="reading-next-title">
      <h2 id="reading-next-title">Что почитать дальше</h2>
      <ul>
        {selected.map(article => {
          const isDiary = article.slug === "dnevnik-mysley-kpt";
          const src = isDiary ? "/images/dnevnik-primer.webp" : articleArt[article.slug]?.src;
          return (
            <li key={article.slug}>
              <Link href={"/blog/" + article.slug}>
                {src && <img className={isDiary ? "reading-next-sheet" : undefined}
                  src={src} width="150" height="100" loading="lazy" alt="" />}
                <span>{article.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
