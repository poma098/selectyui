import { HexColor } from "utils/color/props.interface";

export interface CalendarProps {
  size?: CalendarSize;
  format?: CalendarFormat;
  activeDate?: Date;
  setActiveDate?: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  startWeek?: CalendarWeekend;
  holidaysVisible?: boolean;
  holidays?: CalendarHoliday[];
  visibleWeekend?: boolean;
  weekends?: CalendarWeekend[];
  weekendsColor?: HexColor;
  onChange?: (value: Date[]) => void;
  onMouseEnterItem?: (value: Date, item: ItemPropsCallback) => void;
  onMouseLeaveItem?: (value: Date, item: ItemPropsCallback) => void;
  onClickItem?: (value: Date, item: ItemPropsCallback) => void;
  value?: Date[];
  events?: CalendarEvent[];
  visibleEvents?: boolean;
  disabled?: boolean;
  visibleToday?: boolean;
  todayColor?: HexColor;
  formatText?: FormatTextCalendar;
  visibleWeekNumbers?: boolean;
  weekNumbersColor?: HexColor;
  visibleHeader?: boolean;
  visiblePrevNext?: boolean;
  customItem?: (value: Date, item: ItemPropsCallback) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
  selectedMode?: CalendarSelectedMode;
  cacheKey?: string;
  colums?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface ItemProps {
  isToday: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  isEvent: boolean;
  isDisabled: boolean;
  events: CalendarEvent[];
  holidays: CalendarHoliday[];
  weekNumber: number;
}

export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface ItemPropsCallback {
  isToday: boolean;
  isWeekend: boolean;
  isDisabled: boolean;
  loading: boolean;
  events: CalendarEvent[];
  holidays: CalendarHoliday[];
  weekNumber: number | number[];
  selected: boolean;
  selectedHovered: boolean;
  holidaysVisible: boolean;
  visibleEvents: boolean;
}

export interface CalendarHolidayBase {
  name: string;
  description?: string;
  icon?: string | React.ReactNode;
  color?: HexColor;
  durationDays?: number;
}

export interface CalendarHolidayFormula extends CalendarHolidayBase {
  formula?: RecurrenceFormula;
  date?: never;
}

export interface CalendarHolidayDate extends CalendarHolidayBase {
  formula?: never;
  date?: Date;
}

export type CalendarHoliday = CalendarHolidayFormula | CalendarHolidayDate;

export interface CalendarEventBase {
  name: string;
  description?: string;
  icon?: string | React.ReactNode;
  color?: HexColor;
  durationDays?: number;
}

export interface CalendarEventFormula extends CalendarEventBase {
  formula?: RecurrenceFormula;
  date?: never
}

export interface CalendarEventDate extends CalendarEventBase {
  formula?: never;
  date?: Date;
}

export type CalendarEvent = CalendarEventFormula | CalendarEventDate;

export type FormatTextCalendar = (date: Date) => string;

export type CalendarWeekend = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarSelectedMode = "click" | "mooving";

/**
 * Интерфейс для представления формулы повторения событий.
 *
 * @interface RecurrenceFormula
 * @property {Date} [startDate] - Дата и время начала первого события. Если не указана, предполагается, что событие начинается сразу.
 * @property {Date} [endDate] - Дата и время окончания последнего события. Если не указана, предполагается, что событие повторяется бесконечно.
 * @property {"MINUTES" | "HOURS" | "DAYS" | "MONTHS" | "QUARTERS" | "YEARS"} repeatInterval - Интервал повторения события. Определяет, как часто событие повторяется.
 * @property {number} frequency - Частота повторения события, выраженная в единицах интервала (например, каждые 2 дня, каждый месяц и т.д.).
 * @property {Object} [specificDateTime] - Опциональный объект, содержащий конкретные дату и время для повторяющихся событий.
 * @property {number} [specificDateTime.dayOfMonth] - День месяца, на который должно происходить событие (например, 15 для 15-го числа месяца). 
 * @property {number} [specificDateTime.month] - Месяц года, на который должно происходить событие (например, 3 для марта). Применяется только для интервалов "YEARS".
 * @property {number} [specificDateTime.hours] - Часы события в пределах дня (например, 14 для 14:00). Применяется только для интервалов "MONTHS" и "YEARS".
 * @property {number} [specificDateTime.minutes] - Минуты события в пределах часа (например, 30 для 30 минут). Применяется только для интервалов "MONTHS" и "YEARS".
 */
export interface RecurrenceFormula {
  startDate?: Date;
  endDate?: Date;
  repeatInterval:
    | "MINUTES"
    | "HOURS"
    | "DAYS"
    | "WEEKS"
    | "MONTHS"
    | "QUARTERS"
    | "YEARS";
  frequency: number;
  specificDateTime?: {
    dayOfWeek?: number;
    dayOfMonth?: number;
    month?: number;
    hours?: number;
    minutes?: number;
  };
}

export type CalendarSize = "small" | "medium" | "large";

export type CalendarFormat = "week" | "month" | "months" | "quarter" | "year";

export interface DaysForMonth {
  date: Date;
  thisMonth: boolean;
  thisYear: boolean;
  isToday: boolean;
  isWeekend: boolean;
  weekNumber: number;
  isRange: boolean;
}

export interface Day {
  fullName: string;
  shortName: string;
  isWeekend: boolean;
}

export interface Month {
  fullName: string;
  shortName: string;
}

export type AllowedGap =
  | "year"
  | "quarter"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | number;