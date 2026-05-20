import { Suspense } from 'react'
import { defer, redirect } from '@remix-run/node'
import { useLoaderData, Await, useFetcher } from '@remix-run/react'
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { getCars, getCarStats, addCar, ComponentWrapper } from '@ssr-workshop/shared'
import type { Car } from '@ssr-workshop/shared'
import { CarTableClient } from '~/components/CarTableClient'
import { ServerFilteredTable } from '~/components/ServerFilteredTable'
import { AddCarModal } from '~/components/AddCarModal'

// ─── Loader ──────────────────────────────────────────────────────────────────
// defer() lets us return promises — Remix streams them via Suspense
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const searchParams = Object.fromEntries(url.searchParams)

  // Fast: resolved immediately — table renders with first HTML flush
  const cars = getCars()

  // Slow: returned as promise — streams in after 2s
  const statsPromise = new Promise<ReturnType<typeof getCarStats>>((resolve) =>
    setTimeout(() => resolve(getCarStats()), 2000),
  )

  // Medium: returned as promise — streams in after 0.5s
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

// ─── Action ──────────────────────────────────────────────────────────────────
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

  // Remix automatically re-runs the loader after an action — no manual revalidation needed!
  return redirect('/dynamic')
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function DynamicPage() {
  const { cars, statsPromise, quickStatsPromise, searchParams } = useLoaderData<typeof loader>()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dynamic Rendering</h1>
        <p className="mt-1 text-sm text-gray-500">
          Data fetched fresh on every request via Remix loader. Demonstrates deferred streaming,
          actions for mutations, and both client + server-side filtering.
        </p>
      </div>

      {/* Section 1: Streaming demo — deferred promises with Suspense */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700 border-b pb-1">
          📡 Streaming / Suspense (defer + Await)
          <span className="ml-2 text-xs font-normal text-gray-500">
            Reload the page — watch components appear progressively
          </span>
        </h2>

        {/* Quick stats — 0.5s */}
        <Suspense
          fallback={
            <div className="relative rounded-lg border-2 border-blue-300 border-dashed p-4 animate-pulse">
              <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-mono bg-blue-50 text-blue-400 border border-blue-200">
                🔵 SERVER — loading...
              </span>
              <div className="flex gap-6">
                {[1, 2, 3].map((i) => <div key={i} className="h-4 w-28 bg-blue-100 rounded" />)}
              </div>
            </div>
          }
        >
          <Await resolve={quickStatsPromise}>
            {(qs) => (
              <ComponentWrapper type="server" label="🔵 SERVER — Quick Stats (0.5s delay)">
                <div className="flex gap-6 text-sm">
                  <span><strong className="text-blue-700">{qs.total}</strong> cars in database</span>
                  <span><strong className="text-green-700">{qs.electric}</strong> electric ({Math.round((qs.electric / qs.total) * 100)}%)</span>
                  <span><strong className="text-purple-700">{qs.awd}</strong> AWD</span>
                </div>
              </ComponentWrapper>
            )}
          </Await>
        </Suspense>

        {/* Full stats — 2s */}
        <Suspense
          fallback={
            <div className="relative rounded-lg border-2 border-blue-300 border-dashed p-4 animate-pulse">
              <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-mono bg-blue-50 text-blue-400 border border-blue-200">
                🔵 SERVER — loading...
              </span>
              <div className="h-4 w-32 bg-blue-100 rounded mb-3" />
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="rounded-lg bg-blue-50 border border-blue-100 p-3">
                    <div className="h-6 w-12 bg-blue-100 rounded mx-auto mb-1" />
                    <div className="h-3 w-16 bg-blue-50 rounded mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <Await resolve={statsPromise}>
            {(stats) => (
              <ComponentWrapper type="server" label="🔵 SERVER — Stats (2s delay)">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Fleet Statistics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Total Cars', value: stats.total },
                    { label: 'Avg Range',  value: `${stats.avgRange} km` },
                    { label: 'Avg HP',     value: stats.avgHp },
                    { label: 'Categories', value: stats.categories },
                    { label: 'Makes',      value: stats.makes },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-center">
                      <div className="text-xl font-bold text-blue-700">{value}</div>
                      <div className="text-xs text-blue-600">{label}</div>
                    </div>
                  ))}
                </div>
              </ComponentWrapper>
            )}
          </Await>
        </Suspense>
      </section>

      {/* Section 2: Client-side filtering table */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700 border-b pb-1">
          🟠 Client-side Filtering + Action Mutations
        </h2>
        <ComponentWrapper type="server" label="🔵 SERVER — Data via Loader">
          <p className="text-xs text-blue-600 font-mono mb-3">
            ↳ Cars loaded in Remix loader, passed as props. Remix re-runs this loader
            automatically after any action — no manual revalidation needed!
          </p>
          <CarTableClient cars={cars as Car[]} />
        </ComponentWrapper>
      </section>

      {/* Section 3: Server-side filtering */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700 border-b pb-1">
          🔵 Server-side Filtering via URL Params
          <span className="ml-2 text-xs font-normal text-gray-500">
            Watch the URL bar update as you type
          </span>
        </h2>
        <ServerFilteredTable cars={cars as Car[]} searchParams={searchParams} />
      </section>
    </div>
  )
}
