import { CalendarHoliday } from "../props.interface";

export const KAZAKHSTAN_HOLIDAYS: CalendarHoliday[] = [
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
    name: "Жаңа жыл",
    description: "Жаңа жыл мерекесі.",
    icon: "🎉",
    color: "#ff0000", // Red
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 7,
        month: 1,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Православие Рождество",
    description: "Православие мерекесі.",
    icon: "🎄",
    color: "#00ff00", // Green
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 8,
        month: 3,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Халықаралық әйелдер күні",
    description: "Әйелдер жетістіктері мен үлестерін мерекелеу.",
    icon: "💐",
    color: "#ff69b4", // Pink
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 1,
        month: 12,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Тәуелсіздік күні",
    description: "Қазақстанның тәуелсіздігін мерекелеу.",
    icon: "🇰🇿",
    color: "#00a859", // Green
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
    name: "Қазақстан халқының бірлігі күні",
    description: "Қазақстан халқының бірлігін мерекелеу.",
    icon: "🤝",
    color: "#ffeb3b", // Yellow
    durationDays: 1,
  },
];
