import RecetaFavorita from '../components/MisRecetas/RecetaFavorita/RecetaFavorita'
import axios from 'axios'
import { useEffect } from 'react'

export const MisRecetas = () => {
  useEffect(() => {
    const conseguirReceteas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recetas')
        const data = response.data
        console.log(data)
      } catch (error) {
        console.error('Error al obtener recetas:', error)
      }
    }
    conseguirReceteas()
  }, [])
  return (
    <div>
      <RecetaFavorita />
    </div>
  )
}