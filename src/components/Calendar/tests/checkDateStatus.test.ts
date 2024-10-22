import { checkDateStatus } from "../utils/checkDateStatus";

describe("checkDateStatus", () => {
  test("должна найти текущую дату и обе соседние даты без разрывов (дневной разрыв)", () => {
    const dates = [
      new Date(2024, 0, 1, 0, 0, 0),
      new Date(2024, 0, 2, 0, 0, 0),
      new Date(2024, 0, 3, 0, 0, 0),
    ];
    const currentDate = new Date(2024, 0, 2, 0, 0, 0);
    const result = checkDateStatus(currentDate, dates, "day");

    expect(result).toEqual({
      isCurrentDateFound: true,
      hasLeftNeighbor: true,
      hasRightNeighbor: true,
      hasBottomNeighbor: false,
      hasTopNeighbor: false,
      hasLeftBottomNeighbor: false,
      hasRightTopNeighbor: false,
      hasLeftTopNeighbor: false,
      hasRightBottomNeighbor: false,
    });
  });

  // test("должна найти текущую дату, но без правого соседа из-за разрыва (дневной разрыв)", () => {
  //   const dates = [
  //     new Date(2024, 0, 1),
  //     new Date(2024, 0, 2),
  //     new Date(2024, 0, 4),
  //   ];
  //   const currentDate = new Date(2024, 0, 2);
  //   const result = checkDateStatus(currentDate, dates, "day");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна найти текущую дату и обе соседние даты с недельным разрывом", () => {
  //   const dates = [
  //     new Date(2024, 0, 1),
  //     new Date(2024, 0, 2),
  //     new Date(2024, 0, 8),
  //   ];
  //   const currentDate = new Date(2024, 0, 2);
  //   const result = checkDateStatus(currentDate, dates, "week");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: true,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна вернуть false для всех соседей, если текущая дата не найдена в массиве", () => {
  //   const dates = [
  //     new Date(2024, 0, 1),
  //     new Date(2024, 0, 2),
  //     new Date(2024, 0, 4),
  //   ];
  //   const currentDate = new Date(2024, 0, 3);
  //   const result = checkDateStatus(currentDate, dates, "day");

  //   expect(result).toEqual({
  //     isCurrentDateFound: false,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать крайний случай с одной датой в массиве", () => {
  //   const dates = [new Date(2024, 0, 1)];
  //   const currentDate = new Date(2024, 0, 1);
  //   const result = checkDateStatus(currentDate, dates, "day");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв в месяцах, если разрыв допустим", () => {
  //   const dates = [
  //     new Date(2024, 0, 1),
  //     new Date(2024, 1, 1), // 1 февраля 2024
  //     new Date(2024, 2, 1), // 1 марта 2024
  //   ];
  //   const currentDate = new Date(2024, 1, 1);
  //   const result = checkDateStatus(currentDate, dates, "month");
    
  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв в месяцах, если разрыв допустим", () => {
  //   const dates = [
  //     new Date(2024, 0, 1),
  //     new Date(2024, 0, 2), // 2 января 2024
  //     new Date(2024, 0, 15), // 15 января 2024
  //   ];
  //   const currentDate = new Date(2024, 0, 15);
  //   const result = checkDateStatus(currentDate, dates, "month");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна вернуть false для соседей, если разрыв в месяцах, но допустимы только дни", () => {
  //   const dates = [
  //     new Date(2024, 0, 1),
  //     new Date(2024, 1, 1), // 1 февраля 2024
  //     new Date(2024, 2, 1), // 1 марта 2024
  //   ];
  //   const currentDate = new Date(2024, 1, 1);
  //   const result = checkDateStatus(currentDate, dates, "day");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв в часах, если разрывы допустимы", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10),
  //     new Date(2024, 0, 1, 11),
  //     new Date(2024, 0, 1, 12),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 11);
  //   const result = checkDateStatus(currentDate, dates, "hour");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна вернуть false для соседей, если разрыв в часах, но допустимы только минуты", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10, 30),
  //     new Date(2024, 0, 1, 11, 30),
  //     new Date(2024, 0, 1, 12, 30),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 11, 30);
  //   const result = checkDateStatus(currentDate, dates, "minute");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв в годах, если разрыв допустим", () => {
  //   const dates = [
  //     new Date(2023, 11, 31), // 31 декабря 2023
  //     new Date(2024, 0, 1), // 1 января 2024
  //     new Date(2025, 0, 1), // 1 января 2025
  //   ];
  //   const currentDate = new Date(2024, 0, 1);
  //   const result = checkDateStatus(currentDate, dates, "year");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна вернуть false для соседей, если разрыв в годах, но допустимы только месяцы", () => {
  //   const dates = [
  //     new Date(2023, 11, 31),
  //     new Date(2024, 0, 1),
  //     new Date(2025, 0, 1),
  //   ];
  //   const currentDate = new Date(2024, 0, 1);
  //   const result = checkDateStatus(currentDate, dates, "month");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв в кварталах, если разрыв допустим", () => {
  //   const dates = [
  //     new Date(2024, 0, 1), // Q1 2024
  //     new Date(2024, 3, 1), // Q2 2024
  //     new Date(2024, 6, 1), // Q3 2024
  //   ];
  //   const currentDate = new Date(2024, 3, 1); // Q2 2024
  //   const result = checkDateStatus(currentDate, dates, "quarter");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна вернуть false для соседей, если разрыв в кварталах, но допустимы только месяцы", () => {
  //   const dates = [
  //     new Date(2024, 0, 1), // Q1 2024
  //     new Date(2024, 3, 1), // Q2 2024
  //     new Date(2024, 6, 1), // Q3 2024
  //   ];
  //   const currentDate = new Date(2024, 3, 1); // Q2 2024
  //   const result = checkDateStatus(currentDate, dates, "month");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв в минутах, если разрывы допустимы", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10, 14),
  //     new Date(2024, 0, 1, 10, 15),
  //     new Date(2024, 0, 1, 10, 16),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 10, 15);
  //   const result = checkDateStatus(currentDate, dates, "minute");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна вернуть false для соседей, если разрыв в минутах, но допустимы только часы", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10),
  //     new Date(2024, 0, 1, 11),
  //     new Date(2024, 0, 1, 12),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 11);
  //   const result = checkDateStatus(currentDate, dates, "hour");

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв в произвольном количестве миллисекунд", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10, 0, 0),
  //     new Date(2024, 0, 1, 10, 0, 10), // разрыв в 10 секунд
  //     new Date(2024, 0, 1, 10, 0, 20),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 10, 0, 10);
  //   const result = checkDateStatus(currentDate, dates, 10000); // Допустимый разрыв 10 секунд (10000 миллисекунд)

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна вернуть false для соседей, если разрыв в миллисекундах превышает допустимый предел", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10, 0, 0),
  //     new Date(2024, 0, 1, 10, 0, 20), // разрыв в 20 секунд
  //     new Date(2024, 0, 1, 10, 0, 40),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 10, 0, 20);
  //   const result = checkDateStatus(currentDate, dates, 10000); // Допустимый разрыв 10 секунд (10000 миллисекунд)

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать минимальный разрыв в миллисекундах", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10, 0, 0, 0),
  //     new Date(2024, 0, 1, 10, 0, 0, 5), // разрыв в 5 миллисекунд
  //     new Date(2024, 0, 1, 10, 0, 0, 10),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 10, 0, 0, 5);
  //   const result = checkDateStatus(currentDate, dates, 5); // Допустимый разрыв 5 миллисекунд

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв в секундах (1000 миллисекунд)", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10, 0, 0),
  //     new Date(2024, 0, 1, 10, 0, 1), // разрыв в 1 секунду
  //     new Date(2024, 0, 1, 10, 0, 2),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 10, 0, 1);
  //   const result = checkDateStatus(currentDate, dates, 1000); // Допустимый разрыв 1 секунда (1000 миллисекунд)

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  // test("должна корректно обрабатывать разрыв, равный точно допустимому значению", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10, 0, 0),
  //     new Date(2024, 0, 1, 10, 0, 5), // разрыв в 5 секунд
  //     new Date(2024, 0, 1, 10, 0, 10),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 10, 0, 5);
  //   const result = checkDateStatus(currentDate, dates, 5000); // Допустимый разрыв 5 секунд (5000 миллисекунд)

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: true,
  //     hasRightNeighbor: true,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });

  
  // test("должна вернуть false, если разрыв чуть больше допустимого", () => {
  //   const dates = [
  //     new Date(2024, 0, 1, 10, 0, 0),
  //     new Date(2024, 0, 1, 10, 0, 10), // разрыв в 10 секунд
  //     new Date(2024, 0, 1, 10, 0, 20),
  //   ];
  //   const currentDate = new Date(2024, 0, 1, 10, 0, 10);
  //   const result = checkDateStatus(currentDate, dates, 9999); // Допустимый разрыв 9999 миллисекунд (чуть меньше 10 секунд)

  //   expect(result).toEqual({
  //     isCurrentDateFound: true,
  //     hasLeftNeighbor: false,
  //     hasRightNeighbor: false,
  //     hasBottomNeighbor: false,
  //     hasTopNeighbor: false,
  //     hasLeftBottomNeighbor: false,
  //     hasRightTopNeighbor: false,
  //     hasLeftTopNeighbor: false,
  //     hasRightBottomNeighbor: false,
  //   });
  // });
});
