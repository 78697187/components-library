import React, { useContext } from "react";
import { DateContext, IPickerContext } from "./dateManager";
import Carlendar from "./calendar";


const Picker = () => {
  const { value, onSelectDate } = useContext<IPickerContext>(DateContext);

  return (
    <Carlendar selectedDate={value.date} onSelectDate={onSelectDate}/>
  )
}

export default Picker;