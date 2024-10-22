import { AllowedGap } from "../props.interface";
import { areDatesEqual } from "./areDatesEqual";
import { isDateWithinWeek } from "./isDateWithinWeek";
import { isGapAllowed } from "./isGapAllowed";

// Вынесем функцию проверки наличия даты в месяце за пределы блока
function hasDateInMonth(
  sortedDates: Date[],
  year: number,
  month: number
): boolean {
  // Корректируем год и месяц при выходе за границы
  let adjustedYear = year;
  let adjustedMonth = month;

  if (adjustedMonth < 0) {
    adjustedYear--;
    adjustedMonth += 12;
  } else if (adjustedMonth >= 12) {
    adjustedYear++;
    adjustedMonth -= 12;
  }

  const startDate = new Date(adjustedYear, adjustedMonth, 1);
  const endDate = new Date(adjustedYear, adjustedMonth + 1, 0);
  return sortedDates.some((date) => {
    const dateTimestamp = date.getTime();
    return (
      dateTimestamp >= startDate.getTime() && dateTimestamp <= endDate.getTime()
    );
  });
}

// Основная функция проверки состояния даты
export function checkDateStatus(
  currentDate: Date,
  sortedDates: Date[],
  allowedGap: AllowedGap,
  columnCount: number = 3
): {
  isCurrentDateFound: boolean;
  hasLeftNeighbor: boolean;
  hasRightNeighbor: boolean;
  hasTopNeighbor: boolean;
  hasBottomNeighbor: boolean;
  hasLeftBottomNeighbor: boolean;
  hasRightTopNeighbor: boolean;
  hasLeftTopNeighbor: boolean;
  hasRightBottomNeighbor: boolean;
} {
  let isCurrentDateFound = false;
  let hasLeftNeighbor = false;
  let hasRightNeighbor = false;
  let hasTopNeighbor = false;
  let hasBottomNeighbor = false;
  let hasLeftBottomNeighbor = false;
  let hasRightTopNeighbor = false;
  let hasLeftTopNeighbor = false;
  let hasRightBottomNeighbor = false;

  for (let i = 0; i < sortedDates.length; i++) {
    const current = sortedDates[i];

    if (areDatesEqual(currentDate, current)) {
      isCurrentDateFound = true;

      if (allowedGap === "day") {
        if (i > 0) {
          const previous = sortedDates[i - 1];
          hasLeftNeighbor = isGapAllowed(current, previous, allowedGap);
        }

        if (i < sortedDates.length - 1) {
          const next = sortedDates[i + 1];
          hasRightNeighbor = isGapAllowed(current, next, allowedGap);
        }

        for (let j = 0; j < sortedDates.length; j++) {
          const date = sortedDates[j];
          if (
            isDateWithinWeek(
              date,
              currentDate,
              "before",
              7 * 24 * 60 * 60 * 1000
            )
          ) {
            hasTopNeighbor = true;
          }
          if (
            isDateWithinWeek(
              date,
              currentDate,
              "after",
              7 * 24 * 60 * 60 * 1000
            )
          ) {
            hasBottomNeighbor = true;
          }
          if (
            isDateWithinWeek(
              date,
              currentDate,
              "after",
              6 * 24 * 60 * 60 * 1000
            )
          ) {
            hasLeftBottomNeighbor = true;
          }
          if (
            isDateWithinWeek(
              date,
              currentDate,
              "before",
              8 * 24 * 60 * 60 * 1000
            )
          ) {
            hasLeftTopNeighbor = true;
          }
          if (
            isDateWithinWeek(
              date,
              currentDate,
              "before",
              6 * 24 * 60 * 60 * 1000
            )
          ) {
            hasRightTopNeighbor = true;
          }
          if (
            isDateWithinWeek(
              date,
              currentDate,
              "after",
              8 * 24 * 60 * 60 * 1000
            )
          ) {
            hasRightBottomNeighbor = true;
          }
        }
      }

      if (allowedGap === "month") {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Определяем соседние месяцы и диагональные месяцы
        const months = [
          { month: currentMonth - 1, year: currentYear }, // Месяц слева
          { month: currentMonth + 1, year: currentYear }, // Месяц справа
          { month: currentMonth - columnCount, year: currentYear }, // Месяц вверх по колонкам
          { month: currentMonth + columnCount, year: currentYear }, // Месяц вниз по колонкам
          { month: currentMonth - columnCount - 1, year: currentYear }, // Левый верхний диагональный месяц
          { month: currentMonth + columnCount - 1, year: currentYear }, // Левый нижний диагональный месяц
          { month: currentMonth - columnCount + 1, year: currentYear }, // Правый верхний диагональный месяц
          { month: currentMonth + columnCount + 1, year: currentYear }, // Правый нижний диагональный месяц
        ];

        for (let { month, year } of months) {
          if (hasDateInMonth(sortedDates, year, month)) {
            // Определяем, какой именно месяц был найден
            if (month === currentMonth - 1 && year === currentYear) {
              hasLeftNeighbor = true;
            } else if (month === currentMonth + 1 && year === currentYear) {
              hasRightNeighbor = true;
            } else if (
              month === currentMonth - columnCount &&
              year === currentYear
            ) {
              hasTopNeighbor = true;
            } else if (
              month === currentMonth + columnCount &&
              year === currentYear
            ) {
              hasBottomNeighbor = true;
            } else if (
              month === currentMonth - columnCount - 1 &&
              year === currentYear
            ) {
              hasLeftTopNeighbor = true;
            } else if (
              month === currentMonth + columnCount - 1 &&
              year === currentYear
            ) {
              hasLeftBottomNeighbor = true;
            } else if (
              month === currentMonth - columnCount + 1 &&
              year === currentYear
            ) {
              hasRightTopNeighbor = true;
            } else if (
              month === currentMonth + columnCount + 1 &&
              year === currentYear
            ) {
              hasRightBottomNeighbor = true;
            }
          }
        }
      }
      break;
    }
  }

  return {
    isCurrentDateFound,
    hasLeftNeighbor,
    hasRightNeighbor,
    hasTopNeighbor,
    hasBottomNeighbor,
    hasLeftBottomNeighbor,
    hasRightTopNeighbor,
    hasLeftTopNeighbor,
    hasRightBottomNeighbor,
  };
}
