import { format } from 'date-fns';
import { DateRange } from '@/types/calendar';
import { useNotes } from '@/hooks/useNotes';
import { useEffect } from 'react';

export function CalendarNotes({ monthDate, selectedRange, onNoteStatusChange }: { monthDate: Date, selectedRange: DateRange, onNoteStatusChange?: (hasNote: boolean) => void }) {
  const monthKey = format(monthDate, 'yyyy_MM');
  const { note, updateNote, clearNote, isSaving, isSaved } = useNotes(monthKey);
  
  useEffect(() => {
    if (onNoteStatusChange) {
       onNoteStatusChange(note.trim().length > 0);
    }
  }, [note, onNoteStatusChange]);

  const headerText = selectedRange.start && selectedRange.end 
    ? `${format(selectedRange.start, 'MMM d')} - ${format(selectedRange.end, 'MMM d')}`
    : "Monthly Notes";

  return (
    <div className="w-full bg-[#fdfdfc] border-t md:border-t-0 md:border-r border-gray-100 p-6 pt-6 flex flex-col h-full rounded-b-xl md:rounded-bl-xl md:rounded-br-none no-print relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-white/40 shadow-sm border border-gray-100 rotate-1 mix-blend-overlay z-10 hidden md:block" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-playfair text-xl font-semibold text-gray-800 flex items-center gap-2">
          📝 {headerText}
        </h3>
        
        <div className="flex items-center gap-3 text-xs">
          {isSaving && <span className="text-gray-400 animate-pulse">Saving...</span>}
          {isSaved && <span className="text-green-500 font-medium tracking-wide">Saved ✓</span>}
          
          {note && (
             <button onClick={() => {
                if(window.confirm('Clear all notes for this month?')) {
                   clearNote();
                }
             }} className="text-red-400 hover:text-red-600 transition-colors font-medium">
               ✕ Clear
             </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 relative notebook-lines rounded border border-gray-100/50 shadow-inner overflow-hidden max-h-[300px] md:max-h-full">
        <textarea 
           value={note}
           onChange={(e) => updateNote(e.target.value)}
           placeholder="Write your thoughts here..."
           className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none pt-[4px] px-4 no-scrollbar leading-[28px] text-gray-700 placeholder-[rgba(156,163,175,0.6)] font-sans"
           maxLength={800}
        />
        <div className="absolute bottom-2 right-4 text-xs text-gray-400 pointer-events-none bg-[#fdfdfc]/90 px-1 rounded shadow-sm border border-gray-50">
           {note.length} / 800
        </div>
      </div>
    </div>
  );
}
