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
  "dyhatelnye-tehniki-pri-trevoge": {
    src: "/images/folio-breath.webp",
    placeholder:
      "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAABQBACdASoYABAAPulgqU2pJaQiMAgBIB0JZwDE2CG5FCGyfPwTHquqBaOIAP7nY8/qUIKmVsKiCUV+0AuwtQNTEY65wu2TfZ0qKyGoAoAAAA==",
  },
  "son-i-psihicheskoe-zdorovie": {
    src: "/images/folio-sleep.webp",
    placeholder:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQBACdASoYABAAPulgqU2pJaQiMAgBIB0JZQC06B6Vj5vyPTYuUuSgAADJIOwrGP9nhmSMpGlLzoX0V81KcDW38G5R06oXghBfQ2GdqMvYuFZ4ezTXwAAA",
  },
  "vygoranie-priznaki-i-chto-delat": {
    src: "/images/folio-burnout.webp",
    placeholder:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQBACdASoYABAAPulgqU2pJaQiMAgBIB0JZwDG9CP7tWX5uOsL3GdqcXYAAP62ogkNKVilANziK6OXeN0XUxL3n9gnFD+/McBr+KFTuTZWXTpm6AjhDC5pbui6iMMU5QAAAA==",
  },
  "kak-podderzhit-blizkogo-s-depressiej": {
    src: "/images/folio-support.webp",
    placeholder:
      "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADwAwCdASoYABAAPulgqE0pJaOiMAgBIB0JYwAAS+TTK3vS6fGzMolAAP6mnflDLYEIjIGiU859K09o1Vnpiwwsyf4Jpsgeh4BRWs4qm+nk2bg+4ls+oMXB66zbjI8q4UQZeAAA",
  },
  "prokrastinaciya-i-depressiya": {
    src: "/images/folio-first-step.webp",
    placeholder:
      "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAwCdASoYABAAPulkqU2pJaQiMAgBIB0JQBOgBDv4GaOAWRrpNyqAAP7nAvtC/OiBIg2PR16iHG/7gRbtMMDV5ntXna9lIdpiUcqAAAA=",
  },
  "kak-kpt-pomogaet": {
    src: "/images/folio-cbt.webp",
    placeholder:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAwCdASoYABAAPulep00pJSOiMAgBIB0JZwAAUnUbZWCdTQnaCgAA/pdp7acnsuftWEyEpcxWC7Z7U7bLRS7ogIAAAA==",
  },
};
