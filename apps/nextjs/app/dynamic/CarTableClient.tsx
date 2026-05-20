'use client'

import { useState, useTransition } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import { carColumns, ComponentWrapper, Button, Input } from '@ssr-workshop/shared'
import type { Car } from '@ssr-workshop/shared'
import { AddCarModal } from './AddCarModal'

interface CarTableClientProps {
  cars: Car[]
}

export function CarTableClient({ cars }: CarTableClientProps) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<{ id: string; value: string }[]>([])
  const [showModal, setShowModal] = useState(false)

  const table = useReactTable({
    data: cars,
    columns: carColumns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters as any,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <ComponentWrapper type="client" label="🟠 CLIENT — TanStack Table + Client-side Filtering">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-48">
            <Input
              placeholder="🔍 Global search all columns..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <Button onClick={() => setShowModal(true)}>+ Add Car</Button>
        </div>

        <p className="text-xs text-orange-600 font-mono">
          ↳ Filtering is instant — zero server round-trips. All {cars.length} rows loaded once from server.
        </p>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="px-3 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      {header.column.getCanFilter() && (
                        <input
                          className="mt-1 h-6 w-full rounded border border-gray-300 px-1 text-xs font-normal"
                          placeholder="Filter..."
                          value={(header.column.getFilterValue() as string) ?? ''}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={carColumns.length} className="py-8 text-center text-gray-500">
                    No cars match your filters
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2 whitespace-nowrap text-gray-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500">
          Showing {table.getRowModel().rows.length} of {cars.length} cars
        </p>
      </div>

      {showModal && <AddCarModal onClose={() => setShowModal(false)} />}
    </ComponentWrapper>
  )
}
