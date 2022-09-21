import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

import ViewLayout from "./viewLayout";
import DatePicker, { CalendarType } from "./datePicker";
import Button from "../Button/button";
import Icon from "../Icon/icon";
import HeaderTitle from "./headerTitle";
import { CalendarProps } from "./calendar";

interface DateViewProps {
  calendar: CalendarType;
  onSelectMonthYear: Dispatch<SetStateAction<{ year: number; monthIndex: number }>>;
  onTitleClick: () => void;
  onClickToday: (event: ChangeEvent<HTMLInputElement>) => void;
}

function module(m: number, n: number) {
  return ((m % n) + n) % n;
}

const DateView: FC<DateViewProps & CalendarProps> = (props) => {
  const {
    calendar: { year, monthIndex },
    onSelectMonthYear,
    onTitleClick,
    selectedDate,
    onSelectDate,
    onClickToday,
  } = props;

  function incrementMonthIndex(increment: number) {
    const incrementedMonthIndex =  module(monthIndex + increment, 12);
    const incrementedYear = year + Math.floor((monthIndex + increment) / 12);
    onSelectMonthYear && onSelectMonthYear({
      year: incrementedYear,
      monthIndex: incrementedMonthIndex,
    });
  }

  const goToPreviousMonth = incrementMonthIndex.bind(null, -1);
  const goToNextMonth = incrementMonthIndex.bind(null, 1);

  return (
    <ViewLayout
      bodyElement={
        <DatePicker
          calendar={props.calendar}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
        />
      }
      header={{
        leftElement: <Icon icon="angle-left" onClick={goToPreviousMonth}/>,
        middleElement: (
          <HeaderTitle
            year={year}
            monthIndex={monthIndex}
            onTitleCilck={onTitleClick}
          />
        ),
        rightElement: <Icon icon="angle-right" onClick={goToNextMonth}/>
      }}
      footerElement={
        <Button btnType="primary" onClick={(onClickToday as unknown) as any}>
          今天
        </Button>
      }
    />
  )
}

export default DateView;
