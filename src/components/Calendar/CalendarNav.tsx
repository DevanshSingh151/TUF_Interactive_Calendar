import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { cn } from '@/utils/cn';
import { MONTH_THEMES } from '@/types/calendar';

interface CalendarNavProps {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  weekNumbersVisible: boolean;
  onToggleWeekNumbers: () => void;
}

export function CalendarNav({ currentMonth, onPrev, onNext, onToday, weekNumbersVisible, onToggleWeekNumbers }: CalendarNavProps) {
  const monthIndex = currentMonth.getMonth();
  const theme = MONTH_THEMES[monthIndex];

  return (
    <div className="flex items-center justify-between py-4 px-6 border-b border-gray-100 no-print">
      <h3 className="font-playfair text-2xl font-semibold text-gray-900 hidden sm:block">
        {format(currentMonth, 'MMMM yyyy')}
      </h3>
      
      <div className="flex items-center space-x-2 sm:space-x-4 ml-auto sm:ml-0 w-full sm:w-auto justify-between sm:justify-end">
        <button
          onClick={onToggleWeekNumbers}
          title="Toggle Week Numbers"
          className={cn(
            "p-2 rounded-md transition-colors",
            weekNumbersVisible ? `${theme.bgHighlight} ${theme.color}` : "text-gray-400 hover:bg-gray-100"
          )}
        >
          <Hash size={18} />
        </button>

        <button
          onClick={onToday}
          className="px-4 py-1.5 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors hidden sm:block"
        >
          Today
        </button>

        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
          <button
            onClick={onPrev}
            className="p-1.5 rounded hover:bg-white hover:shadow-sm text-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="sm:hidden font-playfair font-semibold px-4 text-gray-800">
            {format(currentMonth, 'MMM yyyy')}
          </span>

          <button
            onClick={onNext}
            className="p-1.5 rounded hover:bg-white hover:shadow-sm text-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
