import { useState, ChangeEvent, FormEvent } from 'react'

import { addPlant, searchPlants } from '../../services/plantService'
import { FormSubmitData, PlantApiItem } from '../../types/models'

import { getUser } from '../../services/authService'

interface FormData {
  plantApiId: number
  nickname: string
  nicknameSearch: string
  scientific?: string
  watering: string
  sunlight: string
  image: string
  plantAmount: number
  notes: string | null
  plantLocation: string | null
  profileId: number
}

function AddPlantForm() {
  const [searchResults, setSearchResults] = useState<PlantApiItem[]>([])
  const [formData, setFormData] = useState<FormData>({
    plantApiId: 0,
    nickname: '',
    nicknameSearch: '',
    scientific: '',
    watering: '',
    sunlight: '',
    image: '',
    plantAmount: 0,
    notes: null,
    plantLocation: null,
    profileId: 0,
  })

  const handleSearch = async (query: string) => {
    try {
      const results = await searchPlants(query)
      setSearchResults(results)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePlantSelect = (plant: PlantApiItem) => {
    setFormData({
      ...formData,
      plantApiId: plant.id,
      nickname: plant.common_name,
      scientific: plant.scientific_name[0] ?? '',
      watering: plant.watering,
      sunlight: plant.sunlight[0] ?? '',
      image: plant.default_image.original_url,
      nicknameSearch: '',
    })

    setSearchResults([])
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = evt.target
    let newValue: string | boolean = value
    if (type === 'checkbox') {
      newValue = (evt.target as HTMLInputElement).defaultChecked
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))
  }

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()

    const user = await getUser()

    try {
      const transformFormData = (data: FormData): FormSubmitData => {
        return {
          plantApiId: data.plantApiId,
          common_name: data.nickname,
          scientific_name: data.scientific ?? '',
          watering: data.watering,
          sunlight: data.sunlight,
          default_image: data.image,
          plantAmount: data.plantAmount,
          notes: data.notes ?? '',
          plantLocation: data.plantLocation ?? '',
          profileId: user?.id ?? 0,
        }
      }

      const newData = transformFormData(formData)
      const res = await addPlant(newData)
      console.log('Plant Created', res)

      setFormData({
        plantApiId: 0,
        nickname: '',
        nicknameSearch: '',
        scientific: '',
        watering: '',
        sunlight: '',
        image: '',
        plantAmount: 0,
        notes: null,
        plantLocation: null,
        profileId: 0,
      })
    } catch (error) {
      console.log('Failed to create plant:', error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 max-w-2xl mx-auto">
        <label className="block text-gray-400 text-lg font-bold mb-2">Search Plants</label>
        <input
          type="text"
          placeholder="Search Plants"
          value={formData.nicknameSearch}
          onChange={(e) => {
            setFormData((prevData) => ({
              ...prevData,
              nicknameSearch: e.target.value,
            }))
            handleSearch(e.target.value)
          }}
          className="w-full border border-gray-400 rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="max-w-2xl mx-auto ">
        <ul>
          {searchResults &&
            searchResults.map((plant, index) => (
              <li
                className="bg-slate-500 m-2 hover:cursor-pointer hover:bg-slate-800 transition-all"
                key={index}
                onClick={() => handlePlantSelect(plant)}
              >
                {plant.common_name}
              </li>
            ))}
        </ul>
        <div className="m-4">
          <img src={formData.image} className="rounded-lg p-4 h-1/3" />
        </div>
        <div className="grid grid-cols-2">
          <div className="m-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">Common name</label>
            <input
              type="text"
              name="nickname"
              placeholder="Enter nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="m-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">Scientific Name</label>
            <input
              type="text"
              name="scientific"
              placeholder="Enter scientific name"
              value={formData?.scientific ?? ''}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="m-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">Watering</label>
            <input
              type="text"
              name="watering"
              placeholder="Enter watering instructions"
              value={formData.watering}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="m-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">Sunlight</label>
            <input
              type="text"
              name="sunlight"
              placeholder="Enter sunlight requirements"
              value={formData.sunlight ?? ''}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="m-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">Plant Amount</label>
            <input
              type="number"
              name="plantAmount"
              placeholder="Enter plant amount"
              value={formData.plantAmount}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="m-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">Notes</label>
            <textarea
              name="notes"
              placeholder="Enter notes"
              value={formData.notes || ''}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="m-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">Plant Location</label>
            <input
              type="text"
              autoComplete='false'
              name="plantLocation"
              placeholder="Enter plant location"
              value={formData.plantLocation || ''}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <button type="submit" className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddPlantForm
