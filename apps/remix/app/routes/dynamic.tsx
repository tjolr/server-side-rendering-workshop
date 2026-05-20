import { Suspense } from 'react'
import { defer, redirect } from '@remix-run/node'
import { useLoaderData, Await, useFetcher } from '@remix-run/react'
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { getCars, getCarStats, addCar, ComponentWrapper } from '@ssr-workshop/shared'
import type { Car } from '@ssr-workshop/shared'
import { CarTableClient } from '~/components/CarTableClient'
import { ServerFilteredTable } from '~/components/ServerFilteredTable'
import { AddCarModal } from '~/components/AddCarModal'
import routeSource from './dynamic.tsx?raw'

// ─── Loader (SSR) ────────────────────────────────────────────────────────────
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const searchParams = Object.fromEntries(url.searchParams)
  const cars = getCars()

  const statsPromise = new Promise<ReturnType<typeof getCarStats>>((resolve) =>
    setTimeout(() => resolve(getCarStats()), 2000),
  )

  const quickStatsPromise = new Promise<{ total: number; electric: number; awd: number }>((resolve) =>
    setTimeout(() => {
      const all = getCars()
      resolve({
        total: all.length,
        electric: all.filter((c) => c.fuelType === 'Electric').length,
        awd: all.filter((c) => c.wheelDrive === 'AWD').length,
      })
    }, 500),
  )

  return defer({ cars, statsPromise, quickStatsPromise, searchParams })
}

// ─── Action (SSR mutation) ────────────────────────────────────────────────────
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const car: Omit<Car, 'id'> = {
    make:            String(formData.get('make') || '').trim(),
    model:           String(formData.get('model') || '').trim(),
    year:            Number(formData.get('year')),
    category:        String(formData.get('category') || '') as Car['category'],
    horsepower:      Number(formData.get('horsepower')),
    fuelType:        String(formData.get('fuelType') || '') as Car['fuelType'],
    range:           Number(formData.get('range')),
    wheelDrive:      String(formData.get('wheelDrive') || '') as Car['wheelDrive'],
    baggageCapacity: Number(formData.get('baggageCapacity')),
  }

  addCar(car)
  return redirect('/dynamic')
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function DynamicPage() {
  const { cars, statsPromise, quickStatsPromise, searchParams } = useLoaderData<typeof loader>()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Page header */}
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '2rem',
            color: 'var(--text)',
            letterSpacing: 'normal',
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
          Data fetched fresh on every request via Remix loader — deferred streaming, actions, client + server filtering.
        </p>
      </div>

      {/* Section 1: Streaming */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <SectionHeading
          label="STREAMING / SUSPENSE (DEFER + AWAIT)"
          color="var(--server-text)"
          note="reload the page — watch components appear progressively"
        />

        {/* Quick stats — 0.5s */}
        <Suspense fallback={<ServerSkeleton rows={1} />}>
          <Await resolve={quickStatsPromise}>
            {(qs) => (
              <ComponentWrapper
                type="server"
                label="🔵 SERVER — Quick Stats (0.5s delay)"
                sourceCode={routeSource}
                componentName="dynamic.tsx (Remix loader)"
              >
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'baseline' }}>
                  <Stat value={qs.total} label="cars in database" valueColor="var(--server-text)" />
                  <Stat
                    value={`${qs.electric}`}
                    label={`electric (${Math.round((qs.electric / qs.total) * 100)}%)`}
                    valueColor="#16a34a"
                  />
                  <Stat value={qs.awd} label="AWD" valueColor="#9333ea" />
                </div>
              </ComponentWrapper>
            )}
          </Await>
        </Suspense>

        {/* Full stats — 2s */}
        <Suspense fallback={<ServerSkeleton rows={5} showGrid />}>
          <Await resolve={statsPromise}>
            {(stats) => (
              <ComponentWrapper
                type="server"
                label="🔵 SERVER — Stats (2s delay)"
                sourceCode={routeSource}
                componentName="dynamic.tsx (Remix loader)"
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
                    { label: 'Avg Range',  value: `${stats.avgRange} km` },
                    { label: 'Avg HP',     value: stats.avgHp },
                    { label: 'Categories', value: stats.categories },
                    { label: 'Makes',      value: stats.makes },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        padding: '0.75rem 0.625rem',
                        textAlign: 'center',
                        borderRadius: '0.375rem',
                        background: 'rgba(59,130,246,0.05)',
                        border: '1px solid rgba(59,130,246,0.15)',
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
            )}
          </Await>
        </Suspense>
      </section>

      {/* Section 2: Client-side filtering */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <SectionHeading label="CLIENT-SIDE FILTERING + SERVER ACTIONS" color="var(--client-text)" />
        <ComponentWrapper
          type="server"
          label="🔵 SERVER — Data Fetching Wrapper"
          sourceCode={routeSource}
          componentName="dynamic.tsx (Remix loader)"
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--server-muted)',
              marginBottom: '0.75rem',
            }}
          >
            ↳ Data fetched on the server. {(cars as Car[]).length} cars passed as props to the client table below. No API call from the browser — data arrives with the HTML.
          </p>
          <CarTableClient cars={cars as Car[]} />
        </ComponentWrapper>
      </section>

      {/* Section 3: Server-side filtering */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <SectionHeading
          label="SERVER-SIDE FILTERING VIA URL PARAMS"
          color="var(--server-text)"
          note="watch the URL update as you type"
        />
        <ServerFilteredTable cars={cars as Car[]} searchParams={searchParams} />
      </section>
    </div>
  )
}

// ─── Shared sub-components ────────────────────────────────────────────────────

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

function ServerSkeleton({ rows, showGrid }: { rows: number; showGrid?: boolean }) {
  return (
    <div
      className="animate-pulse"
      style={{
        position: 'relative',
        borderRadius: '0.5rem',
        border: '1px solid var(--server-border)',
        background: 'var(--server-bg)',
        padding: '1.25rem',
        paddingTop: '2.75rem',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          padding: '3px 10px',
          borderRadius: '9999px',
          background: 'rgba(59,130,246,0.07)',
          border: '1px solid var(--server-border)',
          color: 'var(--server-muted)',
        }}
      >
        🔵 SERVER — loading...
      </span>
      {showGrid ? (
        <>
          <div style={{ height: '0.65rem', width: '7rem', borderRadius: '0.25rem', background: 'rgba(59,130,246,0.15)', marginBottom: '0.875rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.625rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ borderRadius: '0.375rem', padding: '0.75rem', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
                <div style={{ height: '1.75rem', width: '2.5rem', borderRadius: '0.25rem', background: 'rgba(59,130,246,0.15)', margin: '0 auto 0.4rem' }} />
                <div style={{ height: '0.5rem', width: '3.5rem', borderRadius: '0.25rem', background: 'rgba(59,130,246,0.1)', margin: '0 auto' }} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ height: '1.2rem', width: '7rem', borderRadius: '0.25rem', background: 'rgba(59,130,246,0.15)' }} />
          ))}
        </div>
      )}
    </div>
  )
}
