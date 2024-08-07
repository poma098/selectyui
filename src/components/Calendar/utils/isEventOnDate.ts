import { CalendarEvent, CalendarWeekend, EventDateFormat } from "../props.interface";
import { getWeekNumber } from "./getWeekNumber";

export function getEventsOnDate(
  events: CalendarEvent[],
  year?: number,
  month?: number,
  day?: number,
  startWeek: CalendarWeekend = 1
): CalendarEvent[] {
  if (!year || !month || !day) return [];

  const currentDate = new Date(year, month - 1, day);
  const currentWeekNumber = getWeekNumber(currentDate, startWeek);
  const currentQuarter = Math.ceil(month / 3);

  const isDateMatching = (eventDate: EventDateFormat): boolean => {
    if (eventDate instanceof Date) {
      return eventDate.toDateString() === currentDate.toDateString();
    }

    if (typeof eventDate === "number") {
      return eventDate === year;
    }

    if (typeof eventDate === "string") {
      const [prefix, ...rest] = eventDate.split("-");
      const restNumber = rest.map(Number);

      switch (prefix) {
        case "YYYY": {
          const [eventMonth, eventDay] = restNumber;
          return eventMonth === month && eventDay === day;
        }
        case "W": {
          const weekDay = restNumber[0];
          return currentDate.getDay() === weekDay; // 0 - Воскресенье, 1 - Понедельник и т.д.
        }
        case "YYYY-MM": {
          const eventDay = restNumber[0];
          return eventDay === day;
        }
        case "Q": {
          const eventDay = restNumber[0];
          return currentQuarter === Number(prefix.slice(1)) && eventDay === day;
        }
        case "Q-W": {
          const [weekNum] = restNumber;
          return (
            currentQuarter === Number(prefix.slice(1)) &&
            currentWeekNumber === weekNum
          );
        }
        case "Q2": {
          const eventDay = restNumber[0];
          return currentQuarter === 2 && eventDay === day;
        }
        case "Q2-W": {
          const weekNum = restNumber[0];
          return currentQuarter === 2 && currentWeekNumber === weekNum;
        }
        default:
          return false;
      }
    }

    return false;
  };

  return events.filter((event) => isDateMatching(event.date));
}