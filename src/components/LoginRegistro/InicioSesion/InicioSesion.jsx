import React from 'react'
import { useState } from 'react'

function InicioSesion() {
    const [usuario, setUsuario] = useState({
        correo: '',
        contraseña: ''
    })
    return (
        <>
            <h3>¿Ya tienes cuenta? Inicia sesion</h3>
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

export default InicioSesion