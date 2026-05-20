'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'

interface ServerFilterControlsProps {
  searchParams: { make?: string; model?: string; category?: string; fuelType?: string; wheelDrive?: string }
}

// CLIENT component — only the input UI lives in the browser; filtering happens in ServerFilteredTable (SSR) on every URL change.
// useTransition keeps showing stale rows while the server re-renders, then swaps in fresh results.
export function ServerFilterControls({ searchParams }: ServerFilterControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search)
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      // startTransition makes the navigation interruptible — if the user types again before the response arrives, the previous request is abandoned.
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, pathname],
  )

  const inputStyle: React.CSSProperties = {
    height: '1.8rem',
    borderRadius: '0.3rem',
    border: '1px solid var(--server-border)',
    background: 'var(--bg)',
    color: 'var(--server-text)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    padding: '0 0.6rem',
    outline: 'none',
    width: '7rem',
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--server-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginRight: '0.25rem',
        }}
      >
        Filters:
      </span>
      {[
        { key: 'make', placeholder: 'Make...' },
        { key: 'model', placeholder: 'Model...' },
        { key: 'category', placeholder: 'Category...' },
        { key: 'fuelType', placeholder: 'Fuel...' },
        { key: 'wheelDrive', placeholder: 'Drive...' },
      ].map(({ key, placeholder }) => (
        <input
          key={key}
          style={inputStyle}
          placeholder={placeholder}
          defaultValue={searchParams[key as keyof typeof searchParams] ?? ''}
          onChange={(e) => updateParam(key, e.target.value)}
        />
      ))}
      {isPending && (
        <span
          className="animate-pulse"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--server-text)',
          }}
        >
          ↻ fetching...
        </span>
      )}
    </div>
  )
}
