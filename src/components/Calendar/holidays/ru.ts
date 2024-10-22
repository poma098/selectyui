import { CalendarHoliday } from "../props.interface";

export const RUSSIAN_HOLIDAYS: CalendarHoliday[] = [
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
    name: "Новый год",
    description:
      "Новый год — главный календарный праздник, наступающий в момент перехода с последнего дня текущего года в первый день следующего года.",
    icon: "🎄",
    color: "#ef5350", // Красный
    durationDays: 7,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 7,
        hours: 0,
        minutes: 0,
        month: 1,
      },
    },
    name: "Рождество Христово",
    description:
      "Рождество Христово — христианский праздник, связанный с памятью о рождении Иисуса Христа",
    icon: "🎅",
    color: "#ffd700", // Золотой
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 23,
        hours: 0,
        minutes: 0,
        month: 2,
      },
    },
    name: "День защитника Отечества",
    description:
      "День защитника Отечества – официальный праздник в современной России",
    icon: "🛡️",
    color: "#0033cc", // Темно-синий
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 8,
        hours: 0,
        minutes: 0,
        month: 3,
      },
    },
    name: "Международный женский день",
    description:
      "Международный женский день — праздник, который отмечается ежегодно 8 марта в ряде государств и стран мира.",
    icon: "💐",
    color: "#9c27b0", // Лиловый
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 1,
        hours: 0,
        minutes: 0,
        month: 5,
      },
    },
    name: "Праздник Весны и Труда",
    description:
      "Первое мая — праздник, связанный с темой труда, отмечаемый под различными названиями во многих государствах и территориях 1 мая или в первый понедельник мая.",
    icon: "🛠️",
    color: "#4caf50", // Зеленый
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 9,
        hours: 0,
        minutes: 0,
        month: 5,
      },
    },
    name: "День Победы",
    description:
      "День Победы — праздник победы Красной армии и советского народа над нацистской Германией в Великой Отечественной войне 1941—1945 годов.",
    icon: "🎗️",
    color: "#ff5722", // Оранжевый
    durationDays: 1,
  },
  {
    formula: {
      startDate: new Date(1990, 5, 12),
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 12,
        hours: 0,
        minutes: 0,
        month: 6,
      },
    },
    name: "День России",
    description:
      "День России — государственный праздник Российской Федерации. Отмечается 12 июня — в день принятия в 1990 году Декларации о государственном суверенитете РСФСР.",
    icon: "🇷🇺",
    color: "#0033cc", // Темно-синий
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 1,
        hours: 0,
        minutes: 0,
        month: 9,
      },
    },
    name: "День знаний",
    description:
      "День знаний — государственный праздник, в СССР с 1984 года, введённый Указом Президиума Верховного Совета СССР № 373-11 от 15 июня 1984 года «Об объявлении 1 сентября всенародным праздником — Днём знаний»",
    icon: "🎓",
    color: "#8bc34a", // Темно-зеленый
    durationDays: 1,
  },
  {
    formula: {
      startDate: new Date("2004-10-04T00:00:00"),
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 4,
        hours: 0,
        minutes: 0,
        month: 11,
      },
    },
    name: "День народного единства",
    description:
      "День наро́дного единства — российский государственный праздник, отмечаемый 4 ноября начиная с 2005 года. В этот день установлен день воинской славы России.",
    icon: "😇",
    color: "#006400", // Темно-зеленый
    durationDays: 1,
  },
];
