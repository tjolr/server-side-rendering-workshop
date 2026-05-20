"use client";

import type { Car } from "@ssr-workshop/shared";
import {
  carColumns,
  ComponentWrapper,
} from "@ssr-workshop/shared";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { AddCarModal } from "./AddCarModal";

interface CarTableClientProps {
  cars: Car[];
  clientSourceCode?: string;
  addCarModalSource?: string;
}

// CLIENT component — runs in the browser only after React hydrates the SSR HTML.
// All rows arrive as a prop (fetched by CarTableServer on the server) — the browser makes no API call.
// Filtering is handled entirely by useState + TanStack Table in the browser: zero server round-trips, but all rows must fit in memory.
export function CarTableClient({ cars, clientSourceCode, addCarModalSource }: CarTableClientProps) {
  // CSR state — resets on full page reload, unlike URL-based (SSR) filter state.
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<
    { id: string; value: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  // getFilteredRowModel() computes visible rows in the browser on every render — no server involved.
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
  });

  return (
    <ComponentWrapper
      type="client"
      label="🟠 CLIENT — TanStack Table + Client-side Filtering"
      sourceCode={clientSourceCode}
      componentName="CarTableClient.tsx"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            style={{
              flex: 1,
              minWidth: '12rem',
              height: '2.1rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              padding: '0 0.75rem',
              outline: 'none',
            }}
            placeholder="⌕  Global search all columns..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <button
            onClick={() => setShowModal(true)}
            style={{
              height: '2.1rem',
              padding: '0 1rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--client-border)',
              background: 'rgba(249,115,22,0.08)',
              color: 'var(--client-text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            + Add Car
          </button>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--client-muted)',
          }}
        >
          ↳ Filtering is instant — zero server round-trips. All {cars.length} rows loaded once from server.
        </p>

        {/* Table */}
        <div
          style={{
            overflowX: 'auto',
            borderRadius: '0.375rem',
            border: '1px solid var(--border)',
          }}
        >
          <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr
                  key={hg.id}
                  style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
                >
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        padding: '0.5rem 0.75rem',
                        textAlign: 'left',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        color: 'var(--text-mono)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                      {header.column.getCanFilter() && (
                        <input
                          style={{
                            marginTop: '0.3rem',
                            height: '1.35rem',
                            width: '100%',
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)',
                            background: 'var(--bg)',
                            color: 'var(--text)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            padding: '0 0.4rem',
                            fontWeight: 400,
                            outline: 'none',
                            textTransform: 'none',
                            letterSpacing: 'normal',
                          }}
                          placeholder="Filter..."
                          value={
                            (header.column.getFilterValue() as string) ?? ""
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
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
                  <td
                    colSpan={carColumns.length}
                    style={{
                      padding: '2.5rem',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    No cars match your filters
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{
                      background: i % 2 === 0 ? 'var(--bg)' : 'var(--surface)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{
                          padding: '0.45rem 0.75rem',
                          whiteSpace: 'nowrap',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          color: 'var(--text)',
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
          }}
        >
          Showing {table.getRowModel().rows.length} of {cars.length} cars
        </p>
      </div>

      {showModal && (
        <AddCarModal
          onClose={() => setShowModal(false)}
          sourceCode={addCarModalSource}
        />
      )}
    </ComponentWrapper>
  );
}
