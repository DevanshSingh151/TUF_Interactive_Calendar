import { Holiday } from '../types/calendar';

export function getHolidays(year: number): Holiday[] {
  return [
    { date: new Date(year, 0, 26), name: "Republic Day" },
    { date: new Date(year, 2, 14), name: "Holi" },
    { date: new Date(year, 7, 15), name: "Independence Day" },
    { date: new Date(year, 9, 2), name: "Gandhi Jayanti" },
    { date: new Date(year, 9, 20), name: "Diwali" },
    { date: new Date(year, 11, 25), name: "Christmas" }
  ];
}
