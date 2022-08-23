import React, { FC } from "react";
import classNames from "classnames";

import Button from "../Button/button";
import { buildMonths } from "./utils/generator";

export interface MonthOfYear {
  index: number;
  name: string;
}

interface MonthPickerProps {
  selectedMonthIndex: number;
  onSelect: (value: number) => void;
}

export const MonthPicker: FC<MonthPickerProps> = (props) => {
  const months: MonthOfYear[][] = buildMonths();
  const { selectedMonthIndex, onSelect } = props;

  return (
    <table className="yuan-picker-month-wrapper">
      <tbody>
        {
          months.map((row: MonthOfYear[], i: number) => (
            <tr key={i}>
              {
                row.map((month: MonthOfYear, j: number) => {
                  const isSelected = month.index === selectedMonthIndex;
                  return (
                    <td
                      className={classNames('yuan-picker-month-cell', {
                        'isSelected': isSelected
                      })}
                      key={j}
                    >
                      <Button
                        className={classNames('yuan-picker-month-ghost', {
                          'isSelected': isSelected
                        })}
                        btnType='default'
                        onClick={() => onSelect && onSelect(month.index)}
                        >
                          {month.name}
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

export default MonthPicker;