import { getCars } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'
import { ServerFilterControls } from './ServerFilterControls'
import { readFileSync } from 'fs'
import path from 'path'

interface ServerFilteredTableProps {
  searchParams: { make?: string; model?: string; category?: string; fuelType?: string; wheelDrive?: string }
}

// Server Component — filtering happens on the server by reading URL search params
export async function ServerFilteredTable({ searchParams }: ServerFilteredTableProps) {
  // Simulate slight server processing time
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

  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — URL-param Filtering"
      sourceCode={sourceCode}
      componentName="ServerFilteredTable.tsx"
    >
      <div className="space-y-3">
        <p className="text-xs text-blue-600 font-mono">
          ↳ Each filter change updates the URL → triggers server re-render → server filters the data.
          Check the URL bar as you type!
        </p>

        {/* Client component for the filter inputs — updates URL search params */}
        <ServerFilterControls searchParams={searchParams} />

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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500">
                    No cars match your server-side filters
                  </td>
                </tr>
              ) : (
                filtered.map((car, i) => (
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
          {filtered.length} of {allCars.length} cars (filtered server-side)
        </p>
      </div>
    </ComponentWrapper>
  )
}
