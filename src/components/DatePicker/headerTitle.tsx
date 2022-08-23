import React, { FC } from "react";
import Button from "../Button/button";
import format from "date-fns/format";
import { CalendarType } from "./datePicker";
import YearPicker from "./yearPicker";

interface subType {
  onTitleCilck?: () => void;
  onSelectYear?: (value: number) => void;
}

type NextType = CalendarType & subType;

export const HeaderTitle: FC<NextType> = (props) => {
  const {
    year,
    monthIndex,
    onTitleCilck,
    onSelectYear
  } = props;

  const firstDayOfMonth = new Date(year, monthIndex);
  const monthLabel = format(firstDayOfMonth, "L");
  const yearLabel = format(firstDayOfMonth, "yyyy");

  if(onSelectYear) {
    return (
      <div className="yuan-picker-header-title">
        <span>{monthLabel} 月</span>
        <YearPicker
          selectedYear={year}
          defaultValue={`${yearLabel} 年`}
          onSelectYear={onSelectYear}
        />
      </div>
    )
  } else {
    return (
      <Button
        btnType="primary"
        size="sm"
        onClick={onTitleCilck}
      >
        {`${yearLabel} 年`} {monthLabel} 月
      </Button>
    )
  }
}

export default HeaderTitle;