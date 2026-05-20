import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'SSR Workshop — Next.js',
  description: 'Server-Side Rendering workshop demo using Next.js App Router',
}

// Official Next.js N mark (from nextjs.org)
function NextjsLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 180 180" aria-label="Next.js logo">
      <circle cx="90" cy="90" r="90" fill="white" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1V70.2L139.999 164.845C143.27 162.614 146.417 160.192 149.508 157.52Z"
        fill="black"
      />
      <rect x="115" y="54" width="12" height="72" fill="black" />
    </svg>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header
          style={{
            borderBottom: '1px solid #1a1a1a',
            background: '#000000',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <nav className="mx-auto flex max-w-7xl items-center gap-5 px-6 py-3">
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <NextjsLogo />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                Next.js
              </span>
            </Link>
            <div className="flex gap-4 ml-2">
              <Link href="/dynamic" className="nav-link-dark">/dynamic</Link>
              <Link href="/static" className="nav-link-dark">/static</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
      </body>
    </html>
  )
}
