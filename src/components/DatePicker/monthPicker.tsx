import React, { FC } from "react";
import classNames from "classnames";
import scopedClass from "../utils/scopedClass";

import Button from "../Button/button";
import { buildMonths } from "./utils/generator";

const sc = scopedClass('yuan-picker-month');
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
    <table className={sc('wrapper')}>
      <tbody>
        {
          months.map((row: MonthOfYear[], i: number) => (
            <tr key={i}>
              {
                row.map((month: MonthOfYear, j: number) => {
                  const isSelected = month.index === selectedMonthIndex;
                  return (
                    <td
                      className={classNames(sc('cell'), {
                        [`${sc('cell-is-selected')}`]: isSelected
                      })}
                      key={j}
                    >
                      <Button
                        className={classNames(sc('default'), {
                          [`${sc('is-selected')}`]: isSelected
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