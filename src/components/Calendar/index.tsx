import Style from "./style.module.css";
import { CalendarProps } from "./props.interface";
import { RUSSIAN_HOLIDAYS } from "./holidays/russian";
import { getDaysForMonth } from "./utils/getDaysForMonth";
import { getEventsOnDate } from "./utils/isEventOnDate";
import { isDateMatchingByFormula } from "./utils/isDateMatchingByFormula";

function Calendar({
  size = "small",
  format = "month",
  minDate,
  maxDate,
  startWeek = 0,
  holidaysVisible = true,
  holidays = RUSSIAN_HOLIDAYS,
  visibleWeekend = true,
  weekends = [0, 6],
  onChange,
  onMouseEnterItem,
  onMouseLeaveItem,
  onClickItem,
  value,
  events = [],
  visibleEvents = true,
  disabled = false,
  visibleToday = true,
  todayColor = "#ef5350",
  formatText,
  visibleWeekNumbers = true,
  weekNumbersColor = "#7d7d7d",
  visibleHeader = true,
  visiblePrevNext = true,
  customItem,
  className,
  style,
}: CalendarProps) {
  // console.log(
  //   // getEventsOnDate(
  //   //   [
  //   //     {
  //   //       date: "YYYY-MM-5",
  //   //       name: "Событие каждый месяц 5 числа",
  //   //     },
  //   //     {
  //   //       date: "YYYY-7-5",
  //   //       name: "Событие 1 раз в год в августе 5 числа",
  //   //     },
  //   //     {
  //   //       date: "W-1",
  //   //       name: "Событие 1 раз в неделю в понедельник",
  //   //     },
  //   //     {
  //   //       date: "Q-10",
  //   //       name: "Событие каждый квартал 10 числа",
  //   //     },
  //   //     {
  //   //       date: "Q-W-5",
  //   //       name: "Событие каждый квартал 5 недели в квартале",
  //   //     },
  //   //     {
  //   //       date: "Q2-10",
  //   //       name: "Событие каждый 2 квартал 10 числа",
  //   //     },
  //   //     {
  //   //       date: "Q2-W-5",
  //   //       name: "Событие каждый 2 квартал 5 недели в квартале",
  //   //     },
  //   //   ],
  //   //   2024,
  //   //   8,
  //   //   9
  //   // )
  //   isDateMatchingByFormula("W-2", 2024, 7, 31, 0, 0, 0)
  // );
  return <></>;
}

export default Calendar;