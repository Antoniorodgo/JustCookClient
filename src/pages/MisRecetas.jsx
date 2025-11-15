import RecetaFavorita from '../components/MisRecetas/RecetaFavorita/RecetaFavorita'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const MisRecetas = () => {
  const [recetasFavoritas, setRecetasFavoritas] = useState([])
  // Conseguir el ID del usuario que esta logeado actualmente
  const objetoStringUsuario = localStorage.getItem('user')
  const objetoUsuario = JSON.parse(objetoStringUsuario)
  const idUsuarioLogeado = objetoUsuario.id

  useEffect(() => {
    const conseguirReceteasFavoritas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${idUsuarioLogeado}/favoritas`)
        const data = response.data
        setRecetasFavoritas(data.favoritas)
      } catch (error) {
        console.error('Error al obtener recetas:', error)
      }
    }
    conseguirReceteasFavoritas()
  }, [])
  const variable = 'funcioooonaaa esto de los props'


  return (
    <>
      {recetasFavoritas.map((receta, indice) =>
        <RecetaFavorita key={indice} infoReceta={receta} propDeTest={variable} />
      )}
    </>
  )
}