/**
 * Проверяет, совпадают ли месяц и год двух дат.
 *
 * @param {Date} date1 - Первая дата для сравнения.
 * @param {Date} date2 - Вторая дата для сравнения.
 * @returns {boolean} Возвращает `true`, если месяцы и годы двух дат совпадают, иначе `false`.
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
