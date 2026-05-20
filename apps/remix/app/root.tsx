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

// Official Remix logo mark (from remix.run brand kit)
function RemixLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 800 800" aria-label="Remix logo" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M587.5 450.6c13.4 35.9 20.3 64.5 20.3 89.4V653H462V549.3c0-22.8-5.3-49.7-14.7-73.8-13.4-32.7-38.4-48.9-75.5-48.9H230V800H84V0h349c74.5 0 133.6 18.2 177.3 54.6C654 90.9 675.8 143 675.8 210.6c0 48.9-12.3 90.9-36.2 126.1C616.5 372.3 600.9 409.2 587.5 450.6ZM230 133v161h185.5c28.7 0 51.1-7.5 67.4-22.5s24.6-35.8 24.6-62.6c0-25.4-7.4-46-21.3-61.6S451.5 133 419.8 133H230Z"
      />
      <path d="M608 800H462c0-57.1-5.9-99.2-17.7-126.3C431.5 645.3 410.2 632 380 632H230v-79h152.7c37.1 0 65.5 9.3 85.4 27.8 19.8 18.5 29.8 46.6 29.8 84.2V800H608Z" />
    </svg>
  )
}

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
      <body className="min-h-screen">
        <header
          style={{
            borderBottom: '1px solid #2a2a4a',
            background: '#1a1a2e',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <nav className="mx-auto flex max-w-7xl items-center gap-5 px-6 py-3">
            <NavLink
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <RemixLogo />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                Remix
              </span>
            </NavLink>
            <div className="flex gap-4 ml-2">
              <NavLink
                to="/dynamic"
                className={({ isActive }) => `nav-link-dark${isActive ? ' nav-link-dark-active' : ''}`}
              >
                /dynamic
              </NavLink>
              <NavLink
                to="/static"
                className={({ isActive }) => `nav-link-dark${isActive ? ' nav-link-dark-active' : ''}`}
              >
                /static
              </NavLink>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
