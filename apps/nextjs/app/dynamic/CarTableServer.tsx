import { getCars } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'
import { CarTableClient } from './CarTableClient'

// Server Component — fetches data on server, passes to client table
export async function CarTableServer() {
  const cars = getCars()

  return (
    <ComponentWrapper type="server" label="🔵 SERVER — Data Fetching Wrapper">
      <p className="text-xs text-blue-600 font-mono mb-3">
        ↳ Data fetched on the server. {cars.length} cars passed as props to the client table below.
        No API call from the browser — data arrives with the HTML.
      </p>
      <CarTableClient cars={cars} />
    </ComponentWrapper>
  )
}
