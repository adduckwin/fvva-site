/**
 * Данные практики — единый источник правды.
 * Меняются здесь, подхватываются в FAQ и на странице «Контакты».
 * Александре: проверить значения перед публикацией.
 */
export const PRACTICE = {
  format: "онлайн, по видеосвязи",
  sessionLength: "60–90 минут",
  frequency: "раз в неделю",
  price: "по запросу в личных сообщениях",
};

export interface PracticeFact {
  key: string;
  label: string;
  value: string;
}

/** Витрина «Форматы и условия» — короткие формулировки для карточек. */
export const PRACTICE_FACTS: PracticeFact[] = [
  { key: "format", label: "Формат", value: "Онлайн, по видеосвязи" },
  { key: "duration", label: "Длительность", value: "60–90 минут" },
  { key: "frequency", label: "Частота", value: "В начале — раз в неделю, дальше реже" },
  { key: "price", label: "Стоимость", value: "По запросу в сообщении перед записью" },
  { key: "first", label: "Первая встреча", value: "Оплачивается как обычная сессия" },
  { key: "privacy", label: "Конфиденциальность", value: "Остаётся между нами" },
];
