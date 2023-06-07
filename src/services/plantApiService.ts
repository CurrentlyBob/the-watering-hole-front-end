import axios from 'axios'
import * as tokenService from './tokenService'

import { FormSubmitData, PlantApiItem, PlantAttributes } from '../types/models'

const API_KEY = import.meta.env.VITE_PERENUAL_API_KEY
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/garden`

export async function getAllPlants(page: number): Promise<PlantApiItem[]> {
  try {
    const res = await axios.get(`https://perenual.com/api/species-list?key=${API_KEY}&page=${page}`)
    const data = res.data
    return data.data
  } catch (error) {
    throw new Error('Failed to get Plants')
  }
}

export async function searchPlants(query: string): Promise<PlantApiItem[]> {
  try {
    const res = await axios.get(`https://perenual.com/api/species-list?key=${API_KEY}&q=${query}`)
    const data = res.data
    return data.data
  } catch (error) {
    throw new Error('Failed to search Plants')
  }
}

export async function addPlant(plant: FormSubmitData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenService.getToken()}` },
    body: JSON.stringify(plant),
  })

  const json = await res.json()

  if (json.err) throw new Error(json.err)

  if (json.token) {
    tokenService.removeToken()
    tokenService.setToken(json.token)
  }
}
