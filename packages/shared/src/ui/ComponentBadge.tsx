import React from 'react'

interface ComponentBadgeProps {
  type: 'server' | 'client'
  label?: string
}

export function ComponentBadge({ type, label }: ComponentBadgeProps) {
  const isServer = type === 'server'
  const defaultLabel = isServer ? '🔵 SERVER' : '🟠 CLIENT'
  return (
    <span
      className={[
        'absolute top-2 right-2 z-10 text-xs px-2 py-0.5 rounded-full font-mono font-semibold select-none',
        isServer
          ? 'bg-blue-100 text-blue-700 border border-blue-300'
          : 'bg-orange-100 text-orange-700 border border-orange-300',
      ].join(' ')}
    >
      {label ?? defaultLabel}
    </span>
  )
}

interface ComponentWrapperProps {
  type: 'server' | 'client'
  label?: string
  className?: string
  children: React.ReactNode
}

export function ComponentWrapper({ type, label, className = '', children }: ComponentWrapperProps) {
  const isServer = type === 'server'
  return (
    <div
      className={[
        'relative rounded-lg border-2 p-6 pt-32',
        isServer ? 'border-blue-500' : 'border-orange-500',
        className,
      ].join(' ')}
    >
      <ComponentBadge type={type} label={label} />
      {children}
    </div>
  )
}
