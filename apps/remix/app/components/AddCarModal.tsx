import { useEffect, useState } from 'react'
import { useFetcher } from '@remix-run/react'
import { Input, Select, CodeModal } from '@ssr-workshop/shared'
import sourceCode from './AddCarModal.tsx?raw'

interface AddCarModalProps {
  onClose: () => void
  sourceCode?: string
}

export function AddCarModal({ onClose, sourceCode: sourceProp }: AddCarModalProps) {
  const fetcher = useFetcher()
  const isPending = fetcher.state !== 'idle'
  const [showCode, setShowCode] = useState(false)

  // Use prop if passed (from parent), otherwise use ?raw self-import
  const codeToShow = sourceProp ?? sourceCode

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      onClose()
    }
  }, [fetcher.state, fetcher.data, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl border-2 border-orange-500 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Car</h2>
          <button
            type="button"
            onClick={() => setShowCode(true)}
            className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-mono text-orange-700 border border-orange-300 cursor-pointer hover:brightness-95 transition-[filter]"
            title="View source code"
          >
            🟠 CLIENT → Remix Action
          </button>
        </div>

        <fetcher.Form method="post" action="/dynamic" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input id="make" name="make" label="Make" placeholder="Tesla" required />
            <Input id="model" name="model" label="Model" placeholder="Model Y" required />
            <Input id="year" name="year" label="Year" type="number" defaultValue={2025} min={2000} max={2030} required />
            <Select
              id="category"
              name="category"
              label="Category"
              options={[
                { value: 'SUV', label: 'SUV' },
                { value: 'Sedan', label: 'Sedan' },
                { value: 'Hatchback', label: 'Hatchback' },
                { value: 'Crossover', label: 'Crossover' },
                { value: 'Wagon', label: 'Wagon' },
              ]}
            />
            <Input id="horsepower" name="horsepower" label="Horsepower" type="number" placeholder="250" min={0} required />
            <Select
              id="fuelType"
              name="fuelType"
              label="Fuel Type"
              options={[
                { value: 'Electric', label: 'Electric' },
                { value: 'Hybrid', label: 'Hybrid' },
                { value: 'Petrol', label: 'Petrol' },
                { value: 'Diesel', label: 'Diesel' },
              ]}
            />
            <Input id="range" name="range" label="Range (km WLTP)" type="number" placeholder="500" min={0} required />
            <Select
              id="wheelDrive"
              name="wheelDrive"
              label="Wheel Drive"
              options={[
                { value: 'AWD', label: 'AWD — All Wheel Drive' },
                { value: 'RWD', label: 'RWD — Rear Wheel Drive' },
                { value: 'FWD', label: 'FWD — Front Wheel Drive' },
              ]}
            />
            <Input
              id="baggageCapacity"
              name="baggageCapacity"
              label="Baggage Capacity (L)"
              type="number"
              placeholder="450"
              min={0}
              className="col-span-2"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-md h-9 px-4 text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-md h-9 px-4 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? 'Adding...' : 'Add Car'}
            </button>
          </div>
        </fetcher.Form>
      </div>

      {showCode && (
        <CodeModal
          title="AddCarModal.tsx (Remix)"
          code={codeToShow}
          onClose={() => setShowCode(false)}
        />
      )}
    </div>
  )
}
