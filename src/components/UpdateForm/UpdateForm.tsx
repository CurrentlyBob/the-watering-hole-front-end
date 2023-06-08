import React, { useEffect, useState } from 'react'
import { updatePlant } from '../../services/plantService'
import { GardenPlant } from '../../types/models'

type UpdateFormProps = {
  plant: GardenPlant
  onCancel: () => void
  onUpdate: () => void
}

const UpdateForm = ({ plant, onCancel, onUpdate }: UpdateFormProps) => {
  const [updatedPlant, setUpdatedPlant] = useState<GardenPlant>({
    ...plant,
  })

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    try {
      console.log('Updated Plant On Submit', updatedPlant)
      await updatePlant(updatedPlant)
      onUpdate()
      onCancel()
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target
    setUpdatedPlant((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    setUpdatedPlant(plant)
  }, [plant])

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Update Plant</h2>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Common Name:</label>
        <input
          type="text"
          name="common_name"
          value={updatedPlant.common_name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />{' '}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Scientific Name:</label>
        <input
          type="text"
          name="scientific_name"
          value={updatedPlant.scientific_name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Watering:</label>
        <input
          type="text"
          name="watering"
          value={updatedPlant.watering}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />{' '}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Sunlight:</label>
        <input
          type="text"
          name="sunlight"
          value={updatedPlant.sunlight}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />{' '}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Image:</label>
        <input
          type="text"
          name="default_image"
          value={updatedPlant.default_image}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />{' '}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Plant Amount:</label>
        <input
          type="number"
          name="plantAmount"
          value={updatedPlant.plantAmount}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />{' '}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Notes:</label>
        <textarea
          name="notes"
          value={updatedPlant.notes || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />{' '}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Plant Location:</label>
        <input
          type="text"
          name="plantLocation"
          value={updatedPlant.plantLocation || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />{' '}
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Plant
        </button>
        <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default UpdateForm
