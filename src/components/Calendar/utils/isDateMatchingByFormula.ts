import { CalendarWeekend, EventDateFormat } from "../props.interface";
import { getWeekNumber } from "./getWeekNumber";

export function isDateMatchingByFormula(dateFormat: EventDateFormat, year: number, month: number, day: number, hour: number, minute: number, second: number, startWeek: CalendarWeekend = 1) {

  const regexYYYY_NN_NN = /^Y{4}-\d{1,2}-\d{1,2}$/;
  const regexW_NN = /^W{1}-[0123456]{1}$/;
  const regexYYYY_MM_NN = /^Y{4}-M{2}-\d{1,2}$/;
  const regexQ_NN = /^Q{1}-\d{1,2}$/;
  const regexQNN_WNN = /^Q[1234]{1}-W-\d{1,2}$/;
  const regexQ_WNN = /^Q-W-\d{1,2}$/;
  const regexQNN_NN = /^Q[1234]{1}-\d{1,2}$/;

  if (dateFormat instanceof Date) {
    return (
      dateFormat.toDateString() ===
      new Date(year, month, day, hour, minute, second).toDateString()
    );
  }

  else if (typeof dateFormat === "number") {
    return (
      dateFormat === new Date(year, month, day, hour, minute, second).getTime()
    );
  }
  
  else if (typeof dateFormat === "string" && regexYYYY_NN_NN.test(dateFormat)) {
    const [YYYY, MM, DD] = dateFormat.split("-").map(Number);
    return (
      MM === month &&
      DD === day
    );
  }
  else if (typeof dateFormat === "string" && regexW_NN.test(dateFormat)) {
    const [W, D] = dateFormat.split("-").map(Number);
    const getDay = (new Date(year, month, day, hour, minute, second)).getDay();
    return getDay === D;
  }
  else if (typeof dateFormat === "string" && regexYYYY_MM_NN.test(dateFormat)) {
    const [YYYY, MM, DD] = dateFormat.split("-").map(Number);
    return (DD === day);
  }
  else if (typeof dateFormat === "string" && regexQ_NN.test(dateFormat)) {
    const [Q, D] = dateFormat.split("-").map(Number);
    // TODO:
  }
  else if (typeof dateFormat === "string" && regexQNN_WNN.test(dateFormat)) {
    // TODO:
  }
  else if (typeof dateFormat === "string" && regexQ_WNN.test(dateFormat)) {
    // TODO:
  }
  else if (typeof dateFormat === "string" && regexQNN_NN.test(dateFormat)) {
    // TODO:
  }

  else {
    return false;
  }
}