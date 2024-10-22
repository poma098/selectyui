import { CalendarHoliday } from "../props.interface";

export const US_HOLIDAYS: CalendarHoliday[] = [
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 1,
        month: 1,
        hours: 0,
        minutes: 0,
      },
    },
    name: "New Year's Day",
    description:
      "The first day of the year, celebrated with various festivities.",
    icon: "🎉",
    color: "#ff0000", // Red
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 4,
        month: 7,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Independence Day",
    description: "Celebrates the adoption of the Declaration of Independence.",
    icon: "🎆",
    color: "#0000ff", // Blue
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 25,
        month: 12,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Christmas Day",
    description: "Celebration of the birth of Jesus Christ.",
    icon: "🎄",
    color: "#00ff00", // Green
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 31,
        month: 10,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Halloween",
    description: "A celebration with costumes and trick-or-treating.",
    icon: "🎃",
    color: "#ff6600", // Orange
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 11,
        month: 11,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Veterans Day",
    description:
      "Honors military veterans who have served in the U.S. Armed Forces.",
    icon: "🎖️",
    color: "#0033cc", // Dark Blue
    durationDays: 1,
  },
];
