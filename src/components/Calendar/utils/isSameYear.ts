/**
 * Проверяет, совпадают ли годы у двух дат.
 *
 * @param {Date} date1 - Первая дата для сравнения.
 * @param {Date} date2 - Вторая дата для сравнения.
 * @returns {boolean} `true`, если годы обеих дат совпадают, иначе `false`.
 */
export function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}
