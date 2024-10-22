export function getDatesForRange(satrt: Date, end: Date): Date[] {
  const dates: Date[] = [];
  for (let date = satrt; date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }
  return dates;
}