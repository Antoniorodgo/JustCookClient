import RecetaFavorita from '../components/MisRecetas/RecetaFavorita/RecetaFavorita'
import axios from 'axios'
import { useEffect ,useState} from 'react'

export const MisRecetas = () => {
  const [recetasFavoritas, setRecetasFavoritas] = useState([])

  useEffect(() => {
    const [conseguirReceteas] = async () => {
      try {
        const response = await axios.get('https://tu-api.com/usuarios/1/favoritas')
        const data = response.data
      } catch (error) {
        console.error('Error al obtener recetas:', error)
      }
    }
    conseguirReceteas()
  }, [])
  return (
    <div>
      <h2>Mis Recetas Favoritas</h2>

      {recetasFavoritas.length === 0 ? (
        <p>No tienes recetas favoritas aún.</p>
      ) : (
        recetasFavoritas.map((receta) => (
          <RecetaFavorita key={receta.id} receta={receta} />
        ))
      )}
    </div>
  )
}