/**
 * Проверяет, совпадают ли день, месяц и год двух дат.
 *
 * @param {Date} date1 - Первая дата для сравнения.
 * @param {Date} date2 - Вторая дата для сравнения.
 * @returns {boolean} Возвращает `true`, если дни, месяцы и годы двух дат совпадают, иначе `false`.
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
