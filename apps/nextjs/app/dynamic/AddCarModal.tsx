'use client'

import { useActionState, useEffect } from 'react'
import { Button, Input, Select } from '@ssr-workshop/shared'
import { addCarAction } from '../actions'

interface AddCarModalProps {
  onClose: () => void
}

const initialState = { success: false, error: undefined as string | undefined }

export function AddCarModal({ onClose }: AddCarModalProps) {
  const [state, formAction, isPending] = useActionState(addCarAction, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl border-2 border-orange-500 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Car</h2>
          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-mono text-orange-700 border border-orange-300">
            🟠 CLIENT → Server Action
          </span>
        </div>

        <form action={formAction} className="space-y-4">
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

          {state.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              ⚠ {state.error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add Car'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
