export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type Holiday = {
  date: Date;
  name: string;
};

export const MONTH_THEMES: Record<number, { color: string; bg: string; bgHighlight: string; bgHover: string }> = {
  0: { color: 'text-blue-600', bg: 'bg-blue-600', bgHighlight: 'bg-blue-100', bgHover: 'hover:bg-blue-50' },
  1: { color: 'text-rose-600', bg: 'bg-rose-600', bgHighlight: 'bg-rose-100', bgHover: 'hover:bg-rose-50' },
  2: { color: 'text-green-600', bg: 'bg-green-600', bgHighlight: 'bg-green-100', bgHover: 'hover:bg-green-50' },
  3: { color: 'text-purple-600', bg: 'bg-purple-600', bgHighlight: 'bg-purple-100', bgHover: 'hover:bg-purple-50' },
  4: { color: 'text-orange-600', bg: 'bg-orange-600', bgHighlight: 'bg-orange-100', bgHover: 'hover:bg-orange-50' },
  5: { color: 'text-teal-600', bg: 'bg-teal-600', bgHighlight: 'bg-teal-100', bgHover: 'hover:bg-teal-50' },
  6: { color: 'text-indigo-600', bg: 'bg-indigo-600', bgHighlight: 'bg-indigo-100', bgHover: 'hover:bg-indigo-50' },
  7: { color: 'text-amber-600', bg: 'bg-amber-600', bgHighlight: 'bg-amber-100', bgHover: 'hover:bg-amber-50' },
  8: { color: 'text-red-600', bg: 'bg-red-600', bgHighlight: 'bg-red-100', bgHover: 'hover:bg-red-50' },
  9: { color: 'text-amber-700', bg: 'bg-amber-700', bgHighlight: 'bg-amber-100', bgHover: 'hover:bg-amber-50' },
  10: { color: 'text-slate-600', bg: 'bg-slate-600', bgHighlight: 'bg-slate-200', bgHover: 'hover:bg-slate-100' },
  11: { color: 'text-rose-700', bg: 'bg-rose-700', bgHighlight: 'bg-rose-100', bgHover: 'hover:bg-rose-50' }
};
