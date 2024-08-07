import { CalendarWeekend } from "../props.interface";

// Функция для определения номера недели в году
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
