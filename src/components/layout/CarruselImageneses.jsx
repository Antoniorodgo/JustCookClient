import React from 'react'

export const CarruselImagenes = () => {
  return (
    <>
      {/* Recetas disponibles */}
      <div className="recetas-disponibles">
        <h2>Recetas disponibles</h2>
        <div className="carousel">
          <button className="carousel-btn left">&#10094;</button>
          <div className="carousel-track">
            <div className="slide"><img src="receta1.jpg" alt="Receta 1" /></div>
            <div className="slide"><img src="receta2.jpg" alt="Receta 2" /></div>
            <div className="slide"><img src="receta3.jpg" alt="Receta 3" /></div>
            <div className="slide"><img src="receta4.jpg" alt="Receta 4" /></div>
          </div>
          <button className="carousel-btn right">&#10095;</button>
        </div>
      </div>

      {/* Más recetas sugeridas */}
      <div className="recetas-sugeridas">
        <h2>Más recetas sugeridas</h2>
        <div className="carousel">
          <button className="carousel-btn left">&#10094;</button>
          <div className="carousel-track">
            <div className="slide"><img src="receta1.jpg" alt="Receta 1" /></div>
            <div className="slide"><img src="receta2.jpg" alt="Receta 2" /></div>
            <div className="slide"><img src="receta3.jpg" alt="Receta 3" /></div>
            <div className="slide"><img src="receta4.jpg" alt="Receta 4" /></div>
          </div>
          <button className="carousel-btn right">&#10095;</button>
        </div>
      </div>
    </>
  )
}

