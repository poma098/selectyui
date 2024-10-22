import React, { useCallback, useEffect, useMemo, useState } from "react"
import Style from "./style.module.css"
import { CalendarMonthProps } from "./props.inteface"
import { getMonthsName } from "../utils/getMonthsName"
import { checkDateStatus } from "../utils/checkDateStatus"
import { getDaysForMonth } from "../utils/getDaysForMonth"
import { isDateInRange } from "../utils/isDateInRange"
import { getActiveKeys } from "utils/getActiveKeys"
import { CalendarEvent, CalendarHoliday, DaysForMonth } from "../props.interface"
import { isSameMonth } from "../utils/isSameMonth";
import { CALENDAR_CACHE } from "../Calendar"
import { TooltipIcon } from "components/TooltipIcon"
import { isEventInRange } from "../utils/isEventInRange"
import { format } from "date-fns"

function CalendarMonth({
  month,
  year,
  minDate,
  maxDate,
  disabled = false,
  value = [],
  holidays = [],
  events = [],
  selected = false,
  selectedHoveredRange = [null, null],
  handleClickCell,
  selectedMode = "mooving",
  onClickItem,
  onMouseEnterItem,
  onMouseLeaveItem,
  selectedHovered,
  visibleToday = true,
  todayColor = "#ef5350",
  customItem,
  holidaysVisible = true,
  visibleEvents = true,
  startWeek = 0,
  weekends = [0, 6],
  cacheKey = "calendar_global",
  colums = 3,
}: CalendarMonthProps) {
  const [name, setName] = useState<string>("");
  const [holidayEvents, setHolidayEvents] = useState<CalendarHoliday[]>([]);
  const [eventsData, setEventsData] = useState<CalendarEvent[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isDayToday, setIsDayToday] = useState<boolean>(false);

  const minDateRange = useMemo(() => {
    // Получаем количество дней в текущем месяце
    const days = new Date(year, month + 1, 0).getDate();
    if (minDate) {
      if (minDate.getTime() > new Date(year, month, days).getTime()) {
        return minDate;
      } else {
        return new Date(year, month, 1);
      }
    } else {
      return new Date(year, month, 1);
    }
  }, [month, year, minDate]);

  const maxDateRange = useMemo(() => {
    // Получаем количество дней в текущем месяце
    const days = new Date(year, month + 1, 0).getDate();

    if (maxDate) {
      if (maxDate.getTime() < new Date(year, month, days).getTime()) {
        return maxDate;
      } else {
        return new Date(year, month, days);
      }
    } else {
      return new Date(year, month, days);
    }
  }, [month, year, maxDate]);

  const isDisabled = useMemo(() => {
    return !isDateInRange(new Date(year, month), minDateRange, maxDateRange);
  }, [year, month, minDateRange, maxDateRange]);

  const range = useMemo(() => {
    return getDaysForMonth(year, month, startWeek, weekends);
  }, [year, month, startWeek, weekends, minDateRange, maxDateRange]);

  useEffect(() => {
    setIsDayToday(isSameMonth(new Date(), new Date(year, month)));
  }, [year, month]);

  // Проверка стал ли этот день текущим
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDayToday(isSameMonth(new Date(), new Date(year, month)));
    }, 1000 * 30);

    return () => clearInterval(intervalId);
  }, [year, month]);

  // Создаем ключ для хранения и поиска в кэше
  const dateKeys: string[] = useMemo(() => {
    const keys: string[] = []
    range.filter((day) => day.isRange === true).forEach((day) => {
      keys.push(cacheKey + "_" + day.date.toISOString());
    })
    return keys
  }, [range]);

  // Проверка наличия данных в кэше каждые 100 мс
  useEffect(() => {
    const checkCache = () => {
      const holidaysArr: CalendarHoliday[] = [];
      const eventsArr: CalendarEvent[] = [];
      let find = true;
      dateKeys.forEach((dateKey) => {
        if (CALENDAR_CACHE.has(dateKey)) {
          const cachedEntry = CALENDAR_CACHE.get(dateKey)!;
          if (cachedEntry.isCalculated) {
            holidaysArr.push(...cachedEntry.holidays);
            eventsArr.push(...cachedEntry.events);
          }
        } else {
          find = false;
        }
      });

      if (find) {
        setHolidayEvents(holidaysArr);
        setEventsData(eventsArr);
        setDataLoaded(true);
        return true; // Данные готовы
      }

      return false; // Данные еще не загружены
    };
    // Проверяем сразу
    if (!checkCache()) {
      setDataLoaded(false); // Если данные не готовы, сразу ставим false
    }
    const timeoutId = setTimeout(() => {
      if (!checkCache()) {
        setDataLoaded(false); // Если через 100 мс данные все еще не готовы, ставим false
      }
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [dateKeys, holidaysVisible, visibleEvents]);

  // Функция для загрузки данных
  const loadHolidaysAndEvents = useCallback(
    async (abortSignal: AbortSignal) => {
      const newHolidayEvents: CalendarHoliday[] = [];
      const newEventsData: CalendarEvent[] = [];

      const loadHolidayEventsForDay = async (day: Date) => {
        if (abortSignal.aborted) return [];
        const filteredHolidays = await Promise.all(
          holidays.map(async (holiday) => {
            if (abortSignal.aborted) return null;
            const isInRange = await isEventInRange(
              holiday.formula || holiday.date,
              [
                new Date(day.setHours(0, 0, 0, 0)),
                new Date(day.setHours(23, 59, 59, 0)),
              ],
              holiday.durationDays
            );
            const holidayCopy = { ...holiday, date: day };
            return isInRange ? holidayCopy : null;
          })
        );
        return filteredHolidays.filter(Boolean) as CalendarHoliday[];
      };

      const loadEventsForDay = async (day: Date) => {
        if (abortSignal.aborted) return [];
        const filteredEvents = await Promise.all(
          events.map(async (event) => {
            if (abortSignal.aborted) return null;
            const isInRange = await isEventInRange(
              event.formula || event.date,
              [
                new Date(day.setHours(0, 0, 0, 0)),
                new Date(day.setHours(23, 59, 59, 0)),
              ],
              event.durationDays
            );
            const eventCopy = { ...event, date: day };
            return isInRange ? eventCopy : null;
          })
        );
        return filteredEvents.filter(Boolean) as CalendarEvent[];
      };

      try {
        const promises = dateKeys.map(async (dateKey) => {
          if (CALENDAR_CACHE.has(dateKey)) {
            const cachedEntry = CALENDAR_CACHE.get(dateKey)!;
            if (cachedEntry.isCalculated) {
              newHolidayEvents.push(...cachedEntry.holidays);
              newEventsData.push(...cachedEntry.events);
              return;
            }
          }

          const day = new Date(dateKey.split("_").pop()!);

          const [holidaysResult, eventsResult] = await Promise.all([
            loadHolidayEventsForDay(day),
            loadEventsForDay(day),
          ]);

          if (!abortSignal.aborted) {
            CALENDAR_CACHE.set(dateKey, {
              holidays: holidaysResult,
              events: eventsResult,
              isCalculated: true,
            });
            newHolidayEvents.push(...holidaysResult);
            newEventsData.push(...eventsResult);
          }
        });

        // Ждем завершения всех асинхронных операций
        await Promise.all(promises)
      } catch (error) {
        if (!abortSignal.aborted) {
          console.error("Error loading data:", error);
        }
      }

      if (!abortSignal.aborted) {
        setHolidayEvents(newHolidayEvents);
        setEventsData(newEventsData);
        setDataLoaded(true);
      }
    },
    [dateKeys, holidays, events, holidaysVisible, visibleEvents]
  );



  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => loadHolidaysAndEvents(signal));
    } else {
      setTimeout(() => loadHolidaysAndEvents(signal), 0);
    }

    return () => {
      controller.abort();
    };
  }, [loadHolidaysAndEvents]);



  const DateStatus = useMemo(() => {
    return checkDateStatus(new Date(year, month, 1), value, "month", colums);
  }, [month, year, value]);

  // Проверка наличия даты в диапазоне выделения (выделенных дат)
  const hasDateInRange = useMemo(() => {
    if (!selected) {
      return false;
    }

    if (selectedHoveredRange[0] === null || selectedHoveredRange[1] === null) {
      return false;
    }

    const start = new Date(
      Math.min(
        selectedHoveredRange[0].getTime(),
        selectedHoveredRange[1].getTime()
      )
    );

    const end = new Date(
      Math.max(
        selectedHoveredRange[0].getTime(),
        selectedHoveredRange[1].getTime()
      )
    );

    return isDateInRange(new Date(year, month), start, end);
  }, [JSON.stringify(selectedHoveredRange), selected]);

  // Обработчик клика
  const handleClickDay = (event: React.MouseEvent) => {
    if (selected && handleClickCell && selectedMode === "click") {
      handleClickCell(new Date(year, month), undefined, event);
    }

    if (onClickItem) {
      onClickItem(minDateRange, {
        isToday: isDayToday,
        isWeekend: false,
        isDisabled: disabled,
        events: eventsData,
        holidays: holidayEvents,
        weekNumber: Array.from(
          new Set(
            range
              .filter(
                (day) =>
                  day.date.getTime() <= maxDateRange.getTime() &&
                  day.date.getTime() >= minDateRange.getTime()
              )
              .map((day) => day.weekNumber)
          )
        ),
        loading: !dataLoaded,
        selected: DateStatus ? DateStatus.isCurrentDateFound : false,
        selectedHovered: hasDateInRange,
        holidaysVisible: holidaysVisible,
        visibleEvents: visibleEvents,
      });
    }
  };

  // Обработчик когда мышь отпустили
  const handleMouseUp = (event: React.MouseEvent) => {
    if (handleClickCell && selectedMode === "mooving")
      handleClickCell(new Date(year, month), undefined, event);
  };

  // Обработчик когда мышь нажали
  const handleMouseDown = (event: React.MouseEvent) => {
    if (selectedHovered) {
      selectedHovered(new Date(year, month), "down", event);
    }

    if (handleClickCell && selectedMode === "mooving") {
      handleClickCell(new Date(year, month), true, event);
    }
  };

  // Обработчик когда мышь навели
  const handleMouseEnter = (event: React.MouseEvent) => {
    if (
      selectedHovered &&
      ((selectedMode === "mooving" &&
        getActiveKeys().shift &&
        getActiveKeys().left) ||
        (selectedMode === "click" && selectedHoveredRange[0] !== null))
    ) {
      selectedHovered(new Date(year, month), "move", event);
    }

    if (onMouseEnterItem) {
      onMouseEnterItem(minDateRange, {
        isToday: isDayToday,
        isWeekend: false,
        isDisabled: disabled,
        events: eventsData,
        holidays: holidayEvents,
        weekNumber: Array.from(
          new Set(
            range
              .filter(
                (day) =>
                  day.date.getTime() <= maxDateRange.getTime() &&
                  day.date.getTime() >= minDateRange.getTime()
              )
              .map((day) => day.weekNumber)
          )
        ),
        loading: !dataLoaded,
        selected: DateStatus ? DateStatus.isCurrentDateFound : false,
        selectedHovered: hasDateInRange,
        holidaysVisible: holidaysVisible,
        visibleEvents: visibleEvents,
      });
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (onMouseLeaveItem) {
      onMouseLeaveItem(minDateRange, {
        isToday: isDayToday,
        isWeekend: false,
        isDisabled: disabled,
        events: eventsData,
        holidays: holidayEvents,
        weekNumber: Array.from(
          new Set(
            range
              .filter(
                (day) =>
                  day.date.getTime() <= maxDateRange.getTime() &&
                  day.date.getTime() >= minDateRange.getTime()
              )
              .map((day) => day.weekNumber)
          )
        ),
        loading: !dataLoaded,
        selected: DateStatus ? DateStatus.isCurrentDateFound : false,
        selectedHovered: hasDateInRange,
        holidaysVisible: holidaysVisible,
        visibleEvents: visibleEvents,
      });
    }
  };

  useEffect(() => {
    setName(getMonthsName(0, "ru-RU")[month].fullName);
  }, [month]);

  return (
    <div
      className={Style.container}
      data-is-range={true}
      style={{
        backgroundColor:
          visibleToday && isDayToday ? `${todayColor}33` : undefined,
      }}
      data-is-disabled={disabled === true ? true : isDisabled}
      data-effect-click={onClickItem ? true : false}
      data-is-selected={hasDateInRange}
      onMouseDown={selected ? handleMouseDown : null}
      onMouseUp={selected ? handleMouseUp : null}
      onClick={handleClickDay}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={selected ? handleMouseEnter : null}
    >
      {/* Если дата находится в диапазоне выделения */}
      {DateStatus?.isCurrentDateFound && (
        <div
          className={Style.selected}
          data-has-left-neighbor={DateStatus.hasLeftNeighbor}
          data-has-right-neighbor={DateStatus.hasRightNeighbor}
          data-has-top-neighbor={DateStatus.hasTopNeighbor}
          data-has-bottom-neighbor={DateStatus.hasBottomNeighbor}
        >
          {DateStatus.hasLeftNeighbor &&
            DateStatus.hasBottomNeighbor &&
            !DateStatus.hasLeftBottomNeighbor && (
              <div className={Style.selectedLeftBottom}></div>
            )}
          {DateStatus.hasRightNeighbor &&
            DateStatus.hasBottomNeighbor &&
            !DateStatus.hasRightBottomNeighbor && (
              <div className={Style.selectedRightBottom}></div>
            )}
          {DateStatus.hasLeftNeighbor &&
            DateStatus.hasTopNeighbor &&
            !DateStatus.hasLeftTopNeighbor && (
              <div className={Style.selectedLeftTop}></div>
            )}
          {DateStatus.hasRightNeighbor &&
            DateStatus.hasTopNeighbor &&
            !DateStatus.hasRightTopNeighbor && (
              <div className={Style.selectedRightTop}></div>
            )}
        </div>
      )}
      {!customItem && <div className={Style.date}>{name}</div>}
      {/* Календарные события (элемент загрузки) */}
      {!customItem && (holidaysVisible || visibleEvents) && !dataLoaded && (
        <div className={Style.holidays}>
          <div className={Style.holidaysLoader}> </div>
        </div>
      )}

      {/* Календарные события */}
      {!customItem && (holidaysVisible || visibleEvents) && dataLoaded && (
        <div
          className={Style.holidays}
          style={{ pointerEvents: hasDateInRange ? "none" : undefined }}
        >
          {/* Вывод праздников */}
          {holidaysVisible &&
            holidayEvents.map((holiday, i) => (
              <TooltipIcon
                style={{
                  textAlign: "left",
                }}
                icon={
                  <div
                    className={Style.holiday}
                    style={{ backgroundColor: holiday.color }}
                  ></div>
                }
                key={i}
                initOpacity={1}
                tooltipProps={{
                  title: (
                    <>
                      <div>{holiday.name}</div>
                      <div
                        style={{
                          fontSize: "12px",
                          opacity: 0.65,
                          fontWeight: 400,
                        }}
                      >
                        {holiday.date && format(holiday.date, "dd.MM.yyyy")}
                      </div>
                    </>
                  ),
                  body: holiday.description,
                  icon: holiday.icon,
                }}
              />
            ))}

          {/* Вывод событий */}
          {visibleEvents &&
            eventsData.map((event, i) => (
              <TooltipIcon
                style={{
                  textAlign: "left",
                }}
                icon={
                  <div
                    className={Style.holiday}
                    style={{ backgroundColor: event.color }}
                  ></div>
                }
                key={i}
                initOpacity={1}
                tooltipProps={{
                  title: (
                    <>
                      <div>{event.name}</div>
                      <div
                        style={{
                          fontSize: "12px",
                          opacity: 0.65,
                          fontWeight: 400,
                        }}
                      >
                        {event.date && format(event.date, "dd.MM.yyyy")}
                      </div>
                    </>
                  ),
                  body: event.description,
                  icon: event.icon,
                }}
              />
            ))}
        </div>
      )}
      {!!customItem &&
        customItem(minDateRange, {
          isToday: isDayToday,
          isWeekend: false,
          isDisabled: disabled,
          events: eventsData,
          holidays: holidayEvents,
          weekNumber: Array.from(new Set(range.map((day) => day.weekNumber))),
          loading: !dataLoaded,
          selected: DateStatus ? DateStatus.isCurrentDateFound : false,
          selectedHovered: hasDateInRange,
          holidaysVisible: holidaysVisible,
          visibleEvents: visibleEvents,
        })}
    </div>
  );
}

export default React.memo(CalendarMonth);