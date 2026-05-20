export interface Car {
  id: string
  make: string
  model: string
  year: number
  category: 'SUV' | 'Sedan' | 'Hatchback' | 'Crossover' | 'Wagon'
  horsepower: number
  fuelType: 'Electric' | 'Hybrid' | 'Petrol' | 'Diesel'
  range: number           // km WLTP
  wheelDrive: 'AWD' | 'RWD' | 'FWD'
  baggageCapacity: number // liters
}
