import RecetaFavorita from '../components/MisRecetas/RecetaFavorita/RecetaFavorita'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const MisRecetas = () => {
  const navigate = useNavigate()
  const [recetasFavoritas, setRecetasFavoritas] = useState([])
  const [loading, setLoading] = useState(true)

  // Conseguir el ID del usuario que esta logeado actualmente
  const objetoUsuario = JSON.parse(localStorage.getItem('user'))
  const idUsuarioLogeado = objetoUsuario?.id

  useEffect(() => {
    const conseguirReceteasFavoritas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${idUsuarioLogeado}/favoritas`)
        const data = response.data

        setRecetasFavoritas(data.favoritas)
      } catch (error) {
        console.error('Error al obtener recetas:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    conseguirReceteasFavoritas()
  }, [])

  const variable = 'funcioooonaaa esto de los props'

  // Mostrar mensaje mientras carga
  if (loading) {
    return <h2 className="cargando-recetas">Cargando recetas...</h2>
  }

  // Si no hay recetas
  if (!loading && recetasFavoritas.length === 0) {
    return <h3 className="sin-recetas">No tienes recetas favoritas todavia.</h3>
  }
  const eliminarRecetaFavorita = async (idReceta) => {
    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${idUsuarioLogeado}/favoritas/${idReceta}`);
      setRecetasFavoritas(prev => prev.filter(receta => receta.id !== idReceta)
      );
    } catch (error) {
      console.error("La receta no se ha podido eliminar de sus favoritos", error);
    }
  };
  return (
    <>
      {recetasFavoritas.map((receta) =>
        <RecetaFavorita
          key={receta.id}
          infoReceta={receta}
          onEliminar={eliminarRecetaFavorita}
          propDeTest={variable}
        />
      )}
    </>
  )
}
