import { useNavigate, useLocation } from '@remix-run/react'
import { useTransition, useCallback } from 'react'
import { ComponentWrapper } from '@ssr-workshop/shared'
import type { Car } from '@ssr-workshop/shared'

interface ServerFilteredTableProps {
  cars: Car[]
  searchParams: Record<string, string>
}

// In Remix, "server-side filtering" = the loader already filtered the data.
// The filter inputs here update the URL, which triggers a loader re-run.
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

  return (
    <ComponentWrapper type="server" label="🔵 SERVER — URL-param Filtering">
      <div className="space-y-3">
        <p className="text-xs text-blue-600 font-mono">
          ↳ Each filter change updates the URL → Remix re-runs the loader → server filters the data.
          Check the URL bar as you type!
        </p>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono text-blue-700 font-semibold">Filters (server-side):</span>
          {[
            { key: 'make', placeholder: 'Make...' },
            { key: 'model', placeholder: 'Model...' },
            { key: 'category', placeholder: 'Category...' },
            { key: 'fuelType', placeholder: 'Fuel...' },
            { key: 'wheelDrive', placeholder: 'Drive...' },
          ].map(({ key, placeholder }) => (
            <input
              key={key}
              className="h-7 rounded border border-blue-300 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder={placeholder}
              defaultValue={searchParams[key] ?? ''}
              onChange={(e) => updateParam(key, e.target.value)}
            />
          ))}
          {isPending && (
            <span className="text-xs text-blue-500 font-mono animate-pulse">↻ fetching...</span>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-blue-50">
              <tr>
                {['Make', 'Model', 'Year', 'Category', 'Fuel', 'Drive', 'HP', 'Range (km)', 'Baggage (L)'].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-blue-800 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500">
                    No cars match your server-side filters
                  </td>
                </tr>
              ) : (
                cars.map((car, i) => (
                  <tr key={car.id} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50/40'}>
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
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500">
          {cars.length} cars (filtered server-side in loader)
        </p>
      </div>
    </ComponentWrapper>
  )
}
