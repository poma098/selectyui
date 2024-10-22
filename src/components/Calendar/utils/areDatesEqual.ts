/**
 * Сравнивает две даты и определяет, являются ли они эквивалентными до миллисекунд.
 *
 * @param {Date} date1 - Первая дата для сравнения.
 * @param {Date} date2 - Вторая дата для сравнения.
 *
 * @returns {boolean} Возвращает `true`, если обе даты равны по году, месяцу, дню, часу, минуте, секунде и миллисекунде, иначе `false`.
 */
export function areDatesEqual(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes() &&
    date1.getSeconds() === date2.getSeconds() &&
    date1.getMilliseconds() === date2.getMilliseconds()
  );
}
