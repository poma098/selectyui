import { CalendarHoliday } from "../props.interface";

export const UK_HOLIDAYS: CalendarHoliday[] = [
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
    description: "Celebrates the first day of the new year.",
    icon: "🎉",
    color: "#ff0000", // Red
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
    description: "Celebrates the birth of Jesus Christ.",
    icon: "🎄",
    color: "#00ff00", // Green
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 26,
        month: 12,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Boxing Day",
    description: "A holiday for giving gifts and spending time with family.",
    icon: "📦",
    color: "#0000ff", // Blue
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 31,
        month: 12,
        hours: 0,
        minutes: 0,
      },
    },
    name: "New Year's Eve",
    description:
      "The last day of the year, celebrated with parties and fireworks.",
    icon: "🎆",
    color: "#ff0000", // Red
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 1,
        month: 5,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Early May Bank Holiday",
    description: "A public holiday to celebrate the start of summer.",
    icon: "🌼",
    color: "#ffeb3b", // Yellow
    durationDays: 1,
  },
];
