import React from 'react'
import './Registro.css'

function Registro() {
    return (
        <>
            <h3>¿Aun no cuenta? Registrate </h3>
            <form action="">
                <div>
                    <label>Correo Electrónico</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" />
                </div>
            </form>
        </>
    )
}

export default Registro