import { useState } from 'react'

function InicioSesion() {
    const [usuario, setUsuario] = useState({
        email: '', // 👈 Cambié a 'email' para que coincida con tu API
        contraseña: ''
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
                credentials: 'include' // 👈 Importante para cookies
            })

            const data = await response.json()
            console.log(data)
            if (response.ok) {
                setMessage('✅ Inicio de sesión exitoso')
                // Guardar info del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(data.user))
                // Opcional: recargar o redirigir después de login exitoso
                setTimeout(() => {
                    window.location.reload() // o redirigir a otra página
                }, 1000)

            } else {
                setMessage(`❌ ${data.error}`)
            }
        } catch (error) {
            setMessage('❌ Error de conexión con el servidor')
            console.error('Error en login:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h3>¿Ya tienes cuenta? Inicia sesión</h3>
            {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        name="email" // 👈 Coincide con el estado
                        value={usuario.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="contraseña"
                        value={usuario.contraseña}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
        </>
    )
}

export default InicioSesion