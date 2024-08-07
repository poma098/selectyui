import { CalendarWeekend, DaysForMonth } from "../props.interface";
import { getWeekNumber } from "./getWeekNumber";
import { isSameDay } from "./isSameDay";
import { isSameMonth } from "./isSameMonth";
import { isSameYear } from "./isSameYear";

export function getDaysForMonth(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth(),
  startWeek: CalendarWeekend = 1,
  weekends: CalendarWeekend[] = [0, 6]
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
      });
    }
  }

  return days;
}