import { useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';

export type Sticker = 'none' | '⭐' | '🎯' | '☕' | '✅' | '🔥';
export const STICKER_LIST: Sticker[] = ['none', '⭐', '🎯', '☕', '✅', '🔥'];

export function useStickers() {
  const [stickers, setStickers] = useState<Record<string, Sticker>>({});

  useEffect(() => {
    const saved = localStorage.getItem('calendar_stickers');
    if (saved) {
      try {
        setStickers(JSON.parse(saved));
      } catch {
        
      }
    }
  }, []);

  const cycleSticker = useCallback((date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    setStickers((prev) => {
      const current = prev[key] || 'none';
      const currentIndex = STICKER_LIST.indexOf(current);
      const nextIndex = (currentIndex + 1) % STICKER_LIST.length;
      const nextSticker = STICKER_LIST[nextIndex];

      const newStickers = { ...prev };

      if (nextSticker === 'none') {
        delete newStickers[key];
      } else {
        newStickers[key] = nextSticker;
      }

      localStorage.setItem('calendar_stickers', JSON.stringify(newStickers));
      return newStickers;
    });
  }, []);

  return { stickers, cycleSticker };
}
