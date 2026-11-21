import type { Article } from "@/lib/articles";
import { ART_PLACEHOLDERS } from "@/lib/art-placeholders";

export const readingTopics = [
  { id: "trevoga", title: "Тревога и стресс" },
  { id: "nastroenie", title: "Апатия и настроение" },
  { id: "terapiya", title: "Работа с психологом" },
  { id: "drugie-materialy", title: "Другие материалы" },
] as const;

export function topicFor(article: Article) {
  if (
    ["Тревога", "Стресс"].includes(article.category) ||
    article.slug === "kak-uspokoitsya-pri-stresse"
  )
    return "trevoga";
  if (["Психическое здоровье", "Повседневная жизнь"].includes(article.category))
    return "nastroenie";
  if (["Методы", "Практика КПТ", "Полезное"].includes(article.category))
    return "terapiya";
  return "drugie-materialy";
}

type Illustration = { src: string; placeholder: string };

export const articleArt: Record<string, Illustration | undefined> = {
  "trevoga-norma-ili-rasstrojstvo": {
    src: "/images/studio-anxiety.webp",
    placeholder: ART_PLACEHOLDERS.anxiety,
  },
  "chto-takoe-depressiya": {
    src: "/images/studio-mood.webp",
    placeholder: ART_PLACEHOLDERS.mood,
  },
};
