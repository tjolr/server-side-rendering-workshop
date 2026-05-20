import { getCars } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'
import { ServerFilterControls } from './ServerFilterControls'
import { readFileSync } from 'fs'
import path from 'path'

interface ServerFilteredTableProps {
  searchParams: { make?: string; model?: string; category?: string; fuelType?: string; wheelDrive?: string }
}

// SERVER COMPONENT — filtering runs on the server by reading URL search params; the `cars` prop is pre-filtered before any HTML is sent.
// vs CarTableClient: SSR filter scales to any dataset size; CSR filter requires all rows to be loaded in the browser first.
export async function ServerFilteredTable({ searchParams }: ServerFilteredTableProps) {
  await new Promise((r) => setTimeout(r, 300))

  const allCars = getCars()
  const filtered = allCars.filter((car) => {
    if (searchParams.make && !car.make.toLowerCase().includes(searchParams.make.toLowerCase())) return false
    if (searchParams.model && !car.model.toLowerCase().includes(searchParams.model.toLowerCase())) return false
    if (searchParams.category && car.category !== searchParams.category) return false
    if (searchParams.fuelType && car.fuelType !== searchParams.fuelType) return false
    if (searchParams.wheelDrive && car.wheelDrive !== searchParams.wheelDrive) return false
    return true
  })

  const sourceCode = readFileSync(path.join(process.cwd(), 'app/dynamic/ServerFilteredTable.tsx'), 'utf-8')

  const headers = ['Make', 'Model', 'Year', 'Category', 'Fuel', 'Drive', 'HP', 'Range (km)', 'Baggage (L)']

  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — URL-param Filtering"
      sourceCode={sourceCode}
      componentName="ServerFilteredTable.tsx"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--server-muted)',
          }}
        >
          ↳ Each filter change updates the URL → triggers server re-render → server filters the data.
        </p>

        <ServerFilterControls searchParams={searchParams} />

        <div
          style={{
            overflowX: 'auto',
            borderRadius: '0.375rem',
            border: '1px solid var(--border)',
          }}
        >
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
              {filtered.length === 0 ? (
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
                filtered.map((car, i) => (
                  <tr
                    key={car.id}
                    style={{
                      background: i % 2 === 0 ? 'var(--bg)' : 'var(--surface)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {[
                      car.make,
                      car.model,
                      car.year,
                      car.category,
                      car.fuelType,
                      car.wheelDrive,
                      car.horsepower,
                      car.range,
                      car.baggageCapacity,
                    ].map((val, j) => (
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

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
          }}
        >
          {filtered.length} of {allCars.length} cars (filtered server-side)
        </p>
      </div>
    </ComponentWrapper>
  )
}
