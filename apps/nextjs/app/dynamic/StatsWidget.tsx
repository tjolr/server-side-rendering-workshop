import { getCarStats } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'
import { readFileSync } from 'fs'
import path from 'path'

// Server Component with artificial 2s delay — used to demo Suspense streaming
export async function StatsWidget() {
  // 🐢 Artificial delay to demonstrate streaming/Suspense
  await new Promise((r) => setTimeout(r, 2000))

  const stats = getCarStats()
  const sourceCode = readFileSync(path.join(process.cwd(), 'app/dynamic/StatsWidget.tsx'), 'utf-8')

  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — Stats (2s delay)"
      sourceCode={sourceCode}
      componentName="StatsWidget.tsx"
    >
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Fleet Statistics</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Cars',   value: stats.total },
          { label: 'Avg Range',    value: `${stats.avgRange} km` },
          { label: 'Avg HP',       value: stats.avgHp },
          { label: 'Categories',   value: stats.categories },
          { label: 'Makes',        value: stats.makes },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-center">
            <div className="text-xl font-bold text-blue-700">{value}</div>
            <div className="text-xs text-blue-600">{label}</div>
          </div>
        ))}
      </div>
    </ComponentWrapper>
  )
}

export function StatsWidgetSkeleton() {
  return (
    <div className="relative rounded-lg border-2 border-blue-300 border-dashed p-4 animate-pulse">
      <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-mono bg-blue-50 text-blue-400 border border-blue-200">
        🔵 SERVER — loading...
      </span>
      <div className="h-4 w-32 bg-blue-100 rounded mb-3" />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-blue-50 border border-blue-100 p-3">
            <div className="h-6 w-12 bg-blue-100 rounded mx-auto mb-1" />
            <div className="h-3 w-16 bg-blue-50 rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
