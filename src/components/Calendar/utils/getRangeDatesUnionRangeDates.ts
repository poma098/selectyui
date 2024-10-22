export function getRangeDatesUnionRangeDates(
  firstDateRange: Date[],
  secondDateRange: Date[]
): Date[] {
  const dateSet = new Set<number>();

  // Добавляем даты из первого диапазона в множество
  for (const date of firstDateRange) {
    dateSet.add(date.getTime());
  }

  // Добавляем даты из второго диапазона в множество, избегая дубликатов
  for (const date of secondDateRange) {
    dateSet.add(date.getTime());
  }

  // Преобразуем множество обратно в массив дат
  const dates: Date[] = Array.from(dateSet).map((time) => new Date(time));

  return dates;
}