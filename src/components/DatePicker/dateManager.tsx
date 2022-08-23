import React, { ChangeEvent, createContext, FC, useState } from "react";
import { dateToStr, strToDate } from "./utils/date-extraction";

interface DateManagerState {
  date: Date;
  textInput: string;
  origin?: string;
  errors?: any[];
}

interface DateManagerProps {
  onChange?: (e: ChangeEvent<Element>, value: DateManagerState) => void;
  children: React.ReactNode;
}

export interface IPickerContext {
  value: DateManagerState;
  onSelectDate: (e: ChangeEvent<HTMLInputElement>, date: Date) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const DateContext = createContext<IPickerContext>({
  value: { date: new Date(), textInput: ""},
  onSelectDate: () => { return },
  onInputChange: () => { return },
});

const DateManager: FC<DateManagerProps> = (props) =>{
  const { onChange, children } = props;
  const [ dateState, setdateState ] = useState<DateManagerState>({
    date: new Date(),
    textInput: "",
  });

  function onSelectDate(e: ChangeEvent<HTMLInputElement>, date: Date) {
    const nextState: DateManagerState = {
      date,
      textInput: dateToStr(date),
    };
    setdateState(nextState);

    onChange && onChange(e, { ...nextState, origin: "PICKER"});
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const textInput = e.target.value;
    let errors = [];
    let date = new Date();
    if(textInput) {
      try {
        date = strToDate(textInput);
      } catch(parseErrors) {
        errors = parseErrors as any;
      }
    }
    const nextState: DateManagerState = {
      date,
      textInput
    }
    setdateState(nextState);
    onChange && onChange(e, { ...nextState, errors });
  }

  const passedContext: IPickerContext = {
    value: dateState,
    onSelectDate,
    onInputChange,
  };

  return (
    <DateContext.Provider value={ passedContext }>
      { children }
    </DateContext.Provider>
  )
}

export default DateManager;