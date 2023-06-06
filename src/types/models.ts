/* ---------===== custom models ====--------- */

export interface PlantAttributes {
  plantApiId: string;
  nickname: string;
  scientific: string[];
  watering: string;
  sunlight: string[];
  image: string;
  plantAmount: number;
  notes?: string | null;
  isFertilized: boolean;
  plantLocation?: string | null;
  profileId: number;
  createdAt: string;
  updatedAt: string;
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


