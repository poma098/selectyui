import { HexColor } from "utils/color/props.interface";

export interface CalendarProps {
  size?: CalendarSize;
  format?: CalendarFormat;
  minDate?: Date;
  maxDate?: Date;
  startWeek?: CalendarWeekend;
  holidaysVisible?: boolean;
  holidays?: CalendarHoliday[];
  visibleWeekend?: boolean;
  weekends?: CalendarWeekend[];
  onChange?: (value: Date) => void;
  onMouseEnterItem?: (value: Date) => void;
  onMouseLeaveItem?: (value: Date) => void;
  onClickItem?: (value: Date) => void;
  value?: Date | Date[];
  events?: CalendarEvent[];
  visibleEvents?: boolean;
  disabled?: boolean;
  visibleToday?: boolean;
  todayColor?: HexColor;
  formatText?: FormatText;
  visibleWeekNumbers?: boolean;
  weekNumbersColor?: HexColor;
  visibleHeader?: boolean;
  visiblePrevNext?: boolean;
  customItem?: (value: Date, item: ItemProps) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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

export interface CalendarHoliday {
  date: EventDateFormat;
  name: string;
  description?: string;
  icon?: string | React.ReactNode;
  color?: HexColor;
  durationDays?: number;
}

export interface CalendarEvent {
  date: EventDateFormat;
  name: string;
  description?: string;
  icon?: string | React.ReactNode;
  color?: HexColor;
  timeStart?: EventTimeFormat;
  timeEnd?: EventTimeFormat;
}

export type FormatText = (date: Date) => string;

export type CalendarWeekend = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// Формат: конкретная дата или повторяющиеся даты каждый день, каждую неделю, каждый месяц, каждый квартал, каждый год
// Примеры:
// Каждое первое января "YYYY-1-1".
// Каждую неделю в ПН "W-1".
// Каждый месяц первого числа "YYYY-MM-1".
// Каждый квартал первого числа "Q-1".
// Каждый квартал первой недели "Q-W-1".
// Каждый 2 квартал первого числа "Q2-1".
// Каждый 2 квартал первой недели "Q2-W-1".
export type EventDateFormat =
  | Date
  | number
  | `YYYY-${number}-${number}`
  | `W-${CalendarWeekend}`
  | `YYYY-MM-${number}`
  | `Q-${number}`
  | `Q${number}-W-${number}`
  | `Q-W-${number}`
  | `Q${number}-${number}`;

export type EventTimeFormat = `${number}:${number}` | `${number}:${number}:${number}`;

export type CalendarSize = "small" | "large";

export type CalendarFormat = "week" | "month" | "quarter" | "year";

export interface DaysForMonth {
  date: Date;
  thisMonth: boolean;
  thisYear: boolean;
  isToday: boolean;
  isWeekend: boolean;
  weekNumber: number;
}