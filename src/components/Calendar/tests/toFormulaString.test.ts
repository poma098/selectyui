import { toFormulaString } from "../utils";
import { RecurrenceFormula } from "../props.interface";

describe("toFormulaString - преобразование объекта RecurrenceFormula в строку формулы", () => {
  test("должен вернуть строку для полного объекта с конкретной датой и временем в интервале MONTHS", () => {
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
    const formulaStr = toFormulaString(formula);
    expect(formulaStr).toBe("2023-01-01T00:00:00Z;;MONTHS;1;15T14:30");
  });

  test("должен вернуть строку для полного объекта с конкретной датой и временем в интервале YEARS", () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "YEARS",
      frequency: 1,
      specificDateTime: {
        dayOfMonth: 15,
        month: 3,
        hours: 10,
        minutes: 45,
      },
    };
    const formulaStr = toFormulaString(formula);
    expect(formulaStr).toBe("2023-01-01T00:00:00Z;;YEARS;1;3-15T10:45");
  });

  test("должен вернуть строку для объекта с только обязательными полями", () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "DAYS",
      frequency: 2,
    };
    const formulaStr = toFormulaString(formula);
    expect(formulaStr).toBe("2023-01-01T00:00:00Z;;DAYS;2;");
  });

  test("должен вернуть строку для объекта с отсутствующей startDate и endDate", () => {
    const formula: RecurrenceFormula = {
      repeatInterval: "QUARTERS",
      frequency: 3,
      specificDateTime: {
        dayOfMonth: 10,
      },
    };
    const formulaStr = toFormulaString(formula);
    expect(formulaStr).toBe(";;QUARTERS;3;10T00:00");
  });

  test("должен вернуть строку для объекта с отсутствующим specificDateTime", () => {
    const formula: RecurrenceFormula = {
      startDate: new Date("2023-01-01T00:00:00Z"),
      repeatInterval: "HOURS",
      frequency: 1,
    };
    const formulaStr = toFormulaString(formula);
    expect(formulaStr).toBe("2023-01-01T00:00:00Z;;HOURS;1;");
  });

  test("должен вернуть строку для объекта с только частотой и интервалом", () => {
    const formula: RecurrenceFormula = {
      repeatInterval: "MINUTES",
      frequency: 30,
    };
    const formulaStr = toFormulaString(formula);
    expect(formulaStr).toBe(";;MINUTES;30;");
  });
});
