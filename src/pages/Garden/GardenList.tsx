import { useEffect, useState } from 'react'
import { getAllPlants } from '../../services/gardenService'
import { GardenPlant, PlantAttributes } from '../../types/models'
import { Link } from 'react-router-dom'

const GardenList = () => {
  const [plants, setPlants] = useState<GardenPlant[]>([])

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantData = await getAllPlants()
        console.log(plantData)
        setPlants(plantData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPlants()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center h-full bg-gray-800 p-4'>
      <div>
        <h1 className="text-3xl mb-2">Your Garden</h1>
        {plants.length > 0 ? (
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-auto mb-5">
            {plants.map((plant) => (
              <div key={plant.id} className="flex flex-col items-center bg-green-700 p-4 rounded-md">
                <h3>{plant.common_name}</h3>
                <img className="w-1/2 h-auto mb-4 rounded-md shadow-lg" src={plant.default_image} alt={`${plant.common_name}'s Image`} />
                <p>Scientific Name: {plant.scientific_name}</p>
                <p>Amount: {plant.plantAmount}</p>
                <p>Location: {plant.plantLocation}</p>
                <p>Sunlight: {plant.sunlight}</p>
                <p>Watering: {plant.watering}</p>
                <p>Notes: {plant.notes}</p>
              </div>
            ))}
          </ul>
        ) : (
          <p>No plants found in your garden :c</p>
        )}
      </div>
      <Link to="/add-plant" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Add a Plant
      </Link>
    </div>
  )
}

export default GardenList
