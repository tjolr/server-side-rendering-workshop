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

export default async function DynamicPage({ searchParams }: DynamicPageProps) {
  const params = await searchParams

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dynamic Rendering</h1>
        <p className="mt-1 text-sm text-gray-500">
          All data fetched fresh on every request. Demonstrates streaming, server actions, and both
          client + server-side filtering.
        </p>
      </div>

      {/* Section 1: Streaming demo — two server components with different delays */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700 border-b pb-1">
          📡 Streaming / Suspense
          <span className="ml-2 text-xs font-normal text-gray-500">
            Reload the page — watch components appear progressively
          </span>
        </h2>
        <Suspense fallback={<CarCountWidgetSkeleton />}>
          <CarCountWidget />
        </Suspense>
        <Suspense fallback={<StatsWidgetSkeleton />}>
          <StatsWidget />
        </Suspense>
      </section>

      {/* Section 2: Server data fetch → client table with client-side filtering */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700 border-b pb-1">
          🟠 Client-side Filtering + Server Actions
        </h2>
        <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-100" />}>
          <CarTableServer />
        </Suspense>
      </section>

      {/* Section 3: Server-side filtering via URL search params */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-700 border-b pb-1">
          🔵 Server-side Filtering via URL Params
          <span className="ml-2 text-xs font-normal text-gray-500">
            Watch the URL bar update as you type
          </span>
        </h2>
        <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-blue-50" />}>
          <ServerFilteredTable searchParams={params} />
        </Suspense>
      </section>
    </div>
  )
}
