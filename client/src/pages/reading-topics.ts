import type { Article } from "@/lib/articles";
import { ART_PLACEHOLDERS } from "@/lib/art-placeholders";

export const readingTopics = [
  { id: "trevoga", title: "Тревога и стресс" },
  { id: "nastroenie", title: "Апатия и настроение" },
  { id: "blizkie", title: "Отношения и поддержка" },
  { id: "terapiya", title: "Работа с психологом" },
  { id: "drugie-materialy", title: "Другие материалы" },
] as const;

export function topicFor(article: Article) {
  if (["kak-poprosit-o-podderzhke", "kak-podderzhit-blizkogo-s-depressiej"].includes(article.slug))
    return "blizkie";
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
  "kak-uspokoitsya-pri-stresse": {
    src: "/images/issue-stress.webp",
    placeholder: "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAAAQBACdASoYABAAPuleqE0pJSOiMAgBIB0JZgCsAB6W39t8ImFQkVYougD+wPi07PRw53IsURJrivukQgkWscUXR7r5h8JrXgRxoNXwsj36v7A+7JpMvRbaXoLbNi2R/1q4NL2+j7ru+E9WzC81+d6BUeDXMz8Ic6PQ4gAA",
  },
  "panicheskie-ataki": {
    src: "/images/issue-panic.webp",
    placeholder: "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAACQAwCdASoYABAAPuleqE0pJSQiMAgBIB0JZQAAPoV9CjvackagANnFpXKUS8+YR6er/Sug848j5EHC3f7L8QYGF4AfZJb0ZeddNx+gX8QP7vMoXS2UUZTDe+Gb+i7jQoDejlCCj5XUsN9hIQhWtlAA",
  },
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
  "posle-razgovora-prokruchivayu-v-golove": {
    src: "/images/issue-replay.webp",
    placeholder:
      "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQBACdASoYABAAPt1apkyopSOiMAgBEBuJYwCzgCLJR6c6v4+7Wt1ffDgAAP5kvg1yDV2OoJTYkX+YftYY3nKGdjkEBP8ew3VejK3XQr9HOwRkstjfiSG8Do0T2EAA",
  },
  "kak-poprosit-o-podderzhke": {
    src: "/images/issue-ask.webp",
    placeholder:
      "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADQAwCdASoYABAAPt1apkyopSOiMAgBEBuJbACdABrQ/iq7On3z2AAA/m+vBtcihfJHlNEszBJOgtdXl9fQLnjFfI7frTHHNdo5m/i+UUy4Y/GhwgUPbs9BYKchf4sAAAA=",
  },
  "chto-skazat-na-pervoy-konsultatsii": {
    src: "/images/issue-first-talk.webp",
    placeholder:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAwCdASoYABAAPt1eqU2opSQiMAgBEBuJQBYdgzyOiMvdYRBqmeAA+J/t4OLICtVhkfLFOaNQiSV2Bqz4NxUC5mluIEknqoSKOUfLTRfZ45d1e+BEXq/8AAA=",
  },
  "terapiya-prinyatiya-act": {
    src: "/images/issue-values.webp",
    placeholder:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAAAQBACdASoYABAAPt1apkyopSOiMAgBEBuJYwC06CPajmm/m1IZ3QU2HAD+RHg0/H2xNvyKBp87gOgu68CY9Gmdk70t4WOSXPl04duetdrWgAAA",
  },
  "kak-vybrat-psihologa": {
    src: "/images/issue-choice.webp",
    placeholder:
      "data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAADwAwCdASoYABAAPt1cpkyopSOiMAgBEBuJZQC06CPSMIHlHPhe5UiyAP7JQy2o1BW0xvRWlTnkSQfLZXJTNG+5uq+y/JcNHukVkyZ72uV9Rqc56Vf6qBwJ0oWXC6H/lNWkiwvSNdiTZ+yot2+g+NDrUxW+jSDarhhXmUGkIAA=",
  },
};
