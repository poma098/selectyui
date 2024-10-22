import { CalendarWeekend, Day } from "../props.interface";

/**
 * Получает массив объектов, представляющих дни недели с полными и короткими названиями для заданного языка и настроек.
 *
 * @param {CalendarWeekend} [startWeek=0] - Номер дня недели, с которого начинается неделя. Значение по умолчанию — 0 (воскресенье).
 * @param {CalendarWeekend[]} [weekends=[]] - Массив номеров дней недели, которые считаются выходными.
 * @param {string} [locale="en-US"] - Локаль для форматирования названий дней недели. По умолчанию "en-US".
 * @returns {Day[]} Массив объектов, представляющих дни недели. Каждый объект содержит полные и короткие названия дня, а также информацию о том, является ли день выходным.
 *
 * @typedef {number} CalendarWeekend - Значение для определения дня недели:
 * - 0: Воскресенье
 * - 1: Понедельник
 * - 2: Вторник
 * - 3: Среда
 * - 4: Четверг
 * - 5: Пятница
 * - 6: Суббота
 *
 * @typedef {Object} Day
 * @property {string} fullName - Полное название дня недели (например, "Monday").
 * @property {string} shortName - Короткое название дня недели (например, "Mon").
 * @property {boolean} isWeekend - `true`, если день недели является выходным, иначе `false`.
 */
export function getWeekDays(
  startWeek: CalendarWeekend = 0,
  weekends: CalendarWeekend[] = [],
  locale: string = "en-US"
): Day[] {
  const days: Day[] = [];
  const date = new Date(Date.UTC(2024, 0, 1)); // Начинаем с фиксированной даты (1 января 2024 года)

  // Определяем дни недели в зависимости от языка
  const formatterFull = new Intl.DateTimeFormat(locale, { weekday: "long" });
  const formatterShort = new Intl.DateTimeFormat(locale, { weekday: "short" });

  for (let i = 0; i < 7; i++) {
    const dayIndex = (startWeek + i) % 7;
    // Устанавливаем дату на первый день недели
    date.setUTCDate(
      date.getUTCDate() + ((dayIndex - date.getUTCDay() + 7) % 7)
    );
    // Обновляем форматирование
    const fullName = formatterFull.format(date);
    const shortName = formatterShort.format(date);

    days.push({
      fullName,
      shortName,
      isWeekend: weekends.includes(dayIndex as CalendarWeekend),
    });
  }

  return days;
}
