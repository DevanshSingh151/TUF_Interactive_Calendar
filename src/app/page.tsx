import { CalendarRoot } from '@/components/Calendar/CalendarRoot';

export default function Home() {
  return (
    <main className="min-h-screen py-8 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col items-center pt-8 pb-32">
       <div className="w-full max-w-5xl mb-8 text-center md:text-left no-print">
          <h1 className="font-playfair text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent tracking-wide">
            Interactive Wall Calendar
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-2 opacity-80 uppercase tracking-widest hidden sm:block">Plan & Achieve</p>
       </div>
      <CalendarRoot />
    </main>
  );
}
