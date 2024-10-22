import { RecurrenceFormula } from "../props.interface";
import { isEventInRange } from "../utils";

describe("isEventInRange - проверка на вхождение события по формуле в диапазон", () => {

  test("должен вернуть false для события, которое не попадает в диапазон", async () => {
    const date = new Date("2023-01-01T00:00:00Z");
    const range: [Date, Date] = [
      new Date("2023-02-16T00:00:00Z"),
      new Date("2023-02-16T23:59:59Z"),
    ];
    expect(await isEventInRange(date, range)).toBe(false);
  });

  test("должен вернуть true для события, которое попадает в диапазон", async () => {
    const date = new Date("2023-02-16T01:00:00Z");
    const range: [Date, Date] = [
      new Date("2023-02-16T00:00:00Z"),
      new Date("2023-02-16T23:59:59Z"),
    ];
    expect(await isEventInRange(date, range)).toBe(true);
  });

  test("должен вернуть true для события, которое попадает в диапазон", async () => {
    const formula: RecurrenceFormula = {
      repeatInterval: "WEEKS",
      frequency: 0, // Повторяется каждую неделю
      specificDateTime: {
        dayOfWeek: 1,
      },
    };
    const range: [Date, Date] = [
      new Date("2024-08-04T00:00:00Z"),
      new Date("2024-08-04T23:59:59Z"),
    ];
    expect(await isEventInRange(formula, range)).toBe(true);
  });

  test("должен вернуть false для события, которое не попадает в диапазон", async () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "MONTHS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 15,
        hours: 14,
        minutes: 30,
      },
    };
    const range: [Date, Date] = [
      new Date("2023-02-16T00:00:00Z"),
      new Date("2023-02-16T23:59:59Z"),
    ];
    expect(await isEventInRange(formula, range)).toBe(false);
  });

  test("должен вернуть true для повторяющегося события в пределах диапазона", async () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "DAYS",
      frequency: 1,
    };
    const range: [Date, Date] = [
      new Date("2023-01-02T00:00:00Z"),
      new Date("2023-01-02T23:59:59Z"),
    ];
    expect(await isEventInRange(formula, range)).toBe(true);
  });

  test("должен вернуть true для события, которое повторяется ежегодно и попадает в диапазон", async () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 1,
        month: 2, // Февраль
      },
    };
    const range: [Date, Date] = [
      new Date("2024-01-01T00:00:00Z"),
      new Date("2024-03-01T23:59:59Z"),
    ];
    expect(await isEventInRange(formula, range)).toBe(true);
  });

  test("должен вернуть false для события, которое повторяется ежегодно, но не попадает в диапазон", async () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 1,
        month: 1, // Январь
      },
    };
    const range: [Date, Date] = [
      new Date("2024-01-02T00:00:00Z"),
      new Date("2024-01-02T23:59:59Z"),
    ];
    expect(await isEventInRange(formula, range)).toBe(false);
  });

  test("должен вернуть true для события, которое повторяется каждый квартал и попадает в диапазон", async () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "QUARTERS",
      frequency: 1,
    };
    const range: [Date, Date] = [
      new Date("2023-04-01T00:00:00Z"),
      new Date("2023-04-01T23:59:59Z"),
    ];
    expect(await isEventInRange(formula, range)).toBe(true);
  });

  test("должен вернуть false для события, которое повторяется каждый квартал, но не попадает в диапазон", async () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "QUARTERS",
      frequency: 1,
    };
    const range: [Date, Date] = [
      new Date("2023-05-01T00:00:00Z"),
      new Date("2023-05-01T23:59:59Z"),
    ];
    expect(await isEventInRange(formula, range)).toBe(false);
  });
});
