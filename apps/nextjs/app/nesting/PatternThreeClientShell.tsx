'use client'

import { ComponentWrapper } from '@ssr-workshop/shared'
import { useState } from 'react'

interface ClientShellProps {
  children: React.ReactNode
  sourceCode?: string
}

export function PatternThreeClientShell({ children, sourceCode }: ClientShellProps) {
  const [open, setOpen] = useState(true)

  return (
    <ComponentWrapper
      type="client"
      label="🟠 CLIENT — PatternThreeClientShell (children-prop)"
      sourceCode={sourceCode}
      componentName="PatternThreeClientShell.tsx"
    >
      <p className="text-xs font-mono mb-3" style={{ color: 'var(--client-text)' }}>
        Client wrapper. Vet ikke hva <code>children</code> er — bare renderer det.
        Kan ha egen state og event handlers.
      </p>
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setOpen(o => !o)}
          className="px-3 py-1 rounded text-xs font-mono"
          style={{ background: 'var(--client-border)', color: 'white' }}
        >
          {open ? 'Skjul innhold' : 'Vis innhold'}
        </button>
        <span className="text-xs font-mono" style={{ color: 'var(--client-muted)' }}>
          (client state styrer synlighet)
        </span>
      </div>
      {open && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </ComponentWrapper>
  )
}
