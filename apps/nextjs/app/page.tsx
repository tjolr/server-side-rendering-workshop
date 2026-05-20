import Link from 'next/link'
import { ComponentWrapper } from '@ssr-workshop/shared'

// This is a Server Component (no 'use client' directive)
export default function HomePage() {
  return (
    <div className="space-y-8">
      <ComponentWrapper type="server" label="🔵 SERVER — Home Page">
        <h1 className="text-3xl font-bold text-gray-900">SSR Workshop — Next.js App Router</h1>
        <p className="mt-2 text-gray-600">
          This demo showcases key Server-Side Rendering patterns in Next.js 16 with the App Router.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/dynamic"
            className="block rounded-lg border-2 border-blue-200 bg-blue-50 p-5 hover:border-blue-400 hover:bg-blue-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-blue-800">🔄 Dynamic Page</h2>
            <p className="mt-1 text-sm text-blue-700">
              Full interactivity: route-level data loading, streaming with Suspense,
              Server Actions for mutations, and both client-side + server-side filtering.
            </p>
          </Link>

          <Link
            href="/static"
            className="block rounded-lg border-2 border-green-200 bg-green-50 p-5 hover:border-green-400 hover:bg-green-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-green-800">📌 Static Page</h2>
            <p className="mt-1 text-sm text-green-700">
              Statically rendered at build time. Add a car on the dynamic page,
              then come back here — this page will still show the old data!
            </p>
          </Link>
        </div>
      </ComponentWrapper>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-800">Legend</h2>
        <div className="mt-3 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 rounded border-2 border-blue-500 bg-blue-50" />
            <span className="text-sm text-gray-700">Server Component — rendered on the server, no JS sent to client</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 rounded border-2 border-orange-500 bg-orange-50" />
            <span className="text-sm text-gray-700">Client Component — hydrated in the browser, can use hooks/events</span>
          </div>
        </div>
      </div>
    </div>
  )
}
