export const CONTACT_LINKS = {
  telegram: "https://t.me/ALEKSA_FVVA",
  max: "https://max.ru/u/f9LHodD0cOKoOcVdY7nuS0tflUZbFozx6cdcx1vdjY4DPD1D1_7ad0ciLo0",
  vk: "https://vk.com/fedorovaapsy",
};

export const PRACTICE = {
  format: "онлайн, по видеосвязи",
  sessionLength: "1,5 часа",
  frequency: "раз в неделю",
  price: "По запросу в личных сообщениях",
  firstSession: "Оплачивается как обычная сессия",
  reply: "Я отвечу в течение 24 часов.",
};

export interface PracticeFact {
  key: string;
  label: string;
  value: string;
}

/** Витрина «Форматы и условия» — короткие формулировки для карточек. */
export const PRACTICE_FACTS: PracticeFact[] = [
  { key: "format", label: "Формат", value: PRACTICE.format },
  { key: "duration", label: "Длительность", value: PRACTICE.sessionLength },
  { key: "frequency", label: "Частота", value: `В начале — ${PRACTICE.frequency}, дальше реже` },
  { key: "price", label: "Стоимость", value: PRACTICE.price },
  { key: "first", label: "Первая встреча", value: PRACTICE.firstSession },
  { key: "privacy", label: "Конфиденциальность", value: "Остаётся между нами" },
];
