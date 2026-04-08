# Interactive Wall Calendar

A production-grade, interactive Wall Calendar React component built with Next.js 14, Framer Motion, and date-fns. 

<img width="1893" height="928" alt="image" src="https://github.com/user-attachments/assets/a8d576c3-6bb5-42c2-93da-37869fdd9476" />


## Features

*   **Physical Wall Calendar Aesthetic**: Features a tactile mock spiral binding, drop shadows, and an authentic "wall-mounted" design.
*   **Dynamic Theming**: Each month applies its own accent color and fetching a uniquely themed Unsplash hero image.
*   **Date Range Selection**: Interactive date span highlight and selection, fully supporting previews across multiple weeks.
*   **Persistent Month-specific Notes**: Realistic notebook interface. Utilizes debounced local storage persistence keyed precisely by the month.
*   **Holidays & Statistics**: Highlights major Indian public holidays with tooltips, and generates interactive bottom-bar stats out of the selected block.
*   **Smooth Animations**: Uses `framer-motion` for date scaling, image cross-fading, sliding month-grids mimicking page turns, and swipe-navigation gestures on mobile.
*   **Responsive**: Splits flawlessly to dual-pane on Desktop (≥768px) and stacks elegantly on Mobile.

## Tech Stack

*   **Next.js 14 (App Router)**
*   **TypeScript** (Strict Type Safety)
*   **Tailwind CSS** (Raw utilities)
*   **Framer Motion** (Animations)
*   **date-fns** (Date manipulation math)

## Getting Started

### Prerequisites
*   Node.js 18+ and npm

### Installation
1.  Clone this repository or securely extract the workspace.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```text
src/
├── app/
│   ├── globals.css         # Global tailwind imports, fonts, print styles
│   ├── layout.tsx          # Next.js app scaffold with DM Sans & Playfair generic styles
│   └── page.tsx            # Full viewport centered wrap for CalendarRoot
├── components/Calendar/
│   ├── CalendarRoot.tsx    # Parent aggregator, holds primary states
│   ├── CalendarHero.tsx    # Left panel visual (Image, Title overlay, crossfade)
│   ├── CalendarNav.tsx     # Prev/Next/Today UI interaction layer
│   ├── CalendarGrid.tsx    # AnimatePresence orchestrator for swipe & matrix display 
│   ├── CalendarDayCell.tsx # Core date cell interactions (Hover preview, highlights, holidays)
│   ├── CalendarStats.tsx   # Informative dynamic bottom bar
│   ├── CalendarNotes.tsx   # React memoized line-paper notes layer
│   └── CalendarSpiral.tsx  # Pure CSS tactile spiral rendering layout overlay
├── hooks/
│   ├── useCalendar.ts      # Core date/time cursor logic handling
│   └── useNotes.ts         # Secure, debounced localStorage access
├── types/
│   └── calendar.ts         # Primary strictly typed data interfaces
└── utils/
    ├── cn.ts               # tailwind-merge caching helper utility
    └── holidays.ts         # Static logic repository for standard holidays mapped
```

## Design Decisions

*   **Why `date-fns` over `dayjs`?** `date-fns` integrates well with standard Native `Date` objects returning immutable dates. Its functional design permits excellent Next.js tree-shaking keeping bundles minimal.
*   **No Component Library**: A pure Tailwind CSS approach maintains complete structural creative freedom making the "physical" look vastly easier, instead of dismantling MUI/shadcn standard borders.
*   **LocalStorage Schema**: Storing text locally as `calendar_note_YYYY_MM` prevents single large JSON blobs and directly isolates I/O load per the user's specific context, preventing read/write corruption.
*   **Framer Motion integration**: Used strictly on isolated inner trees (image node, and grid wrapper) utilizing AnimatePresence to ensure layout jank is prevented during Next.js rehydrations.

## Known Limitations

*   **LocalStorage Limits**: Since data is solely managed in client-side arrays, scaling cross-browser or syncing needs external backends. 
*   **Image rate-limiting**: Relies on Unsplash anonymous API URLs which might throttle excessive fetching if refreshed aggressively. 
*   **Browser Clock Dependency**: Computations fallback to device locale which dictates `startOfToday()`.

## License
MIT
