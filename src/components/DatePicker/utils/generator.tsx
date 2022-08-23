import { addDays, format, setDay, setMonth, startOfWeek } from "date-fns";
import { chunk } from "lodash";
import { MonthOfYear } from '../monthPicker';


export default function buildWeeks(year: number, monthIndex: number) {
  const firstDayOfMonth = new Date(year, monthIndex);
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth, {weekStartsOn: 0});
  const weeks = new Array(6 * 7).fill(0).map((_, i) => addDays(firstDayOfCalendar, i));

  return chunk(weeks, 7);
}

export function buildDayNames(weekStartOn: number): string[] {
  return new Array(7).fill(0).map((_, i) => (i + weekStartOn) % 7).map((dayOfWeek) => {
    const day = setDay(new Date(0), dayOfWeek);
    return format(day, "i");
  })
}

export function buildMonths(): MonthOfYear[][] {
  const months = new Array(12)
    .fill(0)
    .map((_, i) => setMonth(new Date(0), i))
    .map(
      (month, j) => ({ index: j, name: format(month, "L") } as MonthOfYear)
    );

  return chunk(months, 3);
}

export function buildYears(middle: number, windowSize = 3): number[] {
  const start = middle - windowSize;
  const end = middle + windowSize;
  const years = [];
  for (let i = start; i <= end; i++) {
    years.push(i);
  }
  return years;
}



