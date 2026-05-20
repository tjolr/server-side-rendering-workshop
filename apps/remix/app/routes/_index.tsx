import { Link } from '@remix-run/react'
import { ComponentWrapper } from '@ssr-workshop/shared'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <ComponentWrapper type="server" label="🔵 SERVER — Home Page">
        <h1 className="text-3xl font-bold text-gray-900">SSR Workshop — Remix v2</h1>
        <p className="mt-2 text-gray-600">
          This demo showcases key Server-Side Rendering patterns in Remix v2 with loaders, actions,
          and deferred streaming.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/dynamic"
            className="block rounded-lg border-2 border-blue-200 bg-blue-50 p-5 hover:border-blue-400 hover:bg-blue-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-blue-800">🔄 Dynamic Page</h2>
            <p className="mt-1 text-sm text-blue-700">
              Remix loader + action + deferred streaming with Suspense.
              Both client and server-side filtering.
            </p>
          </Link>

          <Link
            to="/static"
            className="block rounded-lg border-2 border-green-200 bg-green-50 p-5 hover:border-green-400 hover:bg-green-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-green-800">📌 Static Page</h2>
            <p className="mt-1 text-sm text-green-700">
              Loader with long-lived cache headers. Add a car on the dynamic page,
              then come back here — you'll see the cached (stale) data.
            </p>
          </Link>
        </div>
      </ComponentWrapper>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-800">Legend</h2>
        <div className="mt-3 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 rounded border-2 border-blue-500 bg-blue-50" />
            <span className="text-sm text-gray-700">Server — data loaded in loader function, HTML on first response</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 rounded border-2 border-orange-500 bg-orange-50" />
            <span className="text-sm text-gray-700">Client — hydrated in browser, uses hooks/events</span>
          </div>
        </div>
      </div>
    </div>
  )
}
