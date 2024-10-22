export function isDateIncluded(date: Date, dateRange: Date[]): boolean {
  // Преобразуем диапазон в Set для быстрого поиска
  const dateSet = new Set(dateRange.map((d) => d.getTime()));

  // Проверяем, содержится ли заданная дата в множестве
  return dateSet.has(date.getTime());
}
