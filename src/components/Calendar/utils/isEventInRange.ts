import { RecurrenceFormula } from "../props.interface";

// Глобальный кэш для функции isEventInRange, инициализируется лениво
let eventRangeCache: Map<string, boolean> | undefined;

// Кэш для хранения нескольких следующих вхождений события, инициализируется лениво
let nextOccurrencesCache: Map<string, number[]> | undefined;

// Основная функция для проверки, попадает ли событие в указанный диапазон
export function isEventInRange(
  formula: RecurrenceFormula | Date,
  range: [Date, Date],
  durationEvent: number = 1,
  signal?: AbortSignal
): boolean {
  const rangeStart = range[0].getTime();
  const rangeEnd = range[1].getTime();
  const cacheKey = `${getFormulaKey(
    formula
  )}|${rangeStart}|${rangeEnd}|${durationEvent}`;

  // Ленивая инициализация eventRangeCache
  if (!eventRangeCache) {
    eventRangeCache = new Map<string, boolean>();
  }

  // Проверка в глобальном кэше
  if (eventRangeCache.has(cacheKey)) {
    return eventRangeCache.get(cacheKey)!;
  }

  if (signal?.aborted) {
    return false;
  }

  if (formula instanceof Date) {
    const formulaTime = formula.getTime();
    const result = formulaTime >= rangeStart && formulaTime <= rangeEnd;
    eventRangeCache.set(cacheKey, result);
    return result;
  }

  let {
    startDate = new Date(0),
    endDate,
    repeatInterval,
    frequency = 1,
    specificDateTime,
  } = formula;

  if (frequency <= 0) frequency = 1;
  const startTime = startDate.getTime();
  const endTime = endDate?.getTime();

  // Если начало события за пределами диапазона, оно не может в него попасть
  if (startTime > rangeEnd || (endTime !== undefined && endTime < rangeStart)) {
    eventRangeCache.set(cacheKey, false);
    return false;
  }

  let nextOccurrenceTime = startTime;

  // Если первая возможная дата уже вне диапазона, выход из функции
  if (nextOccurrenceTime > rangeEnd) {
    eventRangeCache.set(cacheKey, false);
    return false;
  }

  while (nextOccurrenceTime <= rangeEnd) {
    const eventEndDate = calculateEventEndDate(
      nextOccurrenceTime,
      durationEvent
    );

    // Если событие пересекается с диапазоном
    if (nextOccurrenceTime <= rangeEnd && eventEndDate >= rangeStart) {
      eventRangeCache.set(cacheKey, true);
      return true;
    }

    // Если событие заканчивается до начала диапазона или выходит за пределы endDate
    if (endTime !== undefined && nextOccurrenceTime > endTime) break;

    // Получаем массив следующих вхождений
    const nextOccurrences = getNextOccurrences(
      nextOccurrenceTime,
      repeatInterval,
      frequency,
      specificDateTime
    );

    // Обновляем время следующего вхождения и проверяем, не выходит ли оно за пределы диапазона
    nextOccurrenceTime = nextOccurrences.find(time => time > nextOccurrenceTime) ?? nextOccurrenceTime;

    if (nextOccurrenceTime > rangeEnd) break;
  }

  eventRangeCache.set(cacheKey, false);
  return false;
}

// Функция для получения нескольких следующих дат повторения события с кэшированием
function getNextOccurrences(
  time: number,
  repeatInterval: string,
  frequency: number,
  specificDateTime?: RecurrenceFormula["specificDateTime"]
): number[] {
  // Ленивая инициализация nextOccurrencesCache
  if (!nextOccurrencesCache) {
    nextOccurrencesCache = new Map<string, number[]>();
  }

  const cacheKey = `${time}|${repeatInterval}|${frequency}|${specificDateTimeKey(
    specificDateTime
  )}`;

  if (nextOccurrencesCache.has(cacheKey)) {
    return nextOccurrencesCache.get(cacheKey)!;
  }

  // Вычисляем и кэшируем следующие N повторений (например, 5 следующих повторений)
  const occurrences: number[] = [];
  let nextTime = time;

  for (let i = 0; i < 5; i++) {
    nextTime = calculateNextOccurrence(
      nextTime,
      repeatInterval,
      frequency,
      specificDateTime
    );
    occurrences.push(nextTime);
  }

  nextOccurrencesCache.set(cacheKey, occurrences);
  return occurrences;
}

// Кэш для конечной даты события
const eventEndDateCache = new Map<string, number>();

// Функция для вычисления конечной даты события с кэшированием
function calculateEventEndDate(time: number, duration: number): number {
  const cacheKey = `${time}|${duration}`;
  if (eventEndDateCache.has(cacheKey)) {
    return eventEndDateCache.get(cacheKey)!;
  }

  const eventEndTime = time + (duration - 1) * 24 * 60 * 60 * 1000;

  eventEndDateCache.set(cacheKey, eventEndTime);
  return eventEndTime;
}

// Функция для генерации ключа для specificDateTime
function specificDateTimeKey(
  specificDateTime?: RecurrenceFormula["specificDateTime"]
): string {
  if (!specificDateTime) return "";

  const {
    dayOfWeek,
    dayOfMonth,
    month,
    hours = 0,
    minutes = 0,
  } = specificDateTime;

  return `${dayOfWeek ?? ""}|${dayOfMonth ?? ""}|${
    month ?? ""
  }|${hours}|${minutes}`;
}

// Функция для вычисления ключа формулы
function getFormulaKey(formula: RecurrenceFormula | Date): string {
  if (formula instanceof Date) {
    return `Date|${formula.getTime()}`;
  }

  const { startDate, endDate, repeatInterval, frequency, specificDateTime } =
    formula;

  return `Formula|${startDate?.getTime() ?? 0}|${
    endDate?.getTime() ?? ""
  }|${repeatInterval}|${frequency}|${specificDateTimeKey(specificDateTime)}`;
}

// Функция для вычисления следующей даты повторения события
function calculateNextOccurrence(
  time: number,
  repeatInterval: string,
  frequency: number,
  specificDateTime?: RecurrenceFormula["specificDateTime"]
): number {
  const nextTime = new Date(time);

  if (specificDateTime) {
    return calculateNextWithSpecificDateTime(
      nextTime,
      specificDateTime,
      repeatInterval,
      frequency
    ).getTime();
  }

  switch (repeatInterval) {
    case "MINUTES":
      nextTime.setMinutes(nextTime.getMinutes() + 60 * frequency);
      break;
    case "HOURS":
      nextTime.setHours(nextTime.getHours() + frequency);
      break;
    case "DAYS":
      nextTime.setDate(nextTime.getDate() + frequency);
      break;
    case "WEEKS":
      nextTime.setDate(nextTime.getDate() + 7 * frequency);
      break;
    case "MONTHS":
      nextTime.setMonth(nextTime.getMonth() + frequency);
      break;
    case "QUARTERS":
      nextTime.setMonth(nextTime.getMonth() + 3 * frequency);
      break;
    case "YEARS":
      nextTime.setFullYear(nextTime.getFullYear() + frequency);
      break;
    default:
      throw new Error(`Unknown repeat interval: ${repeatInterval}`);
  }

  return nextTime.getTime();
}

// Функция для вычисления следующей даты с учетом specificDateTime
function calculateNextWithSpecificDateTime(
  date: Date,
  specificDateTime: RecurrenceFormula["specificDateTime"],
  repeatInterval: string,
  frequency: number
): Date {
  const {
    dayOfWeek,
    dayOfMonth,
    month,
    hours = 0,
    minutes = 0,
  } = specificDateTime;

  switch (repeatInterval) {
    case "WEEKS":
      if (dayOfWeek !== undefined) {
        const daysToAdd = (dayOfWeek - date.getDay() + 7) % 7 || 7;
        date.setDate(date.getDate() + daysToAdd + 7 * (frequency - 1));
      }
      break;
    case "MONTHS":
      if (dayOfMonth !== undefined) {
        date.setMonth(date.getMonth() + frequency);
        date.setDate(dayOfMonth);
      }
      break;
    case "YEARS":
      if (dayOfMonth !== undefined) {
        date.setFullYear(date.getFullYear() + frequency);
        if (month !== undefined) {
          date.setMonth(month - 1);
        }
        date.setDate(dayOfMonth);
      }
      break;
    default:
      throw new Error(
        `Unsupported repeat interval with specific date time: ${repeatInterval}`
      );
  }

  date.setHours(hours, minutes, 0, 0);
  return date;
}