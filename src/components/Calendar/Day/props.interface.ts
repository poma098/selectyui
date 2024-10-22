import { HexColor } from "utils";
import {
  CalendarEvent,
  CalendarHoliday,
  CalendarSelectedMode,
  DaysForMonth,
  ItemPropsCallback,
} from "../props.interface";

export interface CalendarDayProps extends DaysForMonth {
  visibleToday?: boolean;
  todayColor?: HexColor;
  disabled?: boolean;
  holidaysVisible?: boolean;
  holidays?: CalendarHoliday[];
  events?: CalendarEvent[];
  visibleEvents?: boolean;
  value?: Date[];
  customItem?: (value: Date, item: ItemPropsCallback) => React.ReactNode;
  selected?: boolean;
  handleClickCell?: (
    date: Date,
    start?: boolean,
    event?: React.MouseEvent
  ) => void;
  selectedMode?: CalendarSelectedMode;
  selectedHovered?: (
    value: Date,
    type: "down" | "move",
    event?: React.MouseEvent
  ) => void;
  selectedHoveredRange?: [Date | null, Date | null];
  cacheKey?: string;
  onMouseEnterItem?: (value: Date, item: ItemPropsCallback) => void;
  onMouseLeaveItem?: (value: Date, item: ItemPropsCallback) => void;
  onClickItem?: (value: Date, item: ItemPropsCallback) => void;
}