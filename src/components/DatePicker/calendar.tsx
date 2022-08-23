import React, { useState, useRef, ChangeEvent, FC } from "react";
import { getMonth, getYear, startOfDay } from "date-fns";
import DateView from "./dateView";
import MonthYearView from "./monthYearView";

export interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (e: ChangeEvent<HTMLInputElement>, date: Date) => void;
}

const today = new Date();
const initialCalendar = {
  year: getYear(today),
  monthIndex: getMonth(today),
}

const Carlendar: FC<CalendarProps> = (props) => {
  const { selectedDate, onSelectDate } = props;
  const [ isDateView, setDateView ] = useState(true);
  const calendarRef = useRef<HTMLInputElement>(null);
  const [ calendar, setCarlendar ] = useState(initialCalendar);

  function onSelectMonth(selectedMonthIndex: number) {
    setCarlendar({...calendar, monthIndex: selectedMonthIndex});
  }

  function onSelectYear(selectedYear: number) {
    setCarlendar({...calendar, year: selectedYear});
  }

  const onSetMonthYearView = setDateView.bind(null, false);
  const onSetDateView = setDateView.bind(null, true);

  const onClickToday = (e: ChangeEvent<HTMLInputElement>) => {
    onSelectDate(e, startOfDay(new Date()));
  }

  return (
    <div className="yuan-datepicker" ref={calendarRef}>
      {
        isDateView ? (
          <DateView
            calendar={calendar}
            onSelectMonthYear={setCarlendar}
            onTitleClick={onSetMonthYearView}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            onClickToday={onClickToday}
          />
        ) :
        (
          <MonthYearView
            calendar={calendar}
            onSelectMonth={onSelectMonth}
            onBackClick={onSetDateView}
            onSelectYear={onSelectYear}
            onClickToday={onClickToday}
          />
        )
      }
    </div>
  )
}

export default Carlendar;