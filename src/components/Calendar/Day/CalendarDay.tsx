import React, { useState, useEffect, useCallback, useMemo } from "react";
import { CalendarDayProps } from "./props.interface";
import Style from "./style.module.css";
import { CalendarEvent, CalendarHoliday } from "../props.interface";
import { isEventInRange, isSameDay } from "../utils";
import { TooltipIcon } from "../../TooltipIcon";
import { checkDateStatus } from "../utils/checkDateStatus";
import { isDateInRange } from "../utils/isDateInRange";
import { getActiveKeys } from "utils/getActiveKeys";
import { CALENDAR_CACHE } from "../Calendar";

function CalendarDay({
  date,
  thisMonth,
  thisYear,
  isToday,
  isWeekend,
  weekNumber,
  isRange,
  visibleToday = true,
  todayColor = "#ef5350",
  disabled = false,
  holidaysVisible = true,
  holidays = [],
  events = [],
  visibleEvents = true,
  value = [],
  customItem,
  selected = false,
  handleClickCell,
  selectedMode = "mooving",
  selectedHovered,
  selectedHoveredRange = [null, null],
  cacheKey = "calendar_global",
  onMouseEnterItem,
  onMouseLeaveItem,
  onClickItem,
}: CalendarDayProps) {
  const [holidayEvents, setHolidayEvents] = useState<CalendarHoliday[]>([]);
  const [eventsData, setEventsData] = useState<CalendarEvent[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [isDayToday, setIsDayToday] = useState<boolean>(isToday);

  useEffect(() => {
    setIsDayToday(isToday);
  }, [isToday]);

  // Проверка стал ли этот день текущим
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDayToday(isSameDay(new Date(), date));
    }, 1000 * 30);

    return () => clearInterval(intervalId);
  }, [date]);

  // Создаем ключ для хранения и поиска в кэше
  const dateKey = useMemo(() => {
    return cacheKey + "_" + date.toISOString();
  }, [date]);

  // Проверка наличия данных в кэше каждые 100 мс
  useEffect(() => {
    const checkCache = () => {
      if (CALENDAR_CACHE.has(dateKey)) {
        const cachedEntry = CALENDAR_CACHE.get(dateKey)!;
        if (cachedEntry.isCalculated) {
          setHolidayEvents(cachedEntry.holidays);
          setEventsData(cachedEntry.events);
          setDataLoaded(true);
          return true; // Данные загружены
        }
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
  }, [dateKey, holidaysVisible, visibleEvents]);

  // Функция для загрузки данных
  const loadHolidaysAndEvents = useCallback(
    async (abortSignal: AbortSignal) => {
      if (CALENDAR_CACHE.has(dateKey)) {
        const cachedEntry = CALENDAR_CACHE.get(dateKey)!;
        if (cachedEntry.isCalculated) {
          if (!abortSignal.aborted) {
            setHolidayEvents(cachedEntry.holidays);
            setEventsData(cachedEntry.events);
            setDataLoaded(true);
          }
          return;
        }
      }

      // Загружаем праздники и возвращаем промис
      const loadHolidayEvents = async () => {
        if (abortSignal.aborted) return [];
        const filteredHolidays = await Promise.all(
          holidays.map(async (holiday) => {
            if (abortSignal.aborted) return null;
            const isInRange = await isEventInRange(
              holiday.formula || holiday.date,
              [
                new Date(date.setHours(0, 0, 0, 0)),
                new Date(date.setHours(23, 59, 59, 0)),
              ],
              holiday.durationDays
            );
            return isInRange ? holiday : null;
          })
        );
        return filteredHolidays.filter(Boolean) as CalendarHoliday[];
      };

      // Загружаем события и возвращаем промис
      const loadEvents = async () => {
        if (abortSignal.aborted) return [];
        const filteredEvents = await Promise.all(
          events.map(async (event) => {
            if (abortSignal.aborted) return null;
            const isInRange = await isEventInRange(
              event.formula || event.date,
              [
                new Date(date.setHours(0, 0, 0, 0)),
                new Date(date.setHours(23, 59, 59, 0)),
              ],
              event.durationDays
            );
            return isInRange ? event : null;
          })
        );
        return filteredEvents.filter(Boolean) as CalendarEvent[];
      };

      try {

        // Загружаем данные по событиям и праздникам
        const [holidaysResult, eventsResult] = await Promise.all([
          loadHolidayEvents(),
          loadEvents(),
        ]);

        // Сохраняем данные в кэш если они не отменены
        if (!abortSignal.aborted) {
          CALENDAR_CACHE.set(dateKey, {
            holidays: holidaysResult,
            events: eventsResult,
            isCalculated: true,
          });

          setHolidayEvents(holidaysResult);
          setEventsData(eventsResult);
          setDataLoaded(true);
        }
      } catch (error) {
        if (!abortSignal.aborted) {
          console.error("Error loading data:", error);
        }
      }
    },
    [date, holidays, events, holidaysVisible, visibleEvents]
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

  // Проверка наличия даты в диапазоне выделения (уже выбранных данных)
  const DateStatus = useMemo(
    () => checkDateStatus(date, value, "day"),
    [date, value]
  );

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

    return isDateInRange(date, start, end);
  }, [JSON.stringify(selectedHoveredRange), selected]);

  // Обработчик клика
  const handleClickDay = (event: React.MouseEvent) => {
    if (selected && handleClickCell && selectedMode === "click") {
      handleClickCell(date, undefined, event);
    }
    onClickItem &&
      onClickItem(date, {
        isToday,
        isWeekend,
        isDisabled: disabled,
        events: eventsData,
        holidays: holidayEvents,
        weekNumber,
        loading: !dataLoaded,
        selected: DateStatus.isCurrentDateFound,
        selectedHovered: hasDateInRange,
        holidaysVisible: holidaysVisible,
        visibleEvents: visibleEvents,
      });
  };

  // Обработчик когда мышь отпустили
  const handleMouseUp = (event: React.MouseEvent) => {
    if (handleClickCell && selectedMode === "mooving")
      handleClickCell(date, undefined, event);
  };

  // Обработчик когда мышь нажали
  const handleMouseDown = (event: React.MouseEvent) => {
    if (selectedHovered) {
      selectedHovered(date, "down", event);
    }

    if (handleClickCell && selectedMode === "mooving") {
      handleClickCell(date, true, event);
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
      selectedHovered(date, "move", event);
    }
      

    if (onMouseEnterItem) {
      onMouseEnterItem(date, {
        isToday,
        isWeekend,
        isDisabled: disabled,
        events: eventsData,
        holidays: holidayEvents,
        weekNumber,
        loading: !dataLoaded,
        selected: DateStatus.isCurrentDateFound,
        selectedHovered: hasDateInRange,
        holidaysVisible: holidaysVisible,
        visibleEvents: visibleEvents,
      });
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (onMouseLeaveItem) {
      onMouseLeaveItem(date, {
        isToday,
        isWeekend,
        isDisabled: disabled,
        events: eventsData,
        holidays: holidayEvents,
        weekNumber,
        loading: !dataLoaded,
        selected: DateStatus.isCurrentDateFound,
        selectedHovered: hasDateInRange,
        holidaysVisible: holidaysVisible,
        visibleEvents: visibleEvents,
      });
    }
  }

  return (
    <div
      className={Style.container}
      data-is-today={visibleToday ? isDayToday : false}
      data-is-range={isRange}
      data-is-disabled={disabled}
      style={{
        backgroundColor:
          visibleToday && isDayToday ? `${todayColor}33` : undefined,
      }}
      data-effect-click={onClickItem ? true : false}
      data-is-selected={hasDateInRange}
      onMouseDown={selected ? handleMouseDown : null}
      onMouseUp={selected ? handleMouseUp : null}
      onClick={handleClickDay}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={selected ? handleMouseEnter : null}
    >
      {/* Если дата находится в диапазоне выделения */}
      {DateStatus.isCurrentDateFound && (
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

      {/* Если включены кастомные ячейки календаря */}
      {customItem &&
        customItem(date, {
          isToday,
          isWeekend,
          isDisabled: disabled,
          events: eventsData,
          holidays: holidayEvents,
          weekNumber,
          loading: !dataLoaded,
          selected: DateStatus.isCurrentDateFound,
          selectedHovered: hasDateInRange,
          holidaysVisible: holidaysVisible,
          visibleEvents: visibleEvents,
        })}

      {/* Текущая дата */}
      {!customItem && <div className={Style.date}>{date.getDate()}</div>}

      {/* Календарные события (элемент загрузки) */}
      {!customItem && (holidaysVisible || visibleEvents) && !dataLoaded && (
        <div className={Style.holidays}>
          <div className={Style.holidaysLoader}></div>
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
                icon={
                  <div
                    className={Style.holiday}
                    style={{ backgroundColor: holiday.color }}
                  ></div>
                }
                key={i}
                initOpacity={1}
                tooltipProps={{
                  title: holiday.name,
                  body: holiday.description,
                  icon: holiday.icon,
                }}
              />
            ))}

          {/* Вывод событий */}
          {visibleEvents &&
            eventsData.map((event, i) => (
              <TooltipIcon
                icon={
                  <div
                    className={Style.holiday}
                    style={{ backgroundColor: event.color }}
                  ></div>
                }
                key={i}
                initOpacity={1}
                tooltipProps={{
                  title: event.name,
                  body: event.description,
                  icon: event.icon,
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default CalendarDay;
