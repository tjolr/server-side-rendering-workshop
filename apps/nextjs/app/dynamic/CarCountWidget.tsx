import { getCars } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'
import { readFileSync } from 'fs'
import path from 'path'

// SERVER COMPONENT (async) — Next.js streams this to the browser as soon as the await resolves, without blocking other Suspense boundaries.
// The 0.5s delay simulates a slow data source; in production this would be a real DB/API call.
export async function CarCountWidget() {
  // Simulated slow fetch — in a real app, replace with an async DB/API call.
  await new Promise((r) => setTimeout(r, 500))

  const cars = getCars()
  const electricCount = cars.filter((c) => c.fuelType === 'Electric').length
  const awdCount = cars.filter((c) => c.wheelDrive === 'AWD').length
  const sourceCode = readFileSync(path.join(process.cwd(), 'app/dynamic/CarCountWidget.tsx'), 'utf-8')

  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — Quick Stats (0.5s delay)"
      sourceCode={sourceCode}
      componentName="CarCountWidget.tsx"
    >
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'baseline' }}>
        <Stat
          value={cars.length}
          label="cars in database"
          valueColor="var(--server-text)"
        />
        <Stat
          value={`${electricCount}`}
          label={`electric (${Math.round((electricCount / cars.length) * 100)}%)`}
          valueColor="#4ade80"
        />
        <Stat
          value={awdCount}
          label="AWD"
          valueColor="#c084fc"
        />
      </div>
    </ComponentWrapper>
  )
}

function Stat({
  value,
  label,
  valueColor,
}: {
  value: string | number
  label: string
  valueColor: string
}) {
  return (
    <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <strong
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.2rem',
          fontWeight: 600,
          color: valueColor,
          lineHeight: 1,
        }}
      >
        {value}
      </strong>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </span>
    </span>
  )
}

export function CarCountWidgetSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{
        position: 'relative',
        borderRadius: '0.5rem',
        border: '1px solid var(--server-border, #1a4f9e)',
        background: 'var(--server-bg, rgba(4,14,31,0.6))',
        padding: '1.25rem',
        paddingTop: '2.75rem',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.65rem',
          padding: '3px 10px',
          borderRadius: '9999px',
          background: 'rgba(91,163,245,0.07)',
          border: '1px solid var(--server-border, #1a4f9e)',
          color: 'var(--server-muted, #2a5080)',
        }}
      >
        🔵 SERVER — loading...
      </span>
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: '1.2rem',
              width: '7rem',
              borderRadius: '0.25rem',
              background: 'rgba(91,163,245,0.1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
