import React, { useEffect, useState } from 'react'
import axios from 'axios'


interface PlantListData {
    nickname: string;
    scientific: string[];
    imgUrl: string;
  }


const PlantList: React.FC = () => {
    const [plants, setPlants] = useState<PlantListData[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const res = await axios.get(`https://perenual.com/api/species-list?key=sk-VpYZ647e3114a80431145&page=${currentPage}`
                )
                const data = res.data
                const transformedData = data.data.map((plant: any) => {
                    return {
                        nickname: plant.common_name,
                        scientific: plant.scientific_name,
                        imgUrl: plant.default_image.medium_url,
                    }
                })
                setPlants(transformedData)
            } catch (error) {
                console.log('Fetch Error', error)
            }
        }
        
        fetchPlants()
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (plants.length === 0) {
        return <h1>loading...</h1>
    }

    return ( 
        <div>
            <h1>Plant List:</h1>
            <ul>
                {plants.map((plant, index) => (
                    <li key={index}>
                        <img src={plant.imgUrl} alt={plant.nickname} />
                        <div>
                            <p>Nickname: {plant.nickname}</p>
                            <p>Scientific Name: {plant.scientific.join(', ')}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous Page
                </button>
                <span>Page {currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>
                    Next Page
                </button>
            </div>
        </div>

     );
}
 
export default PlantList;

