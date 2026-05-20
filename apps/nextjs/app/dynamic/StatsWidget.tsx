import { getCarStats } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'
import { readFileSync } from 'fs'
import path from 'path'

// SERVER COMPONENT (async) — streams independently of CarCountWidget; both run in parallel on the server, not sequentially.
// The 2s delay simulates an expensive aggregation query; CarCountWidget (0.5s) appears first while this is still pending.
export async function StatsWidget() {
  // Simulated slow aggregation — in a real app this might be a GROUP BY query or external analytics API.
  await new Promise((r) => setTimeout(r, 2000))

  const stats = getCarStats()
  const sourceCode = readFileSync(path.join(process.cwd(), 'app/dynamic/StatsWidget.tsx'), 'utf-8')

  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — Stats (2s delay)"
      sourceCode={sourceCode}
      componentName="StatsWidget.tsx"
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--server-muted)',
          marginBottom: '0.875rem',
        }}
      >
        Fleet Statistics
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.625rem' }}>
        {[
          { label: 'Total Cars', value: stats.total },
          { label: 'Avg Range', value: `${stats.avgRange} km` },
          { label: 'Avg HP', value: stats.avgHp },
          { label: 'Categories', value: stats.categories },
          { label: 'Makes', value: stats.makes },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              padding: '0.75rem 0.625rem',
              textAlign: 'center',
              borderRadius: '0.375rem',
              background: 'rgba(91, 163, 245, 0.05)',
              border: '1px solid rgba(91, 163, 245, 0.12)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--server-text)',
                lineHeight: 1.1,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--server-muted)',
                marginTop: '0.3rem',
                letterSpacing: '0.04em',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </ComponentWrapper>
  )
}

export function StatsWidgetSkeleton() {
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
      <div
        style={{
          height: '0.65rem',
          width: '7rem',
          borderRadius: '0.25rem',
          background: 'rgba(91,163,245,0.1)',
          marginBottom: '0.875rem',
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.625rem' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: '0.375rem',
              padding: '0.75rem 0.625rem',
              background: 'rgba(91,163,245,0.04)',
              border: '1px solid rgba(91,163,245,0.08)',
            }}
          >
            <div
              style={{
                height: '1.75rem',
                width: '2.5rem',
                borderRadius: '0.25rem',
                background: 'rgba(91,163,245,0.1)',
                margin: '0 auto 0.4rem',
              }}
            />
            <div
              style={{
                height: '0.5rem',
                width: '3.5rem',
                borderRadius: '0.25rem',
                background: 'rgba(91,163,245,0.06)',
                margin: '0 auto',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
