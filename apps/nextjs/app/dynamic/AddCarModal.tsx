'use client'

import { useActionState, useEffect, useState } from 'react'
import { CodeModal } from '@ssr-workshop/shared'
import { addCarAction } from '../actions'

interface AddCarModalProps {
  onClose: () => void
  sourceCode?: string
}

const initialState = { success: false, error: undefined as string | undefined }

const inputStyle: React.CSSProperties = {
  display: 'flex',
  height: '2.1rem',
  width: '100%',
  borderRadius: '0.375rem',
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  color: 'var(--text)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  padding: '0 0.75rem',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.3rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  fontWeight: 600,
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

// CLIENT component — browser UI only, but the form submission invokes a Server Action (addCarAction runs on the server).
// useActionState wires the form to the server action and tracks loading state without any manual fetch() call.
export function AddCarModal({ onClose, sourceCode }: AddCarModalProps) {
  // isPending: true while the Server Action is executing on the server and revalidatePath is running.
  const [state, formAction, isPending] = useActionState(addCarAction, initialState)
  const [showCode, setShowCode] = useState(false)

  // Close only when state.success is true — confirms the server action completed and the page has been revalidated.
  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '32rem',
          borderRadius: '0.75rem',
          border: '1px solid var(--client-border)',
          background: 'var(--surface)',
          padding: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: 'var(--text)',
              margin: 0,
            }}
          >
            Add New Car
          </h2>
          {sourceCode ? (
            <button
              type="button"
              onClick={() => setShowCode(true)}
              title="View source code"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'rgba(249,115,22,0.1)',
                border: '1px solid var(--client-border)',
                color: 'var(--client-text)',
                cursor: 'pointer',
              }}
            >
              🟠 CLIENT → Server Action
            </button>
          ) : (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'rgba(249,115,22,0.1)',
                border: '1px solid var(--client-border)',
                color: 'var(--client-text)',
              }}
            >
              🟠 CLIENT → Server Action
            </span>
          )}
        </div>

        {/* action={formAction} connects the form to the Server Action — no fetch() or event handler needed; the browser POSTs natively. */}
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Field label="Make">
              <input style={inputStyle} id="make" name="make" placeholder="Tesla" required />
            </Field>
            <Field label="Model">
              <input style={inputStyle} id="model" name="model" placeholder="Model Y" required />
            </Field>
            <Field label="Year">
              <input style={inputStyle} id="year" name="year" type="number" defaultValue={2025} min={2000} max={2030} required />
            </Field>
            <Field label="Category">
              <select
                id="category"
                name="category"
                style={{ ...inputStyle, appearance: 'none' as any }}
              >
                {['SUV', 'Sedan', 'Hatchback', 'Crossover', 'Wagon'].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Horsepower">
              <input style={inputStyle} id="horsepower" name="horsepower" type="number" placeholder="250" min={0} required />
            </Field>
            <Field label="Fuel Type">
              <select id="fuelType" name="fuelType" style={{ ...inputStyle, appearance: 'none' as any }}>
                {['Electric', 'Hybrid', 'Petrol', 'Diesel'].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Range (km WLTP)">
              <input style={inputStyle} id="range" name="range" type="number" placeholder="500" min={0} required />
            </Field>
            <Field label="Wheel Drive">
              <select id="wheelDrive" name="wheelDrive" style={{ ...inputStyle, appearance: 'none' as any }}>
                {[
                  { value: 'AWD', label: 'AWD — All Wheel Drive' },
                  { value: 'RWD', label: 'RWD — Rear Wheel Drive' },
                  { value: 'FWD', label: 'FWD — Front Wheel Drive' },
                ].map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Baggage Capacity (L)">
              <input
                style={{ ...inputStyle, gridColumn: 'span 2' }}
                id="baggageCapacity"
                name="baggageCapacity"
                type="number"
                placeholder="450"
                min={0}
                required
              />
            </Field>
          </div>

          {state.error && (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#f87171',
                background: 'rgba(248,113,113,0.08)',
                border: '1px solid rgba(248,113,113,0.2)',
                borderRadius: '0.375rem',
                padding: '0.5rem 0.75rem',
              }}
            >
              ⚠ {state.error}
            </p>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              style={{
                height: '2.1rem',
                padding: '0 1rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              style={{
                height: '2.1rem',
                padding: '0 1.25rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--client-border)',
                background: 'rgba(249,115,22,0.12)',
                color: 'var(--client-text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: isPending ? 'not-allowed' : 'pointer',
                opacity: isPending ? 0.6 : 1,
              }}
            >
              {isPending ? 'Adding...' : 'Add Car'}
            </button>
          </div>
        </form>
      </div>

      {showCode && sourceCode && (
        <CodeModal
          title="AddCarModal.tsx"
          code={sourceCode}
          onClose={() => setShowCode(false)}
        />
      )}
    </div>
  )
}
