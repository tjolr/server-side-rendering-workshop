import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'SSR Workshop — Next.js',
  description: 'Server-Side Rendering workshop demo using Next.js App Router',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
            <Link href="/" className="text-lg font-bold text-blue-700 hover:text-blue-800">
              ⚡ SSR Workshop
            </Link>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-mono text-blue-700">
              Next.js 16 App Router
            </span>
            <div className="flex gap-4">
              <Link href="/dynamic" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                /dynamic
              </Link>
              <Link href="/static" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                /static
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  )
}
