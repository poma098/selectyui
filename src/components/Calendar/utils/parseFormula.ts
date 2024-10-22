import { RecurrenceFormula } from "../props.interface";

/**
 * Парсит строку формулы повторения и возвращает объект типа `RecurrenceFormula`.
 *
 * Формат строки формулы должен быть следующим:
 * - `startDate`: Дата начала в формате ISO 8601 (опционально).
 * - `endDate`: Дата окончания в формате ISO 8601 (опционально).
 * - `repeatInterval`: Интервал повторения. Возможные значения: "MINUTES", "HOURS", "DAYS", "MONTHS", "QUARTERS", "YEARS".
 * - `frequency`: Частота повторений в единицах интервала. По умолчанию 1.
 * - `specificDateTime`: Строка с дополнительной информацией о дне и времени для интервалов "MONTHS" и "YEARS". Формат: `dayOfMonthTtime` или `month-dayTtime`.
 *
 * @param {string} formula - Строка формулы для парсинга.
 * @returns {RecurrenceFormula} - Объект, представляющий формулу повторения.
 *
 * @example
 * const formula = "2023-01-01T00:00:00Z;;MONTHS;1;15T14:30";
 * const parsed = parseFormula(formula);
 * // parsed будет равен:
 * // {
 * //   startDate: new Date("2023-01-01T00:00:00Z"),
 * //   repeatInterval: "MONTHS",
 * //   frequency: 1,
 * //   specificDateTime: {
 * //     dayOfMonthAndTime: {
 * //       dayOfMonth: 15,
 * //       hours: 14,
 * //       minutes: 30
 * //     }
 * //   }
 * // }
 *
 * @example
 * const formula = ";;YEARS;5;07-15T10:00";
 * const parsed = parseFormula(formula);
 * // parsed будет равен:
 * // {
 * //   endDate: undefined,
 * //   repeatInterval: "YEARS",
 * //   frequency: 5,
 * //   specificDateTime: {
 * //     monthAndDay: {
 * //       month: 7,
 * //       day: 15
 * //     },
 * //     hours: 10,
 * //     minutes: 0
 * //   }
 * // }
 */
export function parseFormula(formula: string): RecurrenceFormula {
  const [startStr, endStr, repeatInterval, frequencyStr, specificDateTimeStr] =
    formula.split(";");

  // Проверяем и создаем дату начала
  const startDate = startStr ? new Date(startStr) : undefined;

  // Проверяем и создаем дату окончания, если она есть
  const endDate = endStr ? new Date(endStr) : undefined;

  // Преобразуем строку частоты в число, с дефолтным значением 1
  const frequency = parseInt(frequencyStr, 10) || 1;

  // Инициализируем объект specificDateTime
  const specificDateTime: RecurrenceFormula["specificDateTime"] = {};

  if (specificDateTimeStr) {
    if (repeatInterval === "MONTHS") {
      const [dayOfMonth, time] = specificDateTimeStr.split("T");
      specificDateTime.dayOfMonth = parseInt(dayOfMonth, 10);
      if (time) {
        const [hours, minutes] = time.split(":").map(Number);
        specificDateTime.hours = hours;
        specificDateTime.minutes = minutes;
      }
    } else if (repeatInterval === "YEARS") {
      const [monthAndDay] = specificDateTimeStr.split("T");
      const [month, day] = monthAndDay.split("-").map(Number);
      specificDateTime.dayOfMonth = day;
      specificDateTime.month = month;
    } else {
      // Для интервалов, отличных от MONTHS и YEARS, предполагаем, что это dayOfMonth
      specificDateTime.dayOfMonth = parseInt(specificDateTimeStr, 10);
    }
  }

  return {
    startDate,
    endDate,
    repeatInterval: repeatInterval as RecurrenceFormula["repeatInterval"],
    frequency,
    specificDateTime:
      specificDateTime.dayOfMonth !== undefined ? specificDateTime : undefined,
  };
}
