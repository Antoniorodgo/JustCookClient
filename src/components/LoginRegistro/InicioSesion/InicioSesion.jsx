import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function InicioSesion() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        email: '',
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
                credentials: 'include'
            })

            const data = await response.json()
            console.log(data)
            if (response.ok) {
                setMessage('Inicio de sesión exitoso')

                localStorage.setItem('user', JSON.stringify(data.user))
            } else {
                setMessage(`${data.error}`)
            }
        } catch (error) {
            setMessage('Error de conexión con el servidor')
            console.error('Error en login:', error)
        } finally {
            setLoading(false)
            navigate('/MisRecetas')
        }
    }

    return (
        <>
            <h3>¿Ya tienes cuenta? Inicia sesión</h3>
            {message && (
                <div className={`message ${message.includes('exitoso') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
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