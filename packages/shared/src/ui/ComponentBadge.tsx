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

  const className = [
    'absolute top-2 right-2 z-10 text-xs px-2 py-0.5 rounded-full font-mono font-semibold select-none',
    isServer
      ? 'bg-blue-100 text-blue-700 border border-blue-300'
      : 'bg-orange-100 text-orange-700 border border-orange-300',
    sourceCode ? 'cursor-pointer hover:brightness-95 transition-[filter]' : '',
  ].join(' ')

  return (
    <>
      {sourceCode ? (
        <button
          type="button"
          className={className}
          onClick={() => setOpen(true)}
          title="View source code"
        >
          {content}
        </button>
      ) : (
        <span className={className}>{content}</span>
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
  return (
    <div
      className={[
        'relative rounded-lg border-2 p-6 pt-32',
        isServer ? 'border-blue-500' : 'border-orange-500',
        className,
      ].join(' ')}
    >
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
