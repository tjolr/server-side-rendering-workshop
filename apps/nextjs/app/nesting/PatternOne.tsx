// PatternOne — ✅ Server renders Client
// No 'use client' here = Server Component

import { ComponentWrapper } from '@ssr-workshop/shared'
import { PatternOneClient } from './PatternOneClient'

const ownSnippet = `\
// PatternOne — ✅ Server renders Client

import { PatternOneClient } from './PatternOneClient'
// ...

export function PatternOne() {
  // ...
  return (
    <ComponentWrapper type="server" label="🔵 SERVER">
      {/* ... */}
      <PatternOneClient sourceCode={clientSourceCode} />
    </ComponentWrapper>
  )
}`

const clientSnippet = `\
'use client'

import { useState } from 'react'
// ...

interface PatternOneClientProps {
  sourceCode?: string
}

export function PatternOneClient({ sourceCode }: PatternOneClientProps) {
  const [count, setCount] = useState(0)

  return (
    <ComponentWrapper type="client" sourceCode={sourceCode}>
      {/* ... */}
      <button onClick={() => setCount(c => c - 1)}>−</button>
      <span>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </ComponentWrapper>
  )
}`

export function PatternOne() {
  const serverTime = new Date().toLocaleTimeString('no-NO')

  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — PatternOne (Server Component)"
      sourceCode={ownSnippet}
      componentName="PatternOne.tsx"
    >
      <p className="text-xs font-mono mb-1" style={{ color: 'var(--server-text)' }}>
        Rendret på server kl. {serverTime}. Importerer og rendrer ClientWidget nedenfor.
      </p>
      <PatternOneClient sourceCode={clientSnippet} />
    </ComponentWrapper>
  )
}
