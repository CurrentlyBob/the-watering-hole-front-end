import styles from './GardenList.module.css'
import { useEffect, useState } from 'react';
import { getAllPlants } from '../../services/gardenService';
import { PlantAttributes } from '../../types/models';


const GardenList = ( ) => {
    const [plants, setPlants] = useState<PlantAttributes[]>([])

    useEffect(() => {
    const fetchPlants = async () => {
        try {
            const plantData = await getAllPlants()
            setPlants(plantData)          
        } catch (error) {
            console.log(error)
        }
    }
    fetchPlants()
}, [])
    return (
        <div>
            <h2>Your Garden</h2>
            {plants.length > 0 ? (
                <ul>
                    {plants.map((plant) => (
                        <li key={plant.id}>
                            <h3>{plant.common_name}</h3>
                            <p>Scientific Name: {plant.scientific_name}</p>
                            {plant.default_image && plant.default_image.thumbnail && (
                            <img src={plant.default_image.thumbnail} alt={plant.common_name} />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No plants found in your garden :c</p>
            )}
        </div>
     );
}
 
export default GardenList;