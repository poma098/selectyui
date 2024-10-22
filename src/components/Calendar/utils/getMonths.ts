export function getMonths(year: number): Date[] {
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(new Date(year, i, 1, 0, 0, 0, 0));
  }
  return months;
}