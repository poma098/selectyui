import { RecurrenceFormula } from "../props.interface";

/**
 * Преобразует объект типа `RecurrenceFormula` в строку формулы.
 *
 * Формат строки будет следующим:
 * - `startDate`: Дата начала в формате ISO 8601 (опционально).
 * - `endDate`: Дата окончания в формате ISO 8601 (опционально).
 * - `repeatInterval`: Интервал повторения. Возможные значения: "MINUTES", "HOURS", "DAYS", "MONTHS", "QUARTERS", "YEARS".
 * - `frequency`: Частота повторений в единицах интервала.
 * - `specificDateTime`: Строка с дополнительной информацией о дне и времени для интервалов "MONTHS" и "YEARS".
 *
 * @param {RecurrenceFormula} formula - Объект формулы для преобразования в строку.
 * @returns {string} - Строка формулы.
 *
 * @example
 * const formula = {
 *   startDate: new Date("2023-01-01T00:00:00Z"),
 *   repeatInterval: "MONTHS",
 *   frequency: 1,
 *   specificDateTime: {
 *     dayOfMonth: 15,
 *     hours: 14,
 *     minutes: 30
 *   }
 * };
 * const formulaStr = toFormulaString(formula);
 * // formulaStr будет равен: "2023-01-01T00:00:00Z;;MONTHS;1;15T14:30"
 */
export function toFormulaString(formula: RecurrenceFormula): string {
  const startDateStr = formula.startDate
    ? formula.startDate.toISOString().split('.')[0] + 'Z' // Убираем миллисекунды
    : '';
  const endDateStr = formula.endDate
    ? formula.endDate.toISOString().split('.')[0] + 'Z' // Убираем миллисекунды
    : '';
  const repeatInterval = formula.repeatInterval;
  const frequency = formula.frequency;
  
  let specificDateTimeStr = '';
  if (formula.specificDateTime) {
    const { dayOfMonth, month, hours, minutes } = formula.specificDateTime;
    if (repeatInterval === 'MONTHS') {
      specificDateTimeStr = `${dayOfMonth}T${hours ?? '00'}:${minutes ?? '00'}`;
    } else if (repeatInterval === 'YEARS') {
      specificDateTimeStr = `${(month ?? '01')}-${dayOfMonth}T${hours ?? '00'}:${minutes ?? '00'}`;
    } else {
      specificDateTimeStr = `${dayOfMonth ?? '01'}T${hours ?? '00'}:${minutes ?? '00'}`;
    }
  }

  return [
    startDateStr,
    endDateStr,
    repeatInterval,
    frequency,
    specificDateTimeStr,
  ].join(';');
}
