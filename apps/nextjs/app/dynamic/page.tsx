import { Suspense } from 'react'
import { CarTableServer } from './CarTableServer'
import { StatsWidget, StatsWidgetSkeleton } from './StatsWidget'
import { CarCountWidget, CarCountWidgetSkeleton } from './CarCountWidget'
import { ServerFilteredTable } from './ServerFilteredTable'

interface DynamicPageProps {
  searchParams: Promise<{
    make?: string
    model?: string
    category?: string
    fuelType?: string
    wheelDrive?: string
  }>
}

// SERVER COMPONENT (async) — runs on the server on every request, never ships JS to the browser.
// searchParams is a Promise in Next.js 15 — must be awaited before reading filter values.
// Child Server Components (CarCountWidget, StatsWidget, ServerFilteredTable) stream in progressively via Suspense.
export default async function DynamicPage({ searchParams }: DynamicPageProps) {
  const params = await searchParams

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Page header */}
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '2rem',
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Dynamic Rendering
        </h1>
        <p
          style={{
            marginTop: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.01em',
          }}
        >
          Data fetched fresh on every request — streaming, server actions, client + server filtering.
        </p>
      </div>

      {/* Streaming: each async Server Component is wrapped in <Suspense> — Next.js streams their HTML to the browser as they resolve, without blocking the initial response. */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <SectionHeading
          label="STREAMING / SUSPENSE"
          color="var(--server-text)"
          note="reload the page — watch components appear progressively"
        />
        <Suspense fallback={<CarCountWidgetSkeleton />}>
          <CarCountWidget />
        </Suspense>
        <Suspense fallback={<StatsWidgetSkeleton />}>
          <StatsWidget />
        </Suspense>
      </section>

      {/* Hybrid: CarTableServer (SSR) fetches data and passes it to CarTableClient (CSR) for in-browser filtering. */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <SectionHeading
          label="CLIENT-SIDE FILTERING + SERVER ACTIONS"
          color="var(--client-text)"
        />
        <Suspense
          fallback={
            <div
              className="animate-pulse rounded-lg"
              style={{ height: '8rem', background: 'var(--surface)' }}
            />
          }
        >
          <CarTableServer />
        </Suspense>
      </section>

      {/* SSR filtering: URL params flow from browser → server re-render → filtered rows returned — no client-side filter logic needed. */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <SectionHeading
          label="SERVER-SIDE FILTERING VIA URL PARAMS"
          color="var(--server-text)"
          note="watch the URL update as you type"
        />
        <Suspense
          fallback={
            <div
              className="animate-pulse rounded-lg"
              style={{ height: '8rem', background: 'var(--surface)' }}
            />
          }
        >
          <ServerFilteredTable searchParams={params} />
        </Suspense>
      </section>
    </div>
  )
}

function SectionHeading({
  label,
  color,
  note,
}: {
  label: string
  color: string
  note?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.75rem',
        paddingBottom: '0.625rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          fontSize: '0.68rem',
          color,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {label}
      </h2>
      {note && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
          }}
        >
          — {note}
        </span>
      )}
    </div>
  )
}
