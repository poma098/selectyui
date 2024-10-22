import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

function MonthName({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  formatValue = "LLLL y",
}: {
  month?: number;
  year?: number;
  formatValue?: string;
}) {
  const v: string = format(new Date(year, month), formatValue, { locale: ru });
  return <>{v.charAt(0).toUpperCase() + v.slice(1)}</>;
}

export default MonthName;
