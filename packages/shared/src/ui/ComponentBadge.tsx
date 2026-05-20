'use client'

import React, { useState } from 'react'
import { CodeModal } from './CodeModal'

interface ComponentBadgeProps {
  type: 'server' | 'client'
  label?: string
  sourceCode?: string
  componentName?: string
}

export function ComponentBadge({ type, label, sourceCode, componentName }: ComponentBadgeProps) {
  const [open, setOpen] = useState(false)
  const isServer = type === 'server'
  const defaultLabel = isServer ? '🔵 SERVER' : '🟠 CLIENT'
  const content = label ?? defaultLabel

  const style: React.CSSProperties = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: 10,
    fontSize: '0.65rem',
    padding: '3px 10px',
    borderRadius: '9999px',
    fontFamily: "'IBM Plex Mono', 'Menlo', monospace",
    fontWeight: 500,
    letterSpacing: '0.03em',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    cursor: sourceCode ? 'pointer' : 'default',
    ...(isServer
      ? {
          background: 'rgba(91, 163, 245, 0.1)',
          color: 'var(--server-text, #5ba3f5)',
          border: '1px solid var(--server-border, #1a4f9e)',
        }
      : {
          background: 'rgba(249, 115, 22, 0.1)',
          color: 'var(--client-text, #f97316)',
          border: '1px solid var(--client-border, #8a3a00)',
        }),
  }

  return (
    <>
      {sourceCode ? (
        <button
          type="button"
          style={style}
          onClick={() => setOpen(true)}
          title="View source code"
        >
          {content}
        </button>
      ) : (
        <span style={style}>{content}</span>
      )}
      {open && sourceCode && (
        <CodeModal
          title={componentName ?? 'Component Source'}
          code={sourceCode}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

interface ComponentWrapperProps {
  type: 'server' | 'client'
  label?: string
  className?: string
  sourceCode?: string
  componentName?: string
  children: React.ReactNode
}

export function ComponentWrapper({
  type,
  label,
  className = '',
  sourceCode,
  componentName,
  children,
}: ComponentWrapperProps) {
  const isServer = type === 'server'
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: '0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '1.25rem',
    paddingTop: '2.75rem',
    ...(isServer
      ? {
          borderColor: 'var(--server-border, #1d4ed8)',
          background: 'var(--server-bg, rgba(4,14,31,0.6))',
        }
      : {
          borderColor: 'var(--client-border, #ea580c)',
          background: 'var(--client-bg, rgba(21,8,0,0.6))',
        }),
  }

  return (
    <div style={wrapperStyle} className={className}>
      <ComponentBadge
        type={type}
        label={label}
        sourceCode={sourceCode}
        componentName={componentName}
      />
      {children}
    </div>
  )
}
