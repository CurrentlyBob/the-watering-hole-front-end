/* ---------==== custom forms ====--------- */

export interface AddPlantFormData {
  plantApiId: string
  nickname: string
  scientific: string[]
  watering: string
  sunlight: string[]
  image: string
  plantAmount: number
  notes?: string | null
  plantLocation?: string | null
  profileId: number
}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  name: string
  email: string
  password: string
  passwordConf: string
}

export interface ChangePasswordFormData {
  curPassword: string
  newPassword: string
  newPasswordConf: string
}

export interface PhotoFormData {
  photo: File | null
}
