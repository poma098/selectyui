import { areDatesEqual } from "./areDatesEqual";

/**
 * Проверяет, находится ли данная дата в пределах одной недели до или после указанной даты.
 * 
 * @param {Date} date - Дата для проверки.
 * @param {Date} referenceDate - Ссылка на дату, относительно которой происходит проверка.
 * @param {"before" | "after"} direction - Направление проверки: "before" (до) или "after" (после) указанной даты.
 * @param {number} weekInMilliseconds - Количество миллисекунд в диапазоне. По умолчанию равно `7 * 24 * 60 * 60 * 1000` (неделя).
 * 
 * @returns {boolean} Возвращает `true`, если `date` находится в пределах одной недели до или после `referenceDate` в зависимости от указанного направления, иначе `false`.
 */
export function isDateWithinWeek(
  date: Date,
  referenceDate: Date,
  direction: "before" | "after",
  milliseconds: number = 7 * 24 * 60 * 60 * 1000
): boolean {
  const targetDate = new Date(referenceDate);
  if (direction === "before") {
    targetDate.setTime(targetDate.getTime() - milliseconds);
  } else {
    targetDate.setTime(targetDate.getTime() + milliseconds);
  }
  return areDatesEqual(date, targetDate);
}
