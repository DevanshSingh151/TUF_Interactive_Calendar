import { format, isSameDay, isToday, isBefore, isAfter, isSameMonth } from 'date-fns';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Holiday, MONTH_THEMES } from '@/types/calendar';
import { Sticker } from '@/hooks/useStickers';

interface Props {
  date: Date;
  currentMonth: Date;
  selectedRange: { start: Date | null; end: Date | null };
  hoveredDate: Date | null;
  holidays: Holiday[];
  onClick: (date: Date) => void;
  onHover: (date: Date) => void;
  onDoubleClick: (date: Date) => void;
  sticker: Sticker;
}

export function CalendarDayCell({ date, currentMonth, selectedRange, hoveredDate, holidays, onClick, onHover, onDoubleClick, sticker }: Props) {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const themeMonth = MONTH_THEMES[currentMonth.getMonth()];
  
  const today = isToday(date);
  const isStart = selectedRange.start ? isSameDay(date, selectedRange.start) : false;
  const isEnd = selectedRange.end ? isSameDay(date, selectedRange.end) : false;
  const isSelected = isStart || (isEnd && !isSameDay(selectedRange.start!, selectedRange.end!));

  const inFullRange = selectedRange.start && selectedRange.end && isAfter(date, selectedRange.start) && isBefore(date, selectedRange.end);
  
  let inHoverRange = false;
  let isHoverEnd = false;
  if (selectedRange.start && !selectedRange.end && hoveredDate && isAfter(hoveredDate, selectedRange.start)) {
    inHoverRange = isAfter(date, selectedRange.start) && isBefore(date, hoveredDate);
    isHoverEnd = isSameDay(date, hoveredDate);
  }

  const inRange = inFullRange || inHoverRange;
  const showBand = inRange || (isStart && (selectedRange.end || isHoverEnd)) || isEnd || isHoverEnd;

  const holiday = holidays.find(h => isSameDay(h.date, date));

  let bandLeft = inRange || isEnd || isHoverEnd ? "left-0" : "left-1/2";
  let bandRight = inRange || isStart ? "right-0" : "right-1/2";
  
  if(isStart && (isEnd || isHoverEnd) && isSameDay(date, selectedRange.start!)) {
      bandLeft = "";
      bandRight = "";
  }

  const bandClass = inFullRange || isEnd || (isStart && selectedRange.end) ? themeMonth.bgHighlight : "bg-gray-100";
  const circleClass = isSelected ? `${themeMonth.bg} text-white shadow` :
                      today && !isSelected ? "bg-navy-900 border-2 border-gray-900 text-gray-900" :
                      inRange ? "text-gray-900" :
                      !isCurrentMonth ? "text-gray-400" : "text-gray-700 group-hover:bg-gray-100";

  return (
    <div 
      className="relative flex justify-center items-center h-10 sm:h-12 w-full group cursor-pointer"
      onClick={() => onClick(date)}
      onMouseEnter={() => onHover(date)}
      onDoubleClick={() => onDoubleClick(date)}
      onContextMenu={(e) => { e.preventDefault(); onDoubleClick(date); }}
    >
      {showBand && bandLeft && bandRight && (
         <div className={cn("absolute inset-y-[4px] sm:inset-y-[6px]", bandLeft, bandRight, bandClass, "z-0 transition-opacity duration-200")} />
      )}

      <motion.div
         whileTap={{ scale: 0.85 }}
         className={cn(
            "relative z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base font-medium transition-colors duration-200",
            circleClass
         )}
      >
        {format(date, 'd')}
      </motion.div>

      {sticker !== 'none' && (
        <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            key={sticker}
            className="absolute top-0 right-0 sm:-top-0 sm:right-1 text-[10px] sm:text-xs z-30 drop-shadow-sm pointer-events-none"
        >
            {sticker}
        </motion.div>
      )}

      {holiday && (
        <div className="absolute bottom-0 sm:-bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-500 rounded-full z-20 group-hover:scale-150 transition-transform">
           <div className="absolute pt-2 bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max z-30">
             <div className="bg-gray-800 text-white text-[10px] sm:text-xs px-2 py-1 rounded shadow-lg">
                {holiday.name}
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
