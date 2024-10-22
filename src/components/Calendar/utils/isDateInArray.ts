export function isDateInArray(date: Date, dates: Date[]): boolean {
  // Преобразуем целевую дату к строке с учетом только дня, месяца и года
  const targetDate = date.toDateString();

  // Проходим по массиву дат
  for (let d of dates) {
    // Если какая-то дата из массива совпадает с целевой, возвращаем true
    if (d.toDateString() === targetDate) {
      return true;
    }
  }

  // Если совпадений не найдено, возвращаем false
  return false;
}
