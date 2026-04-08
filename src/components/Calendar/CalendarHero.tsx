import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { MONTH_THEMES } from '@/types/calendar';

const MONTH_KEYWORDS: Record<number, string> = {
  1: "couple,coffee,window",
  2: "snowdrops,flower",
  3: "compass,map,vintage",
  4: "cherry,blossom,pagoda",
  5: "sunflower,sunset,field",
  6: "kayak,cliffs,ocean",
  7: "bonfire,beach,night",
  8: "apple,picking,orchard",
  9: "autumn,leaves,forest",
  10: "lanterns,festival,winter",
  11: "fireplace,snow,cozy"
};

export function CalendarHero({ monthDate, direction }: { monthDate: Date, direction: number }) {
  const monthIndex = monthDate.getMonth();
  
  let url = '';
  if (monthIndex === 0) {
      url = '/images/january.png';
  } else {
      const keyword = MONTH_KEYWORDS[monthIndex];
      url = `https://loremflickr.com/800/600/${keyword}?random=${monthIndex}`;
  }
  
  const theme = MONTH_THEMES[monthIndex];

  return (
    <div className="relative w-full h-[240px] md:h-[320px] overflow-hidden bg-gray-200 rounded-t-xl md:rounded-tr-none md:rounded-l-xl">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.img
          key={monthDate.toString()}
          src={url}
          alt={format(monthDate, 'MMMM yyyy')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      <div className="absolute inset-x-0 bottom-0 top-1/2 overflow-hidden pointer-events-none">
         <div className={`absolute -bottom-16 -right-16 w-[140%] h-[120%] ${theme.bgHighlight} mix-blend-multiply sm:opacity-90 opacity-95 transform -rotate-3 md:-rotate-6 origin-bottom-right transition-colors duration-500`} />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

      <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-6 text-right z-20 max-w-[90%]">
         <h2 className={`font-playfair text-2xl md:text-3xl font-extrabold tracking-wide ${theme.color} drop-shadow-[0_2px_2px_rgba(0,0,0,1)] mb-[-4px]`}>
            {format(monthDate, 'yyyy')}
         </h2>
         <h2 className={`font-playfair text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black tracking-wider uppercase text-white drop-shadow-[0_4px_4px_rgba(0,0,0,1)]`}>
            {format(monthDate, 'MMMM')}
         </h2>
      </div>
    </div>
  );
}
