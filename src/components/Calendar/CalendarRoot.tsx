'use client';

import { useCalendar } from '@/hooks/useCalendar';
import { getHolidays } from '@/utils/holidays';
import { CalendarSpiral } from './CalendarSpiral';
import { CalendarHero } from './CalendarHero';
import { CalendarNav } from './CalendarNav';
import { CalendarGrid } from './CalendarGrid';
import { CalendarStats } from './CalendarStats';
import { CalendarNotes } from './CalendarNotes';
import { useState } from 'react';
import { isWithinInterval } from 'date-fns';
import { useStickers } from '@/hooks/useStickers';

export function CalendarRoot() {
  const {
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
  } = useCalendar();

  const { stickers, cycleSticker } = useStickers();
  const [hasNote, setHasNote] = useState(false);
  const holidays = getHolidays(currentMonth.getFullYear());

  let holidaysInRange = 0;
  if (selectedRange.start) {
     const start = selectedRange.start;
     const end = selectedRange.end || selectedRange.start;

     const safeStart = start < end ? start : end;
     const safeEnd = start > end ? start : end;

     holidaysInRange = holidays.filter(h => isWithinInterval(h.date, { start: safeStart, end: safeEnd })).length;
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl shadow-2xl bg-white flex flex-col md:flex-row calendar-card mt-8 mb-8 no-print sm:mx-4 md:mx-auto ring-1 ring-black/5">
      <CalendarSpiral />

      <div className="w-full md:w-[40%] lg:w-[35%] shrink-0 flex flex-col bg-gray-50/50 rounded-t-xl md:rounded-tr-none md:rounded-l-xl z-10 relative md:border-r border-gray-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.03)]">
        <CalendarHero monthDate={currentMonth} direction={direction} />
        <CalendarNotes monthDate={currentMonth} selectedRange={selectedRange} onNoteStatusChange={setHasNote} />
      </div>

      <div className="w-full md:w-[60%] lg:w-[65%] flex flex-col bg-white rounded-b-xl md:rounded-bl-none md:rounded-r-xl z-0 overflow-hidden relative border-t md:border-t-0 border-gray-100">
        <CalendarNav 
           currentMonth={currentMonth}
           onPrev={prevMonth}
           onNext={nextMonth}
           onToday={goToToday}
           weekNumbersVisible={weekNumbersVisible}
           onToggleWeekNumbers={toggleWeekNumbers}
        />
        
        <CalendarGrid
           currentMonth={currentMonth}
           direction={direction}
           selectedRange={selectedRange}
           hoveredDate={hoveredDate}
           holidays={holidays}
           weekNumbersVisible={weekNumbersVisible}
           onDateClick={handleDateClick}
           onDateHover={handleDateHover}
           onMouseLeave={handleDateMouseLeave}
           onNext={nextMonth}
           onPrev={prevMonth}
           stickers={stickers}
           onDoubleClick={cycleSticker}
        />

        <CalendarStats 
           selectedRange={selectedRange}
           hasNote={hasNote}
           holidaysInRange={holidaysInRange}
        />
      </div>
    </div>
  );
}
