'use client'

import { ComponentWrapper } from '@ssr-workshop/shared'
import { useState } from 'react'

interface ClientLayoutProps {
  header: React.ReactNode
  sidebar: React.ReactNode
  content: React.ReactNode
  sourceCode?: string
}

export function PatternFourClientLayout({ header, sidebar, content, sourceCode }: ClientLayoutProps) {
  const [headerOpen, setHeaderOpen] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [contentOpen, setContentOpen] = useState(true)

  return (
    <ComponentWrapper
      type="client"
      label="🟠 CLIENT — PatternFourClientLayout (named props)"
      sourceCode={sourceCode}
      componentName="PatternFourClientLayout.tsx"
    >
      <p className="text-xs font-mono mb-3" style={{ color: 'var(--client-text)' }}>
        Client layout med tre named props: <code>header</code>, <code>sidebar</code>,{' '}
        <code>content</code>. Vet ikke at de er Server Components — bare renderer dem.
      </p>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {(
          [
            ['header', headerOpen, setHeaderOpen],
            ['sidebar', sidebarOpen, setSidebarOpen],
            ['content', contentOpen, setContentOpen],
          ] as const
        ).map(([label, open, setOpen]) => (
          <button
            key={label}
            onClick={() => setOpen(o => !o)}
            className="px-2 py-1 rounded text-xs font-mono"
            style={{ background: open ? 'var(--client-border)' : '#555', color: 'white' }}
          >
            {open ? `Skjul ${label}` : `Vis ${label}`}
          </button>
        ))}
        <span className="text-xs font-mono" style={{ color: 'var(--client-muted)' }}>
          (client state)
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {headerOpen && <div>{header}</div>}
        <div className="flex gap-2">
          {sidebarOpen && <div className="w-48 shrink-0">{sidebar}</div>}
          {contentOpen && <div className="flex-1">{content}</div>}
        </div>
      </div>
    </ComponentWrapper>
  )
}
