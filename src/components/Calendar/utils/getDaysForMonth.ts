import { CalendarWeekend, DaysForMonth } from "../props.interface";
import { getWeekNumber } from "./getWeekNumber";
import { isSameDay } from "./isSameDay";
import { isSameMonth } from "./isSameMonth";
import { isSameYear } from "./isSameYear";

/**
 * Получает массив объектов, представляющих все дни месяца, включая дни из предыдущего и следующего месяцев для заполнения календаря.
 *
 * @param {number} [year=new Date().getFullYear()] - Год для которого нужно получить дни месяца. По умолчанию текущий год.
 * @param {number} [month=new Date().getMonth()] - Месяц для которого нужно получить дни (0 для января, 11 для декабря). По умолчанию текущий месяц.
 * @param {CalendarWeekend} [startWeek=1] - Номер дня недели, с которого начинается неделя. Значение по умолчанию — 1 (понедельник).
 * @param {CalendarWeekend[]} [weekends=[0, 6]] - Массив номеров дней недели, которые считаются выходными. По умолчанию включает воскресенье и субботу.
 * @returns {DaysForMonth[]} Массив объектов, представляющих дни месяца, включая дни из предыдущего и следующего месяцев.
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
 * @typedef {Object} DaysForMonth
 * @property {Date} date - Дата, представляющая день месяца.
 * @property {boolean} thisMonth - `true`, если день принадлежит текущему месяцу, иначе `false`.
 * @property {boolean} thisYear - `true`, если день принадлежит текущему году, иначе `false`.
 * @property {boolean} isToday - `true`, если день является сегодняшним.
 * @property {boolean} isWeekend - `true`, если день является выходным (по настроенным выходным дням).
 * @property {number} weekNumber - Номер недели для данного дня.
 * @property {boolean} isRange - `true`, если день принадлежит текущему месяцу, иначе `false`.
 */
export function getDaysForMonth(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth(),
  startWeek: CalendarWeekend = 1,
  weekends: CalendarWeekend[] = [0, 6],
  extended: boolean = false
): DaysForMonth[] {
  const days: DaysForMonth[] = [];
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  const today = new Date(); // текущая дата

  // Определяем первый день недели для первого дня месяца
  let firstDayIndex = (firstDate.getDay() - startWeek + 7) % 7;

  // Определяем функцию для проверки выходного дня
  const isWeekend = (date: Date): boolean =>
    weekends.includes(date.getDay() as CalendarWeekend);

  // Добавляем дни из предыдущего месяца
  if (firstDayIndex !== 0) {
    const prevMonthDate = new Date(year, month, 1);
    prevMonthDate.setDate(0); // последний день предыдущего месяца
    const startPrevMonthDate = prevMonthDate.getDate() - firstDayIndex + 1;
    for (let i = startPrevMonthDate; i <= prevMonthDate.getDate(); i++) {
      const date = new Date(
        prevMonthDate.getFullYear(),
        prevMonthDate.getMonth(),
        i
      );
      days.push({
        date,
        thisMonth: isSameMonth(date, today),
        thisYear: isSameYear(date, today),
        isToday: isSameDay(date, today),
        isWeekend: isWeekend(date),
        weekNumber: getWeekNumber(date, startWeek),
        isRange: false,
      });
    }
  }

  // Добавляем дни текущего месяца
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push({
      date: new Date(date),
      thisMonth: isSameMonth(date, today),
      thisYear: isSameYear(date, today),
      isToday: isSameDay(date, today),
      isWeekend: isWeekend(date),
      weekNumber: getWeekNumber(date, startWeek),
      isRange: true,
    });
    date.setDate(date.getDate() + 1);
  }

  // Определяем последний день недели для последнего дня месяца
  let lastDayIndex = (lastDate.getDay() - startWeek + 7) % 7;

  // Добавляем дни из следующего месяца
  if (lastDayIndex !== 6) {
    const endNextMonthDate = 6 - lastDayIndex;
    for (let i = 1; i <= endNextMonthDate; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        thisMonth: isSameMonth(date, today),
        thisYear: isSameYear(date, today),
        isToday: isSameDay(date, today),
        isWeekend: isWeekend(date),
        weekNumber: getWeekNumber(date, startWeek),
        isRange: false,
      });
    }
  }

  // Добавляем еще 7 дней, если days.length меньше 42
  if (extended && days.length < 42) {
    const additionalDaysNeeded = 42 - days.length; // Сколько дней нужно добавить
    const lastDateInDays = days[days.length - 1].date; // Последняя дата в массиве

    for (let i = 1; i <= additionalDaysNeeded; i++) {
      const date = new Date(lastDateInDays);
      date.setDate(lastDateInDays.getDate() + i);
      days.push({
        date,
        thisMonth: isSameMonth(date, today),
        thisYear: isSameYear(date, today),
        isToday: isSameDay(date, today),
        isWeekend: isWeekend(date),
        weekNumber: getWeekNumber(date, startWeek),
        isRange: false,
      });
    }
  }

  return days;
}