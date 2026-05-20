'use client'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeModalProps {
  title: string
  code: string
  onClose: () => void
}

export function CodeModal({ title, code, onClose }: CodeModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const modal = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.65)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '60vw',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          border: '1px solid #374151',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#111827',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #374151',
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#e5e7eb' }}>{title}</span>
          <button
            onClick={onClose}
            style={{ color: '#9ca3af', fontSize: '1.25rem', lineHeight: 1, cursor: 'pointer', background: 'none', border: 'none' }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* Code — min-h-0 allows flex child to shrink and scroll */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <SyntaxHighlighter
            language="tsx"
            style={oneDark}
            customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.78rem' }}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modal, document.body)
}
