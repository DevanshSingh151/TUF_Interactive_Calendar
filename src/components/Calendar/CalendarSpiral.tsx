export function CalendarSpiral() {
  return (
    <div className="absolute top-0 left-0 w-full -translate-y-[14px] flex justify-evenly px-4 z-20 no-print pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex gap-[2px] items-center">
          <div className="w-[8px] h-8 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 rounded-sm shadow-[0_3px_5px_rgba(0,0,0,0.5)] border-x border-gray-500 relative">
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-4 bg-gray-100 rounded-full shadow-inner border border-gray-300 z-[-1]" />
          </div>
          <div className="w-[8px] h-8 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-700 rounded-sm shadow-[0_3px_5px_rgba(0,0,0,0.5)] border-x border-gray-500 relative">
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-4 bg-gray-100 rounded-full shadow-inner border border-gray-300 z-[-1]" />
          </div>
        </div>
      ))}
    </div>
  );
}
