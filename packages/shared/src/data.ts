import type { Car } from './types'

// NOTE: This is an in-memory store — data resets on server restart.
// Each framework app runs in its own Node.js process, so data is not shared between apps.
// This is intentional for the workshop — each app is a self-contained demo.

const seedData: Omit<Car, 'id'>[] = [
  { make: 'Tesla',      model: 'Model Y',    year: 2025, category: 'SUV',       horsepower: 299, fuelType: 'Electric', range: 533, wheelDrive: 'AWD', baggageCapacity: 854  },
  { make: 'Volkswagen', model: 'ID.4',        year: 2025, category: 'SUV',       horsepower: 286, fuelType: 'Electric', range: 522, wheelDrive: 'AWD', baggageCapacity: 543  },
  { make: 'Toyota',     model: 'bZ4X',        year: 2025, category: 'SUV',       horsepower: 218, fuelType: 'Electric', range: 516, wheelDrive: 'AWD', baggageCapacity: 452  },
  { make: 'Volkswagen', model: 'ID.7',        year: 2025, category: 'Sedan',     horsepower: 286, fuelType: 'Electric', range: 621, wheelDrive: 'FWD', baggageCapacity: 532  },
  { make: 'Tesla',      model: 'Model 3',     year: 2025, category: 'Sedan',     horsepower: 283, fuelType: 'Electric', range: 629, wheelDrive: 'RWD', baggageCapacity: 594  },
  { make: 'Volkswagen', model: 'ID.3',        year: 2025, category: 'Hatchback', horsepower: 204, fuelType: 'Electric', range: 557, wheelDrive: 'RWD', baggageCapacity: 385  },
  { make: 'Volvo',      model: 'EX40',        year: 2025, category: 'SUV',       horsepower: 231, fuelType: 'Electric', range: 490, wheelDrive: 'FWD', baggageCapacity: 419  },
  { make: 'Skoda',      model: 'Enyaq',       year: 2025, category: 'SUV',       horsepower: 210, fuelType: 'Electric', range: 568, wheelDrive: 'RWD', baggageCapacity: 585  },
  { make: 'BYD',        model: 'Sealion 7',   year: 2025, category: 'SUV',       horsepower: 390, fuelType: 'Electric', range: 482, wheelDrive: 'AWD', baggageCapacity: 520  },
  { make: 'Ford',       model: 'Explorer',    year: 2025, category: 'SUV',       horsepower: 286, fuelType: 'Electric', range: 566, wheelDrive: 'RWD', baggageCapacity: 450  },
  { make: 'Skoda',      model: 'Elroq',       year: 2025, category: 'SUV',       horsepower: 204, fuelType: 'Electric', range: 560, wheelDrive: 'RWD', baggageCapacity: 470  },
  { make: 'Volvo',      model: 'EX90',        year: 2025, category: 'SUV',       horsepower: 408, fuelType: 'Electric', range: 580, wheelDrive: 'AWD', baggageCapacity: 310  },
  { make: 'BMW',        model: 'iX',          year: 2025, category: 'SUV',       horsepower: 326, fuelType: 'Electric', range: 630, wheelDrive: 'AWD', baggageCapacity: 500  },
  { make: 'Hyundai',    model: 'IONIQ 5',     year: 2025, category: 'Crossover', horsepower: 225, fuelType: 'Electric', range: 507, wheelDrive: 'RWD', baggageCapacity: 531  },
  { make: 'Deepal',     model: 'S05',         year: 2025, category: 'SUV',       horsepower: 218, fuelType: 'Electric', range: 520, wheelDrive: 'FWD', baggageCapacity: 430  },
]

let idCounter = 1
const cars: Car[] = seedData.map((car) => ({
  ...car,
  id: String(idCounter++),
}))

export function getCars(): Car[] {
  return [...cars]
}

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id)
}

export function addCar(car: Omit<Car, 'id'>): Car {
  const newCar: Car = { ...car, id: String(idCounter++) }
  cars.push(newCar)
  return newCar
}

export function getCarStats() {
  const total = cars.length
  const avgRange = Math.round(cars.reduce((s, c) => s + c.range, 0) / total)
  const avgHp = Math.round(cars.reduce((s, c) => s + c.horsepower, 0) / total)
  const categories = [...new Set(cars.map((c) => c.category))]
  const makes = [...new Set(cars.map((c) => c.make))]
  return { total, avgRange, avgHp, categories: categories.length, makes: makes.length }
}
