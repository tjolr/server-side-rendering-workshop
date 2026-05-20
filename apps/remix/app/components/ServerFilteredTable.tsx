import { useNavigate, useLocation } from '@remix-run/react'
import { useTransition, useCallback } from 'react'
import { ComponentWrapper } from '@ssr-workshop/shared'
import type { Car } from '@ssr-workshop/shared'
import sourceCode from './ServerFilteredTable.tsx?raw'

interface ServerFilteredTableProps {
  cars: Car[]
  searchParams: Record<string, string>
}

export function ServerFilteredTable({ cars, searchParams }: ServerFilteredTableProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isPending, startTransition] = useTransition()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(location.search)
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        navigate(`${location.pathname}?${params.toString()}`, { replace: true })
      })
    },
    [navigate, location],
  )

  const headers = ['Make', 'Model', 'Year', 'Category', 'Fuel', 'Drive', 'HP', 'Range (km)', 'Baggage (L)']

  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — URL-param Filtering"
      sourceCode={sourceCode}
      componentName="ServerFilteredTable.tsx (Remix)"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--server-muted)' }}>
          ↳ Each filter change updates the URL → Remix re-runs the loader → server filters the data.
        </p>

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
              style={{
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
              }}
              placeholder={placeholder}
              defaultValue={searchParams[key] ?? ''}
              onChange={(e) => updateParam(key, e.target.value)}
            />
          ))}
          {isPending && (
            <span
              className="animate-pulse"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--server-text)' }}
            >
              ↻ fetching...
            </span>
          )}
        </div>

        <div style={{ overflowX: 'auto', borderRadius: '0.375rem', border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
                {headers.map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.5rem 0.75rem',
                      textAlign: 'left',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      color: 'var(--server-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      padding: '2.5rem',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    No cars match your server-side filters
                  </td>
                </tr>
              ) : (
                cars.map((car, i) => (
                  <tr
                    key={car.id}
                    style={{
                      background: i % 2 === 0 ? 'var(--bg)' : 'var(--surface)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {[car.make, car.model, car.year, car.category, car.fuelType, car.wheelDrive, car.horsepower, car.range, car.baggageCapacity].map((val, j) => (
                      <td
                        key={j}
                        style={{
                          padding: '0.45rem 0.75rem',
                          whiteSpace: 'nowrap',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          color: 'var(--text)',
                        }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          {cars.length} cars (filtered server-side in loader)
        </p>
      </div>
    </ComponentWrapper>
  )
}
