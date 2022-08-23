import React, { ChangeEvent, FC, useMemo } from "react";
import classNames from "classnames";
import dateFnsIsToday from "date-fns/isToday";

import { CalendarProps } from './calendar';
import buildWeeks, { buildDayNames } from "./utils/generator";
import { getDate, getMonth, isSameDay } from "date-fns";
import { Button } from "vikingship";

export interface CalendarType {
  year: number;
  monthIndex: number;
}

export interface DatePickerProps {
  calendar: CalendarType;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  selectedDate: Date;
}

export const DatePicker: FC<DatePickerProps & CalendarProps> = (props) => {
  const {
    calendar: { year, monthIndex },
    selectedDate,
    onSelectDate
  } = props;

  const weeks = useMemo(() => {
    return buildWeeks(year, monthIndex)
  }, [monthIndex, year]);

  const dayNames = useMemo(() => buildDayNames(0), []);

  const exchangeDayNames = (name: string) => {
    switch(name) {
      case "7":
        return "日";
      case "1":
        return "一";
      case "2":
        return "二";
      case "3":
        return "三";
      case "4":
        return "四";
      case "5":
        return "五";
      case "6":
        return "六";
      default:
        break;
    }
  }

  return (
    <table className="yuan-day-picker">
      <thead className="yuan-day-picker-header">
        <tr>
          {
            dayNames.map((dayName: string, i: number) => (
              <th key={i}>
                { exchangeDayNames(dayName) }
              </th>
            ))
          }
        </tr>
      </thead>

      <tbody className="yuan-day-picker-weeks">
        {
          weeks.map((week: Date[], i: number) => (
            <tr key={i} className={"yuan-day-picker-week-item"}>
              {
                week.map((day: Date, j: number) => {
                  // 目前是当前日期
                  const isToday = dateFnsIsToday(day);
                  // 当前月日期
                  const isCurrentMonth = getMonth(day) === monthIndex;
                  // 选中日期
                  const isSelected = isSameDay(day, selectedDate);

                  return (
                    <td key={j} className={"yuan-day-picker-day"}>
                      <Button
                        className={classNames('yuan-day-picker-ghost', {
                          'yuan-day-picker-is-today': isToday,
                          'yuan-day-picker-is-selected': isSelected,
                          'yuan-day-picker-is-current-month': isCurrentMonth,
                        })}
                        btnType='default'
                        onClick={(e) => onSelectDate((e as unknown) as ChangeEvent<HTMLInputElement>, day)}
                        >
                          {getDate(day)}
                        </Button>
                    </td>
                  )
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

DatePicker.defaultProps = {
  calendar: { year: 1799, monthIndex: 8 },
  selectedDate: new Date(),
};

export default DatePicker;