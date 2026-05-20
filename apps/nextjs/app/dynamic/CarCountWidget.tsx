import { getCars } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'

// Server Component with 0.5s delay — loads before StatsWidget, shows progressive streaming
export async function CarCountWidget() {
  // Short delay — loads first, reveals progressively before StatsWidget
  await new Promise((r) => setTimeout(r, 500))

  const cars = getCars()
  const electricCount = cars.filter((c) => c.fuelType === 'Electric').length
  const awdCount = cars.filter((c) => c.wheelDrive === 'AWD').length

  return (
    <ComponentWrapper type="server" label="🔵 SERVER — Quick Stats (0.5s delay)">
      <div className="flex gap-6 text-sm">
        <span>
          <strong className="text-blue-700">{cars.length}</strong> cars in database
        </span>
        <span>
          <strong className="text-green-700">{electricCount}</strong> electric (
          {Math.round((electricCount / cars.length) * 100)}%)
        </span>
        <span>
          <strong className="text-purple-700">{awdCount}</strong> AWD
        </span>
      </div>
    </ComponentWrapper>
  )
}

export function CarCountWidgetSkeleton() {
  return (
    <div className="relative rounded-lg border-2 border-blue-300 border-dashed p-4 animate-pulse">
      <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-mono bg-blue-50 text-blue-400 border border-blue-200">
        🔵 SERVER — loading...
      </span>
      <div className="flex gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-4 w-28 bg-blue-100 rounded" />
        ))}
      </div>
    </div>
  )
}
