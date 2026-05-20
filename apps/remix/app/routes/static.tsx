import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { getCars, ComponentWrapper } from '@ssr-workshop/shared'
import type { Car } from '@ssr-workshop/shared'

// Static-like: long cache headers tell CDN/browser to cache for 1 hour
// In Remix, "static" means aggressive HTTP caching rather than build-time rendering
export async function loader() {
  const cars = getCars()
  return json(
    { cars, cachedAt: new Date().toISOString() },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    },
  )
}

export default function StaticPage() {
  const { cars, cachedAt } = useLoaderData<typeof loader>()

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-green-50 border-2 border-green-400 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📌</span>
          <h1 className="text-xl font-bold text-green-800">Static-like Rendering</h1>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-mono text-green-700 border border-green-300">
            Cache-Control: max-age=3600
          </span>
        </div>
        <p className="text-sm text-green-700">
          In Remix, &quot;static&quot; rendering is achieved via <strong>HTTP cache headers</strong>.
          This response is cached for 1 hour by the browser and any CDN in between.
        </p>
        <p className="mt-2 text-sm text-green-700">
          Page rendered at: <code className="font-mono text-xs bg-green-100 px-1 rounded">{cachedAt}</code>
        </p>
        <p className="mt-2 text-sm text-green-700">
          👉 Go to <Link to="/dynamic" className="underline font-medium">the dynamic page</Link>,
          add a car, then hard-refresh this page (Ctrl+Shift+R / Cmd+Shift+R).
          The timestamp above will stay the same — you&apos;re seeing the cached response!
        </p>
      </div>

      <ComponentWrapper type="server" label="🔵 SERVER — Cached Response">
        <div className="space-y-3">
          <p className="text-xs text-green-700 font-mono">
            ↳ Showing {cars.length} cars from cached loader response. New cars won&apos;t appear until cache expires.
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
                {(cars as Car[]).map((car, i) => (
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
