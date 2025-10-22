import React from 'react'

function InicioSesion() {
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