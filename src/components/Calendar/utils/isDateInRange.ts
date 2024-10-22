export const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date) => {
  if (minDate && date < minDate) return false;
  if (maxDate && date > maxDate) return false;
  return true;
};
