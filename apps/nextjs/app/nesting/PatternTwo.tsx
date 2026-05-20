// PatternTwo — ❌ Client cannot import Server Component
// This is a CODE EXAMPLE ONLY — shown as a warning/explanation

export function PatternTwo() {
  return (
    <div
      className="rounded-lg p-5 relative"
      style={{
        background: '#fff1f2',
        border: '2px solid #ef4444',
      }}
    >
      <div
        className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded"
        style={{ background: '#ef4444', color: 'white' }}
      >
        ❌ ULOVLIG MØNSTER
      </div>

      <p className="text-sm font-semibold mb-3" style={{ color: '#b91c1c' }}>
        Client Component kan IKKE importere en Server Component
      </p>

      <div
        className="rounded p-4 mb-4 font-mono text-xs leading-relaxed"
        style={{ background: '#1e1e1e', color: '#f8f8f2' }}
      >
        <div style={{ color: '#6272a4' }}>{'// ❌ ClientComponent.tsx'}</div>
        <div>
          <span style={{ color: '#ff79c6' }}>&apos;use client&apos;</span>
        </div>
        <div className="mt-2">
          <span style={{ color: '#ff79c6' }}>import</span>
          <span style={{ color: '#f8f8f2' }}>{' { '}</span>
          <span style={{ color: '#50fa7b' }}>ServerData</span>
          <span style={{ color: '#f8f8f2' }}>{' } '}</span>
          <span style={{ color: '#ff79c6' }}>from</span>
          <span style={{ color: '#f1fa8c' }}>{" './ServerData'"}</span>
          <span style={{ color: '#6272a4' }}>{' // ← ❌ FEIL!'}</span>
        </div>
        <div className="mt-2">
          <span style={{ color: '#6272a4' }}>{'// Next.js error:'}</span>
        </div>
        <div style={{ color: '#ff5555' }}>
          {'// You\'re importing a component that needs "next/headers"'}
        </div>
        <div style={{ color: '#ff5555' }}>
          {'// That only works in a Server Component.'}
        </div>
      </div>

      <div
        className="rounded p-3 text-xs"
        style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }}
      >
        <strong>Regelen:</strong> Når du skriver <code className="font-mono">&apos;use client&apos;</code> i en fil,
        behandler Next.js <em>alt den importerer</em> som klient-kode.
        En Server Component kan ikke kjøre i nettleseren → kompileringsfeil.
      </div>
    </div>
  )
}
