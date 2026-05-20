'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'

interface ServerFilterControlsProps {
  searchParams: { make?: string; model?: string; category?: string; fuelType?: string; wheelDrive?: string }
}

// Client component for inputs — but filtering itself happens on the server
export function ServerFilterControls({ searchParams }: ServerFilterControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search)
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, pathname],
  )

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs font-mono text-blue-700 font-semibold">Filters (server-side):</span>
      {[
        { key: 'make', placeholder: 'Make...' },
        { key: 'model', placeholder: 'Model...' },
        { key: 'category', placeholder: 'Category...' },
        { key: 'fuelType', placeholder: 'Fuel...' },
        { key: 'wheelDrive', placeholder: 'Drive...' },
      ].map(({ key, placeholder }) => (
        <input
          key={key}
          className="h-7 rounded border border-blue-300 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder}
          defaultValue={searchParams[key as keyof typeof searchParams] ?? ''}
          onChange={(e) => updateParam(key, e.target.value)}
        />
      ))}
      {isPending && (
        <span className="text-xs text-blue-500 font-mono animate-pulse">↻ fetching...</span>
      )}
    </div>
  )
}
