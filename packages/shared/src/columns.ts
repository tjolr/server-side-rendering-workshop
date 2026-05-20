import { createColumnHelper } from '@tanstack/react-table'
import type { Car } from './types'

const h = createColumnHelper<Car>()

export const carColumns = [
  h.accessor('make',            { header: 'Make',        enableColumnFilter: true  }),
  h.accessor('model',           { header: 'Model',       enableColumnFilter: true  }),
  h.accessor('year',            { header: 'Year',        enableColumnFilter: true  }),
  h.accessor('category',        { header: 'Category',    enableColumnFilter: true  }),
  h.accessor('fuelType',        { header: 'Fuel Type',   enableColumnFilter: true  }),
  h.accessor('wheelDrive',      { header: 'Drive',       enableColumnFilter: true  }),
  h.accessor('horsepower',      { header: 'HP',          enableColumnFilter: false }),
  h.accessor('range',           { header: 'Range (km)',  enableColumnFilter: false }),
  h.accessor('baggageCapacity', { header: 'Baggage (L)', enableColumnFilter: false }),
]
