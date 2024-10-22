import { AllowedGap } from "../props.interface";

/**
 * Проверяет, соответствует ли разница между двумя датами допустимому разрыву.
 *
 * @param {Date} date1 - Первая дата для сравнения.
 * @param {Date} date2 - Вторая дата для сравнения.
 * @param {AllowedGap} gapType - Допустимый разрыв, который может быть числом (миллисекунды) или строкой (например, "year", "month").
 *
 * @returns {boolean} Возвращает `true`, если разница между датами меньше или равна допустимому разрыву, иначе `false`.
 */
export function isGapAllowed(
  date1: Date,
  date2: Date,
  gapType: AllowedGap
): boolean {
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());

  if (typeof gapType === "number") {
    // Если gapType - число, сравниваем его с разницей во времени
    return diffInMilliseconds <= gapType;
  }

  switch (gapType) {
    case "year":
      return Math.abs(date1.getFullYear() - date2.getFullYear()) <= 1;
    case "quarter": {
      const yearDiff = Math.abs(date1.getFullYear() - date2.getFullYear());
      const quarter1 = Math.floor(date1.getMonth() / 3);
      const quarter2 = Math.floor(date2.getMonth() / 3);
      return (
        (yearDiff === 0 && Math.abs(quarter1 - quarter2) <= 1) ||
        (yearDiff === 1 && quarter1 === 0 && quarter2 === 3)
      );
    }
    case "month": {
      const year1 = date1.getFullYear();
      const year2 = date2.getFullYear();
      const month1 = date1.getMonth();
      const month2 = date2.getMonth();

      // Если даты находятся в одном месяце одного года, возвращаем false
      if (year1 === year2 && month1 === month2) {
        return false;
      }

      // Если разница в месяцах не более одного, возвращаем true
      if (
        (year1 === year2 && Math.abs(month1 - month2) === 1) ||
        (year1 + 1 === year2 && month1 === 11 && month2 === 0)
      ) {
        return true;
      }

      // В остальных случаях возвращаем false
      return false;
    }
    case "week":
      return diffInMilliseconds <= 7 * 24 * 60 * 60 * 1000;
    case "day":
      return diffInMilliseconds <= 24 * 60 * 60 * 1000;
    case "hour":
      return diffInMilliseconds <= 60 * 60 * 1000;
    case "minute":
      return diffInMilliseconds <= 60 * 1000;
    default:
      return false;
  }
}
