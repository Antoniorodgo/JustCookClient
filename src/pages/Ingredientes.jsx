import React from 'react'

export const Ingredientes = () => {
  return (
    <div className="ingredientes-contenedor">
    <div> Mis ingredientes</div>
      
      <input type="text" placeholder="Buscar ingredientes..." 
        style={{
          padding: '10px',
          marginTop: '10px',
          width: '100%',
          maxWidth: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />
    </div>
  )
}
