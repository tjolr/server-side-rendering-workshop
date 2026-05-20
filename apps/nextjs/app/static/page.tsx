import Link from 'next/link'
import { getCars } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'

// Force static rendering — this page is rendered once at build time
export const dynamic = 'force-static'

// Snapshot at module load time — simulates build-time data capture.
// In production this is locked at `next build`. In dev we fake it here
// so the contrast with /dynamic is visible without needing a full build.
const staticCars = getCars()

export default function StaticPage() {
  const cars = staticCars

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-green-50 border-2 border-green-400 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📌</span>
          <h1 className="text-xl font-bold text-green-800">Static Rendering</h1>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-mono text-green-700 border border-green-300">
            force-static
          </span>
        </div>
        <p className="text-sm text-green-700">
          This page is rendered <strong>once at build time</strong> and served as static HTML.
          No server-side rendering on each request.
        </p>
        <p className="mt-2 text-sm text-green-700">
          👉 Go to <Link href="/dynamic" className="underline font-medium">the dynamic page</Link>,
          add a car, then come back here. This page will <strong>not</strong> show the new car!
        </p>
        <p className="mt-2 text-xs text-green-600 bg-green-100 rounded px-2 py-1 font-mono">
          ℹ In dev mode, data is snapshotted at server startup to simulate build-time.
          In production (<code>next build && next start</code>), Next.js locks this at actual build time.
        </p>
      </div>

      <ComponentWrapper type="server" label="🔵 SERVER — Rendered at Build Time">
        <div className="space-y-3">
          <p className="text-xs text-green-700 font-mono">
            ↳ Showing {cars.length} cars — captured at build time. New cars added at runtime won&apos;t appear here.
          </p>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-green-50">
                <tr>
                  {['Make', 'Model', 'Year', 'Category', 'Fuel', 'Drive', 'HP', 'Range (km)', 'Baggage (L)'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-green-800 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cars.map((car, i) => (
                  <tr key={car.id} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50/30'}>
                    <td className="px-3 py-2 whitespace-nowrap">{car.make}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{car.model}</td>
                    <td className="px-3 py-2">{car.year}</td>
                    <td className="px-3 py-2">{car.category}</td>
                    <td className="px-3 py-2">{car.fuelType}</td>
                    <td className="px-3 py-2">{car.wheelDrive}</td>
                    <td className="px-3 py-2">{car.horsepower}</td>
                    <td className="px-3 py-2">{car.range}</td>
                    <td className="px-3 py-2">{car.baggageCapacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ComponentWrapper>
    </div>
  )
}
