// services 
import * as tokenService from './tokenService'

// types
import { PlantAttributes } from '../types/models.ts'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/garden`

async function getAllPlants(): Promise<PlantAttributes[]> {
    try {
        const res = await fetch(BASE_URL, {
            headers: {'Authorization': `Bearer ${tokenService.getToken()}` }
        })
        const data = await res.json()
        return data as PlantAttributes[]
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch plants')
    }
}

export { getAllPlants }