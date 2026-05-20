// PatternThree — ✅ Composition via children
// Page (Server) importerer begge, sender ServerContent som children til ClientShell

import { ComponentWrapper } from '@ssr-workshop/shared'
import { PatternThreeClientShell } from './PatternThreeClientShell'

function ServerContent() {
  const serverTime = new Date().toLocaleTimeString('no-NO')
  return (
    <ComponentWrapper type="server" label="🔵 SERVER — ServerContent (children-prop)">
      <p className="text-xs font-mono" style={{ color: 'var(--server-text)' }}>
        Jeg er en Server Component sendt som <code>children</code> til Client wrapper ovenfor.
        Rendret på server kl. {serverTime}.
      </p>
    </ComponentWrapper>
  )
}

const ownSnippet = `\
import { PatternThreeClientShell } from './PatternThreeClientShell'
// ...

export function PatternThree() {
  // ...
  return (
    <ComponentWrapper type="server" label="🔵 SERVER — Page">
      {/* ... */}
      <PatternThreeClientShell sourceCode={shellSourceCode}>
        <ServerContent />
      </PatternThreeClientShell>
    </ComponentWrapper>
  )
}`

const shellSnippet = `\
'use client'

import { useState } from 'react'
// ...

interface ClientShellProps {
  children: React.ReactNode
  sourceCode?: string
}

export function PatternThreeClientShell({ children, sourceCode }: ClientShellProps) {
  const [open, setOpen] = useState(true)
  // ...
  return (
    <ComponentWrapper type="client" sourceCode={sourceCode}>
      {/* ... */}
      {open && <div>{children}</div>}
    </ComponentWrapper>
  )
}`

export function PatternThree() {
  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — Page (composer)"
      sourceCode={ownSnippet}
      componentName="PatternThree.tsx"
    >
      <p className="text-xs font-mono mb-3" style={{ color: 'var(--server-text)' }}>
        Page importerer <em>begge</em> komponenter. Sender ServerContent som{' '}
        <code>children</code> til ClientShell. ClientShell importerer ikke ServerContent.
      </p>
      <PatternThreeClientShell sourceCode={shellSnippet}>
        <ServerContent />
      </PatternThreeClientShell>
    </ComponentWrapper>
  )
}
