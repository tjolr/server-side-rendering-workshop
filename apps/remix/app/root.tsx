import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import './tailwind.css'

export const links: LinksFunction = () => []

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SSR Workshop — Remix</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
            <NavLink to="/" className="text-lg font-bold text-purple-700 hover:text-purple-800">
              ⚡ SSR Workshop
            </NavLink>
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-mono text-purple-700">
              Remix v2
            </span>
            <div className="flex gap-4">
              <NavLink
                to="/dynamic"
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`
                }
              >
                /dynamic
              </NavLink>
              <NavLink
                to="/static"
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`
                }
              >
                /static
              </NavLink>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
