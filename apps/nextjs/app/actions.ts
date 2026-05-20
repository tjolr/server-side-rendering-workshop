'use server'
// 'use server' marks this file as Server Actions — all exports run on the server, never in the browser.
// They can be called directly from client components (like AddCarModal) via a secure POST request Next.js sets up automatically.

import { addCar } from '@ssr-workshop/shared'
import type { Car } from '@ssr-workshop/shared'
import { revalidatePath } from 'next/cache'

// revalidatePath('/dynamic') tells Next.js to re-render the dynamic page — equivalent to Remix's post-action loader rerun.
export async function addCarAction(
  _prevState: { success: boolean; error?: string },
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const car: Omit<Car, 'id'> = {
      make:            String(formData.get('make') || '').trim(),
      model:           String(formData.get('model') || '').trim(),
      year:            Number(formData.get('year')),
      category:        String(formData.get('category') || '') as Car['category'],
      horsepower:      Number(formData.get('horsepower')),
      fuelType:        String(formData.get('fuelType') || '') as Car['fuelType'],
      range:           Number(formData.get('range')),
      wheelDrive:      String(formData.get('wheelDrive') || '') as Car['wheelDrive'],
      baggageCapacity: Number(formData.get('baggageCapacity')),
    }

    if (!car.make || !car.model || !car.year) {
      return { success: false, error: 'Make, model and year are required' }
    }

    addCar(car)
    revalidatePath('/dynamic')

    return { success: true }
  } catch (e) {
    return { success: false, error: String(e) }
  }
}
