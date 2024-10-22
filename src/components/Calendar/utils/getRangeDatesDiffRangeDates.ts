export function getRangeDatesDiffRangeDates(
  minuendRange: Date[],
  subtrahendRange: Date[]
): Date[] {
  const dates: Date[] = [];

  // Преобразуем второй диапазон в Set для быстрого поиска
  const subtrahendSet = new Set(subtrahendRange.map((date) => date.getTime()));

  // Проходим по первому диапазону и добавляем только те даты, которых нет во втором диапазоне
  for (const date of minuendRange) {
    if (!subtrahendSet.has(date.getTime())) {
      dates.push(date);
    }
  }

  return dates;
}
