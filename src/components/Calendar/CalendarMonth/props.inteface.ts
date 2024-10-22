import { CalendarEvent, CalendarHoliday, CalendarSelectedMode, CalendarWeekend, ItemPropsCallback, MonthIndex } from "../props.interface";

import { HexColor } from "utils";

export interface CalendarMonthProps {
  year?: number;
  month?: MonthIndex;
  minDate?: Date;
  maxDate?: Date;
  value?: Date[];
  holidays?: CalendarHoliday[];
  events?: CalendarEvent[];
  selected?: boolean;
  selectedHoveredRange?: [Date | null, Date | null];
  handleClickCell?: (
    date: Date,
    start?: boolean,
    event?: React.MouseEvent
  ) => void;
  selectedMode?: CalendarSelectedMode;
  onMouseEnterItem?: (value: Date, item: ItemPropsCallback) => void;
  onMouseLeaveItem?: (value: Date, item: ItemPropsCallback) => void;
  onClickItem?: (value: Date, item: ItemPropsCallback) => void;
  selectedHovered?: (
    value: Date,
    type: "down" | "move",
    event?: React.MouseEvent
  ) => void;
  disabled?: boolean;
  visibleToday?: boolean;
  todayColor?: HexColor;
  customItem?: (value: Date, item: ItemPropsCallback) => React.ReactNode;
  holidaysVisible?: boolean;
  visibleEvents?: boolean;
  startWeek?: CalendarWeekend;
  weekends?: CalendarWeekend[];
  cacheKey?: string;
  colums?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}