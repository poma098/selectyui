import { CalendarHoliday } from "../props.interface";

export const BELARUS_HOLIDAYS: CalendarHoliday[] = [
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
    name: "Новы год",
    description: "Пачатак новага года, святкуецца рознымі традыцыямі.",
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
    name: "Раства Хрыстова",
    description:
      "Святкаванне нараджэння Ісуса Хрыста паводле праваслаўнага календара.",
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
    name: "Міжнародны жаночы дзень",
    description: "Дзень святкавання дасягненняў і ўнёску жанчын.",
    icon: "💐",
    color: "#ff69b4", // Pink
    durationDays: 1,
  },
  {
    formula: {
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 3,
        month: 7,
        hours: 0,
        minutes: 0,
      },
    },
    name: "Дзень Незалежнасці",
    description: "Святкаванне незалежнасці Беларусі ад Савецкага Саюза.",
    icon: "🇧🇾",
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
    name: "Дзень працы",
    description: "Дзень ўшанавання працоўных і працоўных правоў.",
    icon: "🔨",
    color: "#ffeb3b", // Yellow
    durationDays: 1,
  },
];
