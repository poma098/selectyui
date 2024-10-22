import React, { useState, useEffect } from "react";
import Style from "./style.module.css";
import { CalendarMonthProps } from "./props.interface";
import { getDaysForMonth } from "../utils/getDaysForMonth";
import { Day, DaysForMonth } from "../props.interface";
import { getWeekDays } from "../utils/getWeekDays";
import { getWeekNumber } from "../utils/getWeekNumber";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import CalendarDay from "../Day/CalendarDay";
import { isDateInRange } from "../utils/isDateInRange";
import { isDateInArray } from "../utils/isDateInArray";


function Month({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  minDate,
  maxDate,
  startWeek = 0,
  weekends = [0, 6],
  visibleWeekend = true,
  weekendsColor = "#7d7d7d",
  visibleWeekNumbers = true,
  weekNumbersColor = "#7d7d7d",
  visibleHeader = true,
  visiblePrevNext = true,
  visibleTitle = true,
  visibleToday = true,
  todayColor = "#ef5350",
  holidaysVisible = true,
  holidays = [],
  events = [],
  visibleEvents = true,
  extended = false,
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
}: CalendarMonthProps) {
  const [days, setDays] = useState<DaysForMonth[]>([]);
  const [weekDays, setWeekDays] = useState<Day[]>([]);

  const [sortedValues, setSortedValues] = useState<Date[]>([]);

  useEffect(() => {
    if (value.length > 0) {
      setSortedValues([...value].sort((a, b) => a.getTime() - b.getTime()));
    } else {
      setSortedValues([]);
    }
  }, [JSON.stringify(value)]);

  useEffect(() => {
    setDays(getDaysForMonth(year, month, startWeek, weekends, extended));
  }, [year, month, startWeek, weekends]);

  useEffect(() => {
    setWeekDays(getWeekDays(startWeek, weekends, "ru-RU"));
  }, [startWeek, weekends]);

  return (
    <>
      {visibleTitle && (
        <div className={Style.title}>
          {format(new Date(year, month), "LLLL yyyy", { locale: ru })}
        </div>
      )}
      <div
        className={Style.container}
        data-visible-week-numbers={visibleWeekNumbers}
      >
        {visibleHeader && (
          <div className={Style.header}>
            {visibleWeekNumbers && <div className={Style.day}></div>}
            {weekDays?.map((d, i) => (
              <div
                key={i}
                className={Style.dayName}
                style={
                  d.isWeekend && visibleWeekend ? { color: weekendsColor } : {}
                }
              >
                {d.shortName}
              </div>
            ))}
          </div>
        )}
        <div className={Style.body}>
          {days.map((d, i) => {
            const isDisabled = !isDateInRange(d.date, minDate, maxDate);
            if (i % 7 === 0 && visibleWeekNumbers) {
              return (
                <React.Fragment key={i}>
                  <div
                    className={Style.weekNumber}
                    style={{ color: weekNumbersColor }}
                  >
                    {getWeekNumber(d.date, startWeek)}
                  </div>
                  <div className={Style.day}>
                    {d.isRange ? (
                      <CalendarDay
                        {...d}
                        visibleToday={visibleToday}
                        todayColor={todayColor}
                        disabled={isDisabled}
                        holidays={holidays}
                        holidaysVisible={holidaysVisible}
                        events={events}
                        visibleEvents={visibleEvents}
                        value={sortedValues}
                        customItem={customItem}
                        selected={selected}
                        handleClickCell={handleClickCell}
                        selectedMode={selectedMode}
                        selectedHovered={selectedHovered}
                        selectedHoveredRange={selectedHoveredRange}
                        cacheKey={cacheKey}
                        onMouseEnterItem={onMouseEnterItem}
                        onMouseLeaveItem={onMouseLeaveItem}
                        onClickItem={onClickItem}
                      />
                    ) : visiblePrevNext ? (
                      <CalendarDay
                        {...d}
                        visibleToday={visibleToday}
                        todayColor={todayColor}
                        disabled={isDisabled}
                        holidays={holidays}
                        holidaysVisible={holidaysVisible}
                        events={events}
                        visibleEvents={visibleEvents}
                        value={sortedValues}
                        customItem={customItem}
                        selected={selected}
                        handleClickCell={handleClickCell}
                        selectedMode={selectedMode}
                        selectedHovered={selectedHovered}
                        selectedHoveredRange={selectedHoveredRange}
                        cacheKey={cacheKey}
                        onMouseEnterItem={onMouseEnterItem}
                        onMouseLeaveItem={onMouseLeaveItem}
                        onClickItem={onClickItem}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </React.Fragment>
              );
            }
            return (
              <div
                key={i}
                className={Style.day}
                style={
                  d.isWeekend && visibleWeekend ? { color: weekendsColor } : {}
                }
              >
                {d.isRange ? (
                  <CalendarDay
                    {...d}
                    visibleToday={visibleToday}
                    todayColor={todayColor}
                    disabled={isDisabled}
                    holidays={holidays}
                    holidaysVisible={holidaysVisible}
                    events={events}
                    visibleEvents={visibleEvents}
                    value={sortedValues}
                    customItem={customItem}
                    selected={selected}
                    handleClickCell={handleClickCell}
                    selectedMode={selectedMode}
                    selectedHovered={selectedHovered}
                    selectedHoveredRange={selectedHoveredRange}
                    cacheKey={cacheKey}
                    onMouseEnterItem={onMouseEnterItem}
                    onMouseLeaveItem={onMouseLeaveItem}
                    onClickItem={onClickItem}
                  />
                ) : visiblePrevNext ? (
                  <CalendarDay
                    {...d}
                    visibleToday={visibleToday}
                    todayColor={todayColor}
                    disabled={isDisabled}
                    holidays={holidays}
                    holidaysVisible={holidaysVisible}
                    events={events}
                    visibleEvents={visibleEvents}
                    value={sortedValues}
                    customItem={customItem}
                    selected={selected}
                    handleClickCell={handleClickCell}
                    selectedMode={selectedMode}
                    selectedHovered={selectedHovered}
                    selectedHoveredRange={selectedHoveredRange}
                    cacheKey={cacheKey}
                    onMouseEnterItem={onMouseEnterItem}
                    onMouseLeaveItem={onMouseLeaveItem}
                    onClickItem={onClickItem}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export { Month };
