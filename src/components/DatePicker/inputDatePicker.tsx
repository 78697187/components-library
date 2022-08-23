import React, { ChangeEvent, FC, useRef, useState } from "react";

import DateManager from "./dateManager";
import DatePickerInput from "./input";
import Picker from "./picker";


export interface InputDatePickerProps {
  onChange?: (e: ChangeEvent<Element>, payload: any) => void;
}

export const InputDatePicker: FC<InputDatePickerProps> = (props) => {
  const { onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [ showPicker, setShowPicker ] = useState(false);
  const openPicker = setShowPicker.bind(null, true);
  const closePicker = setShowPicker.bind(null, false);

  const onFocus = () => {
    openPicker();
  }

  const onBlur = () => {
    closePicker();
  }

  const handleOnChange = (e: ChangeEvent<Element>, payload: any) => {
    onChange && onChange(e, payload);

  }

  const onClick = () => {
    openPicker();
  }

  return (
    <div onFocus={onFocus} onBlur={onBlur}>
      <DateManager onChange={handleOnChange}>
        <DatePickerInput ref={inputRef} onClick={onClick} />
        { showPicker && <Picker/> }
      </DateManager>
    </div>
  )
}

export default InputDatePicker;