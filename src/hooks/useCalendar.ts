import { useState, useCallback } from 'react';
import { addMonths, subMonths, isSameDay, isBefore, startOfMonth } from 'date-fns';
import { DateRange } from '../types/calendar';

export function useCalendar(initialDate: Date = new Date()) {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(initialDate));
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [weekNumbersVisible, setWeekNumbersVisible] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(0);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
    setDirection(1);
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => subMonths(prev, 1));
    setDirection(-1);
  }, []);

  const goToToday = useCallback(() => {
    const todayStart = startOfMonth(new Date());
    setDirection(isBefore(todayStart, currentMonth) ? -1 : 1);
    setCurrentMonth(todayStart);
  }, [currentMonth]);

  const toggleWeekNumbers = useCallback(() => {
    setWeekNumbersVisible((prev) => !prev);
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedRange((prev) => {

      if (prev.start && !prev.end && isSameDay(prev.start, date)) {
        return { start: null, end: null };
      }
      
      if (prev.start && prev.end && (isSameDay(prev.start, date) || isSameDay(prev.end, date))) {
        return { start: null, end: null };
      }

      if (!prev.start) {
        return { start: date, end: null };
      }

      if (prev.start && !prev.end) {
        if (isBefore(date, prev.start)) {

          return { start: date, end: null };
        }

        return { start: prev.start, end: date };
      }

      if (prev.start && prev.end) {
        return { start: date, end: null };
      }

      return prev;
    });
  }, []);

  const handleDateHover = useCallback((date: Date) => {
    setHoveredDate(date);
  }, []);

  const handleDateMouseLeave = useCallback(() => {
    setHoveredDate(null);
  }, []);

  return {
    currentMonth,
    direction,
    selectedRange,
    hoveredDate,
    weekNumbersVisible,
    nextMonth,
    prevMonth,
    goToToday,
    toggleWeekNumbers,
    handleDateClick,
    handleDateHover,
    handleDateMouseLeave,
  };
}
