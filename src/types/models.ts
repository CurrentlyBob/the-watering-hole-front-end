/* ---------===== custom models ====--------- */


export interface PlantAttributes {
  id: number
  plantApiId: number
  nickname: string
  scientific_name: string[]
  watering: string
  sunlight: string[]
  default_image: string
  plantAmount: number
  notes?: string | null
  plantLocation?: string | null
  profileId: number
  createdAt: string
  common_name: string
  updatedAt: string
}


export interface PlantApiItem {
  common_name: string
  cycle: string
  default_image: {
    license: 45
    license_name: string
    license_url: string
    medium_url: string
    original_url: string
    regular_url: string
    small_url: string
    thumbnail: string
  }
  id: number
  other_name: unknown
  scientific_name: string[]
  sunlight: string[]
  watering: string
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string
  photo?: string
  id: number
  createdAt: string
  updatedAt: string
}

export interface User {
  name: string
  email: string
  profile: { id: number }
  id: number
  createdAt: string
  updatedAt: string
}

export interface FormSubmitData {
  plantApiId: number
  common_name: string
  scientific_name: string
  watering: string
  sunlight: string
  default_image: string
  plantAmount: number
  notes: string
  plantLocation: string
  profileId: number
}

export interface GardenPlant {
  common_name: string
  createdAt: string
  default_image: string
  id: number
  notes: string
  plantAmount: number
  plantApiId: number
  plantLocation: string
  profileId: number
  scientific_name: string[]
  sunlight: string
  updatedAt: string
  watering: string
}
