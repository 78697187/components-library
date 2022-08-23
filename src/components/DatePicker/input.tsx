import React, { forwardRef, useContext } from "react";
import { DateContext, IPickerContext } from "./dateManager";
import Input from "../Input/input";

interface DatePickerInputProps {
  onClick: (e: Event) => void;
}

export const DatePickerInput = forwardRef((props: DatePickerInputProps, ref) => {
  const { value, onInputChange } = useContext<IPickerContext>(DateContext);

  return (
    <Input
      placeholder="请选择日期"
      size="sm"
      value={value.textInput}
      onChange={onInputChange}
      ref={ref}
    />
  )
});

DatePickerInput.displayName = 'DatePickerInput';

export default DatePickerInput;