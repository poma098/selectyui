import {
  CalendarEvent,
  CalendarHoliday,
  CalendarSelectedMode,
  CalendarWeekend,
  ItemPropsCallback,
} from "../props.interface";

import { HexColor } from "utils";


export interface CalendarMonthProps {
  year?: number;
  month?: number;
  minDate?: Date;
  maxDate?: Date;
  startWeek?: CalendarWeekend;
  weekends?: CalendarWeekend[];
  visibleWeekend?: boolean;
  weekendsColor?: HexColor;
  visibleWeekNumbers?: boolean;
  weekNumbersColor?: HexColor;
  visibleHeader?: boolean;
  visiblePrevNext?: boolean;
  visibleTitle?: boolean;
  visibleToday?: boolean;
  todayColor?: HexColor;
  holidaysVisible?: boolean;
  holidays?: CalendarHoliday[];
  events?: CalendarEvent[];
  visibleEvents?: boolean;
  extended?: boolean;
  value?: Date[];
  customItem?: (value: Date, item: ItemPropsCallback) => React.ReactNode;
  selected?: boolean;
  handleClickCell?: (date: Date, start?: boolean, event?: React.MouseEvent) => void;
  selectedMode?: CalendarSelectedMode;
  selectedHovered?: (value: Date, type: "down" | "move", event?: React.MouseEvent) => void;
  selectedHoveredRange?: [Date | null, Date | null];
  cacheKey?: string;
  onMouseEnterItem?: (value: Date, item: ItemPropsCallback) => void;
  onMouseLeaveItem?: (value: Date, item: ItemPropsCallback) => void;
  onClickItem?: (value: Date, item: ItemPropsCallback) => void;
}