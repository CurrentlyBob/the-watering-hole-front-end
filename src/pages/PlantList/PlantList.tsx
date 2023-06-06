import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface PlantListData {
  nickname: string
  scientific: string[]
  imgUrl: string
}

const PlantList: React.FC = () => {
  const [plants, setPlants] = useState<PlantListData[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get(
          `https://perenual.com/api/species-list?key=sk-NMIj647e5519e4a3a1163&page=${currentPage}`,
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
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 p-4">
      <h1 className="text-3xl mb-2">Plant List:</h1>
      <div className="grid grid-cols-5 gap-4 overflow-auto mb-5 bg-green-900 p-3 rounded-lg shadow-lg" style={{ maxHeight: '70vh' }}>
        {plants.map((plant, index) => (
          <div key={index} className="flex flex-col items-center bg-green-700 p-4 rounded-md">
            <img className="w-1/2 h-auto mb-4 rounded-md shadow-lg" src={plant.imgUrl} alt={plant.nickname} />
            <p className="mb-2 font-semibold">{plant.nickname}</p>
            <p className="text-sm text-gray-200">{plant.scientific.join(', ')}</p>
          </div>
        ))}
      </div>
      <div className="self-end mb-4 flex justify-center items-center">
        <button
          className="btn mx-2 px-4 py-2 rounded bg-green-500 text-white"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className="mx-2">{currentPage}</span>
        <button
          className="btn mx-2 px-4 py-2 rounded bg-green-500 text-white"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  )
}

export default PlantList
