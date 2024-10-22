import { CalendarWeekend } from "../props.interface";

/**
 * Определяет номер недели в году для заданной даты.
 *
 * @param {Date} date - Дата, для которой нужно определить номер недели.
 * @param {CalendarWeekend} [startWeek=1] - Номер дня недели, с которого начинается неделя. По умолчанию 1 (понедельник).
 * @returns {number} Номер недели в году для указанной даты.
 *
 * @typedef {number} CalendarWeekend - Значение для определения первого дня недели:
 * - 0: Воскресенье
 * - 1: Понедельник (по умолчанию)
 * - 2: Вторник
 * - 3: Среда
 * - 4: Четверг
 * - 5: Пятница
 * - 6: Суббота
 */
export function getWeekNumber(date: Date, startWeek: CalendarWeekend = 1): number {
  // Устанавливаем дату на начало года
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  // Устанавливаем начало недели
  const startOfWeek = new Date(
    startOfYear.setDate(
      startOfYear.getDate() - ((startOfYear.getDay() - startWeek + 7) % 7)
    )
  );

  // Получаем номер недели
  const weekNumber = Math.ceil(
    ((date.getTime() - startOfWeek.getTime()) / 86400000 + 1) / 7
  );

  return weekNumber;
}
