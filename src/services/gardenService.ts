// services
import * as tokenService from './tokenService'

// types
import { GardenPlant, PlantAttributes } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/garden`

async function getAllPlants(): Promise<GardenPlant[]> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'GET',
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    })
    console.log(res)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch plants')
  }
}

export { getAllPlants }
