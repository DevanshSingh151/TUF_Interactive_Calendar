import { DateRange } from '@/types/calendar';
import { differenceInDays } from 'date-fns';
import { Calendar, FileText, Gift } from 'lucide-react';

interface CalendarStatsProps {
  selectedRange: DateRange;
  hasNote: boolean;
  holidaysInRange: number;
}

export function CalendarStats({ selectedRange, hasNote, holidaysInRange }: CalendarStatsProps) {
  let daysSelected = 0;
  if (selectedRange.start && selectedRange.end) {
    daysSelected = Math.abs(differenceInDays(selectedRange.end, selectedRange.start)) + 1;
  } else if (selectedRange.start) {
    daysSelected = 1;
  }

  return (
    <div className="flex flex-wrap items-center justify-between border-t border-gray-100 bg-gray-50/80 px-6 py-3 text-sm text-gray-500 rounded-br-xl gap-2 no-print md:rounded-bl-none rounded-b-xl border-l md:border-l-0">
      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-gray-400" />
        <span className="font-medium text-gray-600">
          {daysSelected === 0 ? "No days selected" : `${daysSelected} day${daysSelected > 1 ? 's' : ''} selected`}
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        {holidaysInRange > 0 && (
          <div className="flex items-center gap-1.5 text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-100/50">
            <Gift size={14} />
            <span>{holidaysInRange} holiday{holidaysInRange > 1 ? 's' : ''} in range</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 hidden sm:flex">
          <FileText size={16} className={hasNote ? "text-blue-500" : "text-gray-300"} />
          <span>{hasNote ? "Note saved" : "No note yet"}</span>
        </div>
      </div>
    </div>
  );
}
