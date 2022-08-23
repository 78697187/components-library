import React, { FC } from "react";
import Select from "../Select/select";
import { buildYears } from "./utils/generator";
import Option from '../Select/selectOption';

interface YearPickerProps {
  selectedYear: number;
  defaultValue: string;
  onSelectYear: (value: number) => void;
}

export const YearPicker: FC<YearPickerProps> = (props) => {
  const { selectedYear, defaultValue, onSelectYear } = props;
  const years = buildYears(selectedYear, 100);
  return (
    <div>
      <Select
        defaultValue={defaultValue}
        style={{ width: 100 }}
        onChange={(value) => onSelectYear(Number(value))}>
          {
            years.map((year: number, i: number) => (
              <Option value={year.toString()}
                key={i}
              >
                {year}
              </Option>
            ))
          }
        </Select>
    </div>
  )
}
export default YearPicker;