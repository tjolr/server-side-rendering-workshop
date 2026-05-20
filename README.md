# SSR Workshop Demo

Monorepo showcasing Server-Side Rendering patterns with **Next.js 16** (App Router) and **Remix v2**.

## Quick Start

```bash
pnpm install

# Run both apps concurrently
pnpm dev

# Or run individually
pnpm dev:nextjs   # http://localhost:3500
pnpm dev:remix    # http://localhost:3600
```

## What's demonstrated

| Pattern | Next.js | Remix |
|---|---|---|
| Route-level data loading | Server Components | `loader()` |
| Streaming / Suspense | `<Suspense>` + async RSC | `defer()` + `<Await>` |
| Server mutations | Server Actions (`'use server'`) | `action()` + `useFetcher` |
| Static rendering | `export const dynamic = 'force-static'` | `Cache-Control: max-age=3600` |
| Client-side filtering | TanStack Table (client component) | TanStack Table (client component) |
| Server-side filtering | URL search params → RSC re-render | URL search params → loader re-run |

## Visual Legend

| Border | Badge | Meaning |
|---|---|---|
| 🔵 Blue | `🔵 SERVER` | Renders on the server — no JS sent to client |
| 🟠 Orange | `🟠 CLIENT` | Hydrated in browser — can use hooks/events |

## Structure

```
apps/
  nextjs/   Next.js 16 App Router — http://localhost:3500
  remix/    Remix v2             — http://localhost:3600
packages/
  shared/   Types, seed data (15 Norway 2025 EVs), TanStack Table columns, UI components
```

## Demo script (workshop presenter)

1. Open both apps side-by-side
2. **Streaming**: Reload `/dynamic` — watch CarCountWidget appear at 0.5s, StatsWidget at 2s
3. **Client filtering**: Type in the global search box — instant, no network tab activity
4. **Server filtering**: Type in the server-side filter inputs — watch URL update, see "fetching..." indicator
5. **Server mutation**: Click "+ Add Car", fill the form, submit. Table updates immediately.
6. **Static contrast**: Navigate to `/static` — the newly added car is NOT shown
7. **Compare frameworks**: Show how Next.js uses `revalidatePath()` while Remix auto-revalidates after action

## Data

15 top-selling Norwegian cars from 2025 (96% EV market). Fields: make, model, year, category, horsepower, fuel type, range (km WLTP), wheel drive, baggage capacity (L).
