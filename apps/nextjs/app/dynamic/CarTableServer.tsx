import { getCars } from '@ssr-workshop/shared'
import { ComponentWrapper } from '@ssr-workshop/shared'
import { CarTableClient } from './CarTableClient'
import { readFileSync } from 'fs'
import path from 'path'

// Server Component — fetches data on server, passes to client table
export async function CarTableServer() {
  const cars = getCars()
  const dir = path.join(process.cwd(), 'app/dynamic')
  const serverSourceCode = readFileSync(path.join(dir, 'CarTableServer.tsx'), 'utf-8')
  const clientSourceCode = readFileSync(path.join(dir, 'CarTableClient.tsx'), 'utf-8')
  const addCarModalSource = readFileSync(path.join(dir, 'AddCarModal.tsx'), 'utf-8')

  return (
    <ComponentWrapper
      type="server"
      label="🔵 SERVER — Data Fetching Wrapper"
      sourceCode={serverSourceCode}
      componentName="CarTableServer.tsx"
    >
      <p className="text-xs text-blue-600 font-mono mb-3">
        ↳ Data fetched on the server. {cars.length} cars passed as props to the client table below.
        No API call from the browser — data arrives with the HTML.
      </p>
      <CarTableClient
        cars={cars}
        clientSourceCode={clientSourceCode}
        addCarModalSource={addCarModalSource}
      />
    </ComponentWrapper>
  )
}
