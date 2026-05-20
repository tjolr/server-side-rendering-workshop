// PatternFive — ❌ Client kan ikke sende props til Server Component
// Kodeeksempel-only, ikke kjørbar

export function PatternFive() {
  return (
    <div className="flex flex-col gap-4">
      {/* --- Forsøk 1: Importer og send props direkte --- */}
      <div
        className="rounded-lg p-5 relative"
        style={{ background: '#fff1f2', border: '2px solid #ef4444' }}
      >
        <div
          className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded"
          style={{ background: '#ef4444', color: 'white' }}
        >
          ❌ FORSØK 1 — Import + props
        </div>

        <p className="text-sm font-semibold mb-3" style={{ color: '#b91c1c' }}>
          Importer ServerSidebar og send props — kompileringsfeil
        </p>

        <div
          className="rounded p-4 mb-4 font-mono text-xs leading-relaxed"
          style={{ background: '#1e1e1e', color: '#f8f8f2' }}
        >
          <div style={{ color: '#6272a4' }}>{'// ❌ PatternFourClientLayout.tsx'}</div>
          <div>
            <span style={{ color: '#ff79c6' }}>&apos;use client&apos;</span>
          </div>
          <div className="mt-2">
            <span style={{ color: '#ff79c6' }}>import</span>
            <span>{' { '}</span>
            <span style={{ color: '#50fa7b' }}>ServerSidebar</span>
            <span>{' } '}</span>
            <span style={{ color: '#ff79c6' }}>from</span>
            <span style={{ color: '#f1fa8c' }}>{" './ServerSidebar'"}</span>
            <span style={{ color: '#ff5555' }}>{' // ← kompileringsfeil!'}</span>
          </div>
          <div className="mt-2">
            <span style={{ color: '#ff79c6' }}>export function</span>
            <span style={{ color: '#50fa7b' }}>{' ClientLayout'}</span>
            <span>{'() {'}</span>
          </div>
          <div className="ml-4">
            <span style={{ color: '#ff79c6' }}>const</span>
            <span>{' [filter, setFilter] = '}</span>
            <span style={{ color: '#50fa7b' }}>useState</span>
            <span>{'("")'}</span>
          </div>
          <div className="ml-4 mt-1">
            <span style={{ color: '#ff79c6' }}>return</span>
            <span style={{ color: '#ff5555' }}>{' <ServerSidebar filter={filter} />'}</span>
            <span style={{ color: '#6272a4' }}>{' // ← Server Component!'}</span>
          </div>
          <div>{'}'}</div>
        </div>

        <div
          className="rounded p-3 text-xs"
          style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }}
        >
          <strong>Feil:</strong> Samme som mønster 2 — <code className="font-mono">&apos;use client&apos;</code>-filen
          importerer ServerSidebar og trekker den inn i klientbunten. Next.js stopper dette ved kompilering.
        </div>
      </div>

      {/* --- Forsøk 2: Bruk composition, men prøv å endre props --- */}
      <div
        className="rounded-lg p-5 relative"
        style={{ background: '#fff1f2', border: '2px solid #ef4444' }}
      >
        <div
          className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded"
          style={{ background: '#ef4444', color: 'white' }}
        >
          ❌ FORSØK 2 — cloneElement / re-render
        </div>

        <p className="text-sm font-semibold mb-3" style={{ color: '#b91c1c' }}>
          Motta sidebar som prop, prøv å injisere nye props via cloneElement
        </p>

        <div
          className="rounded p-4 mb-4 font-mono text-xs leading-relaxed"
          style={{ background: '#1e1e1e', color: '#f8f8f2' }}
        >
          <div style={{ color: '#6272a4' }}>{'// ❌ PatternFourClientLayout.tsx'}</div>
          <div>
            <span style={{ color: '#ff79c6' }}>&apos;use client&apos;</span>
          </div>
          <div className="mt-2">
            <span style={{ color: '#ff79c6' }}>export function</span>
            <span style={{ color: '#50fa7b' }}>{' ClientLayout'}</span>
            <span>{'({ sidebar }) {'}</span>
          </div>
          <div className="ml-4">
            <span style={{ color: '#ff79c6' }}>const</span>
            <span>{' [filter, setFilter] = '}</span>
            <span style={{ color: '#50fa7b' }}>useState</span>
            <span>{'("")'}</span>
          </div>
          <div className="ml-4 mt-1">
            <span style={{ color: '#6272a4' }}>{'// Ser ut som det funker...'}</span>
          </div>
          <div className="ml-4">
            <span style={{ color: '#ff79c6' }}>const</span>
            <span>{' sidebarWithFilter = React.'}</span>
            <span style={{ color: '#50fa7b' }}>cloneElement</span>
            <span>{'(sidebar, { filter })'}</span>
          </div>
          <div className="ml-4">
            <span style={{ color: '#ff79c6' }}>return</span>
            <span style={{ color: '#ff5555' }}>{' <div>{sidebarWithFilter}</div>'}</span>
          </div>
          <div>{'}'}</div>
        </div>

        <div
          className="rounded p-3 text-xs"
          style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }}
        >
          <strong>Hvorfor virker ikke dette?</strong> <code className="font-mono">sidebar</code>-propen
          er allerede ferdig-rendret JSX fra serveren — frossen HTML, ikke en funksjon.{' '}
          <code className="font-mono">cloneElement</code> kan endre props på React-elementet,
          men <strong>ServerSidebar kjører ikke på nytt</strong>. Den har ingen JS i nettleseren.
          Propen <code className="font-mono">filter</code> havner i ingensteds.
        </div>
      </div>

      {/* --- Løsningen --- */}
      <div
        className="rounded-lg p-5 relative"
        style={{ background: '#f0fdf4', border: '2px solid #22c55e' }}
      >
        <div
          className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded"
          style={{ background: '#22c55e', color: 'white' }}
        >
          ✅ LØSNINGEN
        </div>

        <p className="text-sm font-semibold mb-3" style={{ color: '#15803d' }}>
          Client → Server kommunikasjon via URL eller Server Actions
        </p>

        <div
          className="rounded p-4 font-mono text-xs leading-relaxed"
          style={{ background: '#1e1e1e', color: '#f8f8f2' }}
        >
          <div style={{ color: '#6272a4' }}>{'// ✅ Alternativ 1: URL-state (searchParams)'}</div>
          <div>
            <span style={{ color: '#ff79c6' }}>&apos;use client&apos;</span>
          </div>
          <div className="mt-1">
            <span style={{ color: '#ff79c6' }}>import</span>
            <span>{' { '}</span>
            <span style={{ color: '#50fa7b' }}>useRouter</span>
            <span>{' } '}</span>
            <span style={{ color: '#ff79c6' }}>from</span>
            <span style={{ color: '#f1fa8c' }}>{" 'next/navigation'"}</span>
          </div>
          <div className="mt-2">
            <span style={{ color: '#6272a4' }}>{'// Bruker setter filter i URL → Next.js re-rendrer server-treet'}</span>
          </div>
          <div>
            <span style={{ color: '#ff79c6' }}>const</span>
            <span>{' handleFilter = (val) => router.'}</span>
            <span style={{ color: '#50fa7b' }}>push</span>
            <span>{'(`?filter=${val}`)'}</span>
          </div>
          <div className="mt-3" style={{ color: '#6272a4' }}>{'// ✅ Alternativ 2: Server Action'}</div>
          <div>
            <span style={{ color: '#ff79c6' }}>const</span>
            <span>{' result = '}</span>
            <span style={{ color: '#ff79c6' }}>await</span>
            <span style={{ color: '#50fa7b' }}>{' filterAction'}</span>
            <span>{'(filter)'}</span>
            <span style={{ color: '#6272a4' }}>{' // kjører på server'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
