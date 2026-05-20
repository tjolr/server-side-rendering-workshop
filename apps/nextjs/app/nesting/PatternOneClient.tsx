'use client'

import { ComponentWrapper } from '@ssr-workshop/shared'
import { useState } from 'react'

interface PatternOneClientProps {
  sourceCode?: string
}

export function PatternOneClient({ sourceCode }: PatternOneClientProps) {
  const [count, setCount] = useState(0)

  return (
    <ComponentWrapper
      type="client"
      label="🟠 CLIENT — PatternOneClient (Client Component)"
      sourceCode={sourceCode}
      componentName="PatternOneClient.tsx"
    >
      <p className="text-xs font-mono mb-3" style={{ color: 'var(--client-text)' }}>
        Importert og rendret av Server Component ovenfor. Har sin egen state (useState).
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount(c => c - 1)}
          className="px-3 py-1 rounded text-sm font-mono"
          style={{ background: 'var(--client-border)', color: 'white' }}
        >
          −
        </button>
        <span className="font-mono font-bold text-lg">{count}</span>
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-3 py-1 rounded text-sm font-mono"
          style={{ background: 'var(--client-border)', color: 'white' }}
        >
          +
        </button>
      </div>
    </ComponentWrapper>
  )
}
