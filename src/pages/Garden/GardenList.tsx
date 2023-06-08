import { useEffect, useState } from 'react'
import { getGardenPlants } from '../../services/gardenService'
import { GardenPlant } from '../../types/models'
import { Link } from 'react-router-dom'
import UpdateForm from '../../components/UpdateForm/UpdateForm'
 
// assets
import{ faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deletePlant } from '../../services/plantService'

const GardenList = () => {
  const [plants, setPlants] = useState<GardenPlant[]>([])
  const [editingPlantId, setEditingPlantId] = useState<number | null>(null)

  useEffect(() => {
    fetchPlants()
  }, [])
  const fetchPlants = async () => {
    try {
      const plantData = await getGardenPlants()
      setPlants(plantData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async(plantId: number) => {
    try {
      await deletePlant(plantId)
      fetchPlants()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (plantId: number) => {
    setEditingPlantId(plantId)
  }
  return (
    <>
    <div className='flex flex-col items-center justify-center h-full bg-gray-800 p-4'>
      <div>
        <h1 className="text-3xl mb-2">Your Garden</h1>
        {plants.length > 0 ? (
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-auto mb-5">
            {plants.map((plant) => (
              <div key={plant.id} className="flex flex-col items-center bg-green-700 p-4 rounded-md">
                {editingPlantId === plant.id ? (
                  <UpdateForm 
                  plant={plant} 
                  onCancel={() => setEditingPlantId(null)} 
                  onUpdate={fetchPlants}
                  
                  />
                ) : (
                  <>
                <h3>{plant.common_name}</h3>
                <div className='space-x-5'>
                <FontAwesomeIcon icon={faEdit} className='cursor-pointer' onClick={() => handleUpdate(plant.id)} />
                <FontAwesomeIcon icon={faTrash} className='cursor-pointer' onClick={() => handleDelete(plant.id)} />
                </div>
                <img className="w-1/2 h-auto mb-4 rounded-md shadow-lg" src={plant.default_image} alt={`${plant.common_name}'s Image`} />
                <p>Scientific Name: {plant.scientific_name}</p>
                <p>Amount: {plant.plantAmount}</p>
                <p>Location: {plant.plantLocation}</p>
                <p>Sunlight: {plant.sunlight}</p>
                <p>Watering: {plant.watering}</p>
                <p>Notes: {plant.notes}</p>
                  </>
                )} 
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
</>
  )
}
export default GardenList
