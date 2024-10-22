import Style from "./style.module.css";
import { CalendarEvent, CalendarHoliday, CalendarProps, MonthIndex } from "./props.interface";
import { RUSSIAN_HOLIDAYS } from "./holidays/ru";
import { getDaysForMonth } from "./utils/getDaysForMonth";
import { isEventInRange } from "./utils/isEventInRange";
import React, { useEffect, useRef, useState } from "react";
import { Month } from "./Month/Month";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CgCalendarToday } from "react-icons/cg";
import { Button } from "../Button";
import MonthName from "./Month/MonthName";
import { isSameMonth } from "./utils/isSameMonth";
import { isSameYear } from "./utils/isSameYear";
import { parseFormula } from "./utils/parseFormula";
import { getMonths } from "./utils/getMonths";
import { toFormulaString } from "./utils/toFormulaString";
import { getDatesForRange } from "./utils/getDatesForRange";
import { useUIKeys } from "context/UIContext";
import { getRangeDatesDiffRangeDates } from "./utils/getRangeDatesDiffRangeDates";
import { isDateInArray } from "./utils/isDateInArray";
import { getRangeDatesUnionRangeDates } from "./utils/getRangeDatesUnionRangeDates";
import { isDateIncluded } from "./utils/isDateIncluded";
import { getActiveKeys } from "utils/getActiveKeys";
import CalendarMonth from "./CalendarMonth/CalendarMonth";

interface CacheEntry {
  holidays: CalendarHoliday[];
  events: CalendarEvent[];
  isCalculated: boolean;
}

// Вне компонента создаем кэш
export const CALENDAR_CACHE = new Map<string, CacheEntry>();

function Calendar({
  size = "small",
  format = "month",
  activeDate = new Date(),
  setActiveDate = () => {},
  minDate,
  maxDate,
  startWeek = 1,
  holidaysVisible = true,
  holidays = RUSSIAN_HOLIDAYS,
  visibleWeekend = true,
  weekends = [0, 6],
  weekendsColor = "#e53935",
  onChange,
  onMouseEnterItem,
  onMouseLeaveItem,
  onClickItem,
  selected = false,
  selectedMode = "mooving",
  value = [],
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
  colums = 3,
  cacheKey = "calendar_global",
}: CalendarProps) {

  const [sortedValues, setSortedValues] = useState<Date[]>([]);

  const [modeSelected, setModeSelected] = useState<boolean>(selected);
  const [startModeSelected, setStartModeSelected] = useState<boolean>(false);

  const [startSelected, setStartSelected] = useState<Date>(null);
  const [endSelected, setEndSelected] = useState<Date>(null);
  const [selectedHoveredRange, setSelectedHoveredRange] = useState<[Date, Date]>([null, null]);

  const { shiftKey, leftMouse } = useUIKeys();

  useEffect(() => {
    // Очистка всех элементов кэша
    CALENDAR_CACHE.clear();
  }, [JSON.stringify(holidays), JSON.stringify(events)]);

  useEffect(() => {
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleBlur);
    };
  }, []);

  const handleBlur = () => {
    setStartSelected(null);
    setEndSelected(null);
    setSelectedHoveredRange([null, null]);
    setStartModeSelected(false);
  };

  useEffect(() => {
    setModeSelected(selected);
  }, [selected]);

  useEffect(() => {
    if (value.length > 0) {
      setSortedValues(value.sort((a, b) => a.getTime() - b.getTime()));
    } else {
      setSortedValues([]);
    }
  }, [JSON.stringify(value)]);

  const handleClickNext = () => {
    const nextDate = new Date(activeDate);
    
    switch (format) {
      case "month":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case "months":
        nextDate.setMonth(nextDate.getMonth() + 12);
        break;
      case "year": 
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    // Проверяем, что новая дата не выходит за пределы максимальной даты
    if (
      maxDate &&
      (nextDate.getFullYear() > maxDate.getFullYear() ||
        (nextDate.getFullYear() === maxDate.getFullYear() &&
          nextDate.getMonth() > maxDate.getMonth()))
    ) {
      return;
    }

    setActiveDate(nextDate);
  };

  const handleClickPrev = () => {
    const prevDate = new Date(activeDate);

    switch (format) {
      case "month":
        prevDate.setMonth(prevDate.getMonth() - 1);
        break;
      case "months":
        prevDate.setMonth(prevDate.getMonth() - 12);
        break;
      case "year":
        prevDate.setFullYear(prevDate.getFullYear() - 1);
        break;
    }
    

    // Проверяем, что новая дата не выходит за пределы минимальной даты
    if (
      minDate &&
      (prevDate.getFullYear() < minDate.getFullYear() ||
        (prevDate.getFullYear() === minDate.getFullYear() &&
          prevDate.getMonth() < minDate.getMonth()))
    ) {
      return;
    }

    setActiveDate(prevDate);
  };

  const handleClickToday = () => {
    setActiveDate(new Date());
  };

  const handleClickCell = (
    date: Date,
    start: boolean,
    e: React.MouseEvent
  ) => {
    if (modeSelected && (shiftKey || selectedMode === "click")) {
      if (startModeSelected) {
        setStartSelected(date);
      } else {
        // const year = date.getFullYear();
        // const month = date.getMonth();

        // TODO: Вот тут надо сделать опрелделение первого и полседнего дня в диапазоне выбранного месяца

        setEndSelected(date);
      }
      setStartModeSelected((prev) => !prev);
    }
  };

  const selectedHovered = (
    value: Date,
    event: "down" | "move",
    e: React.MouseEvent
  ) => {
    if (!selected) return;
    if (
      (shiftKey || selectedMode === "click") &&
      (leftMouse || (selectedMode === "click" && startModeSelected || event === "down"))
    ) {
      if (!selectedHoveredRange[0]) {
        setSelectedHoveredRange([value, value]);
      } else {
        setSelectedHoveredRange([selectedHoveredRange[0], value]);
      }
    } else {
      setSelectedHoveredRange([null, null]);
    }
  };
  
  useEffect(() => {
    if (
      startSelected &&
      endSelected &&
      (shiftKey || selectedMode === "click")
    ) {
      const start = new Date(
        Math.min(startSelected.getTime(), endSelected.getTime())
      );
      const end = new Date(
        Math.max(startSelected.getTime(), endSelected.getTime())
      );
      let range = getDatesForRange(new Date(start), end);

      if (!isDateIncluded(new Date(start), sortedValues)) {
        range = getRangeDatesUnionRangeDates(sortedValues, range);
      } else {
        range = getRangeDatesDiffRangeDates(sortedValues, range);
      }

      setStartSelected(null);
      setEndSelected(null);
      setSelectedHoveredRange([null, null]);
      setSortedValues(range);
    }
  }, [JSON.stringify(startSelected), JSON.stringify(endSelected)]);

  useEffect(() => {
    if (onChange) {
      onChange(sortedValues);
    }
  }, [JSON.stringify(sortedValues)]);
  
  // console.log(
  //   toFormulaString({
  //     startDate: new Date(2022, 9, 22),
  //     endDate: new Date(2023, 9, 22),
  //     repeatInterval: "MONTHS",
  //     frequency: 2,
  //     specificDateTime: {
  //       dayOfMonth: 22,
  //       hours: 10,
  //       minutes: 15,
  //       month: 10,
  //     },
  //   }),
  //   parseFormula("2022-10-21T19:00:00Z;2023-10-21T19:00:00Z;MONTHS;2;22T10:15")
  // );

  return (
    <>
      {size === "medium" && (
        <>
          {format === "month" && (
            <div
              className={[Style.container, className].join(" ")}
              style={style}
            >
              <div className={Style.header}>
                <div className={Style.title}>
                  <MonthName
                    month={activeDate.getMonth()}
                    year={activeDate.getFullYear()}
                  />
                </div>
                <div className={Style.btns}>
                  <Button
                    type="button"
                    icon={<CgCalendarToday />}
                    className={Style.today}
                    label="Сегодня"
                    size={"small"}
                    onClick={handleClickToday}
                    disabled={
                      isSameMonth(activeDate, new Date()) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  />
                  <Button
                    type="button"
                    icon={<FaAngleLeft />}
                    className={Style.prev}
                    size={"small"}
                    onClick={handleClickPrev}
                    disabled={
                      (minDate && isSameMonth(activeDate, minDate)) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  ></Button>
                  <Button
                    type="button"
                    icon={<FaAngleRight />}
                    className={Style.next}
                    size={"small"}
                    onClick={handleClickNext}
                    disabled={
                      (maxDate && isSameMonth(activeDate, maxDate)) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  ></Button>
                </div>
              </div>
              <Month
                year={activeDate.getFullYear()}
                month={activeDate.getMonth()}
                minDate={minDate}
                maxDate={maxDate}
                startWeek={startWeek}
                weekends={weekends}
                visibleWeekend={visibleWeekend}
                visibleWeekNumbers={visibleWeekNumbers}
                weekNumbersColor={weekNumbersColor}
                visibleHeader={visibleHeader}
                weekendsColor={weekendsColor}
                visiblePrevNext={visiblePrevNext}
                visibleTitle={false}
                visibleToday={visibleToday}
                todayColor={todayColor}
                holidaysVisible={holidaysVisible}
                holidays={holidays}
                events={events}
                visibleEvents={visibleEvents}
                value={sortedValues}
                customItem={customItem}
                selected={modeSelected}
                handleClickCell={handleClickCell}
                selectedMode={selectedMode}
                selectedHovered={selectedHovered}
                selectedHoveredRange={selectedHoveredRange}
                cacheKey={cacheKey}
                onMouseEnterItem={onMouseEnterItem}
                onMouseLeaveItem={onMouseLeaveItem}
                onClickItem={onClickItem}
              />
            </div>
          )}
          {format === "months" && (
            <div
              className={[Style.container, className].join(" ")}
              style={style}
            >
              <div className={Style.header}>
                <div className={Style.title} style={{ fontSize: 26 }}>
                  <MonthName
                    month={activeDate.getMonth()}
                    year={activeDate.getFullYear()}
                    formatValue="y"
                  />
                </div>
                <div className={Style.btns}>
                  <Button
                    type="button"
                    icon={<CgCalendarToday />}
                    className={Style.today}
                    label="Сегодня"
                    size={"small"}
                    onClick={handleClickToday}
                    disabled={
                      isSameYear(activeDate, new Date()) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  />
                  <Button
                    type="button"
                    icon={<FaAngleLeft />}
                    className={Style.prev}
                    size={"small"}
                    onClick={handleClickPrev}
                    disabled={
                      (minDate && isSameYear(activeDate, minDate)) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  ></Button>
                  <Button
                    type="button"
                    icon={<FaAngleRight />}
                    className={Style.next}
                    size={"small"}
                    onClick={handleClickNext}
                    disabled={
                      (maxDate && isSameYear(activeDate, maxDate)) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  ></Button>
                </div>
              </div>
              <div
                className={Style.months}
                style={{
                  gridTemplateColumns: `repeat(${colums}, 1fr)`,
                }}
              >
                {getMonths(activeDate.getFullYear()).map((month: Date, i) => (
                  <div key={i} className={Style.monthsContainer}>
                    <div className={Style.header}>
                      <div className={Style.title}>
                        <MonthName
                          month={month.getMonth()}
                          year={activeDate.getFullYear()}
                          formatValue="LLLL"
                        />
                      </div>
                    </div>
                    <Month
                      year={activeDate.getFullYear()}
                      month={month.getMonth()}
                      minDate={minDate}
                      maxDate={maxDate}
                      startWeek={startWeek}
                      weekends={weekends}
                      visibleWeekend={visibleWeekend}
                      visibleWeekNumbers={visibleWeekNumbers}
                      weekNumbersColor={weekNumbersColor}
                      visibleHeader={visibleHeader}
                      weekendsColor={weekendsColor}
                      visiblePrevNext={visiblePrevNext}
                      visibleTitle={false}
                      visibleToday={visibleToday}
                      todayColor={todayColor}
                      holidaysVisible={holidaysVisible}
                      holidays={holidays}
                      events={events}
                      visibleEvents={visibleEvents}
                      extended={true}
                      value={sortedValues}
                      customItem={customItem}
                      selected={modeSelected}
                      handleClickCell={handleClickCell}
                      selectedMode={selectedMode}
                      selectedHovered={selectedHovered}
                      selectedHoveredRange={selectedHoveredRange}
                      cacheKey={cacheKey}
                      onMouseEnterItem={onMouseEnterItem}
                      onMouseLeaveItem={onMouseLeaveItem}
                      onClickItem={onClickItem}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {format === "year" && (
            <div
              className={[Style.container, className].join(" ")}
              style={style}
            >
              <div className={Style.header}>
                <div className={Style.title} style={{ fontSize: 26 }}>
                  <MonthName year={activeDate.getFullYear()} formatValue="y" />
                </div>
                <div className={Style.btns}>
                  <Button
                    type="button"
                    icon={<CgCalendarToday />}
                    className={Style.today}
                    label="Сегодня"
                    size={"small"}
                    onClick={handleClickToday}
                    disabled={
                      isSameYear(activeDate, new Date()) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  />
                  <Button
                    type="button"
                    icon={<FaAngleLeft />}
                    className={Style.prev}
                    size={"small"}
                    onClick={handleClickPrev}
                    disabled={
                      (minDate && isSameYear(activeDate, minDate)) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  ></Button>
                  <Button
                    type="button"
                    icon={<FaAngleRight />}
                    className={Style.next}
                    size={"small"}
                    onClick={handleClickNext}
                    disabled={
                      (maxDate && isSameYear(activeDate, maxDate)) ||
                      (startModeSelected && selectedMode === "mooving")
                    }
                  ></Button>
                </div>
              </div>
              <div
                className={Style.months}
                style={{
                  gridTemplateColumns: `repeat(${colums}, minmax(0, 1fr))`,
                  gap: 2,
                }}
              >
                {getMonths(activeDate.getFullYear()).map((month: Date, i) => (
                  <div key={i} className={Style.monthsContainer}>
                    <CalendarMonth
                      year={activeDate.getFullYear()}
                      month={month.getMonth() as MonthIndex}
                      value={sortedValues}
                      selected={modeSelected}
                      selectedHoveredRange={selectedHoveredRange}
                      handleClickCell={handleClickCell}
                      selectedMode={selectedMode}
                      onClickItem={onClickItem}
                      onMouseEnterItem={onMouseEnterItem}
                      onMouseLeaveItem={onMouseLeaveItem}
                      selectedHovered={selectedHovered}
                      visibleToday={visibleToday}
                      todayColor={todayColor}
                      customItem={customItem}
                      holidaysVisible={holidaysVisible}
                      visibleEvents={visibleEvents}
                      minDate={minDate}
                      maxDate={maxDate}
                      startWeek={startWeek}
                      weekends={weekends}
                      holidays={holidays}
                      events={events}
                      colums={colums}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}




export { Calendar };