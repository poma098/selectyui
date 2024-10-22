import { Month, MonthIndex } from "../props.interface";

/**
 * Получает массив объектов, представляющих месяцы года с полными и короткими названиями для заданного языка и настроек.
 *
 * @param {getMonthsName} [startMonth=0] - Номер месяца, с которого начинается год. Значение по умолчанию — 0 (январь).
 * @param {string} [locale="en-US"] - Локаль для форматирования названий месяцев. По умолчанию "en-US".
 * @returns {Month[]} Массив объектов, представляющих месяцы года. Каждый объект содержит полные и короткие названия месяца.
 *
 * @typedef {number} getMonthsName - Значение для определения месяца:
 * - 0: Январь
 * - 1: Февраль
 * - 2: Март
 * - 3: Апрель
 * - 4: Май
 * - 5: Июнь
 * - 6: Июль
 * - 7: Август
 * - 8: Сентябрь
 * - 9: Октябрь
 * - 10: Ноябрь
 * - 11: Декабрь
 *
 * @typedef {Object} Month
 * @property {string} fullName - Полное название месяца (например, "January").
 * @property {string} shortName - Короткое название месяца (например, "Jan").
 */
export function getMonthsName(
  startMonth: MonthIndex = 0,
  locale: string = "en-US"
): Month[] {
  const months: Month[] = [];
  const date = new Date(Date.UTC(2024, startMonth, 1)); // Начинаем с фиксированной даты (1 января 2024 года)

  // Определяем месяцы в зависимости от языка
  const formatterFull = new Intl.DateTimeFormat(locale, { month: "long" });
  const formatterShort = new Intl.DateTimeFormat(locale, { month: "short" });

  for (let i = 0; i < 12; i++) {
    const monthIndex = (startMonth + i) % 12;
    // Устанавливаем дату на первый день месяца
    date.setUTCMonth(monthIndex);
    // Обновляем форматирование
    const fullName = formatterFull.format(date);
    const shortName = formatterShort.format(date);

    // Ставим первую букву в верхний регистр
    const fullNameUpper = fullName.charAt(0).toUpperCase() + fullName.slice(1);
    const shortNameUpper = shortName.charAt(0).toUpperCase() + shortName.slice(1);

    months.push({
      fullName: fullNameUpper,
      shortName: shortNameUpper,
    });
  }

  return months;
}
