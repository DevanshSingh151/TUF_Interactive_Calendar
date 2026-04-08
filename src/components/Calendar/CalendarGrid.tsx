
import { AnimatePresence, motion } from 'framer-motion';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getWeek, format } from 'date-fns';
import { CalendarDayCell } from './CalendarDayCell';
import { DateRange, Holiday, MONTH_THEMES } from '@/types/calendar';
import { Sticker } from '@/hooks/useStickers';

interface Props {
  currentMonth: Date;
  direction: number;
  selectedRange: DateRange;
  hoveredDate: Date | null;
  holidays: Holiday[];
  weekNumbersVisible: boolean;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date) => void;
  onMouseLeave: () => void;
  onNext: () => void;
  onPrev: () => void;
  stickers: Record<string, Sticker>;
  onDoubleClick: (date: Date) => void;
}

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function CalendarGrid({ currentMonth, direction, selectedRange, hoveredDate, holidays, weekNumbersVisible, onDateClick, onDateHover, onMouseLeave, onNext, onPrev, stickers, onDoubleClick }: Props) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const theme = MONTH_THEMES[currentMonth.getMonth()];

  const getWeekNumber = (date: Date) => {
    return getWeek(date, { weekStartsOn: 1 });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="flex-1 px-4 sm:px-6 py-4 flex flex-col min-h-[300px] overflow-hidden bg-white/50" onMouseLeave={onMouseLeave}>
      <div className="flex mb-4">
        {weekNumbersVisible && <div className="w-8 shrink-0" />}
        <div className="grid grid-cols-7 w-full">
          {WEEKDAYS.map((day, idx) => (
            <div key={day} className={`text-center text-xs sm:text-sm font-semibold tracking-wider ${idx === 5 ? theme.color : idx === 6 ? 'text-rose-500' : 'text-gray-900'}`}>
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentMonth.toString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset }) => {
              const swipe = offset.x;
              if (swipe < -50) onNext();
              else if (swipe > 50) onPrev();
            }}
            className="w-full flex flex-col gap-1 sm:gap-2"
          >
            {Array.from({ length: 6 }).map((_, weekIdx) => {
              const weekDays = calendarDays.slice(weekIdx * 7, (weekIdx + 1) * 7);
              if(weekDays.length === 0) return null;
              return (
                <div key={weekIdx} className="flex">
                  {weekNumbersVisible && (
                    <div className="w-8 shrink-0 flex items-center justify-center text-[10px] sm:text-xs text-gray-300 font-medium select-none border-r border-gray-100 mr-1 sm:mr-2">
                       W{getWeekNumber(weekDays[0])}
                    </div>
                  )}
                  <div className="grid grid-cols-7 w-full">
                    {weekDays.map((date) => (
                      <CalendarDayCell
                        key={date.toString()}
                        date={date}
                        currentMonth={currentMonth}
                        selectedRange={selectedRange}
                        hoveredDate={hoveredDate}
                        holidays={holidays}
                        onClick={onDateClick}
                        onHover={onDateHover}
                        onDoubleClick={onDoubleClick}
                        sticker={stickers[format(date, 'yyyy-MM-dd')] || 'none'}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
