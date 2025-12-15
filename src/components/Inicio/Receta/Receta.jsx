import { useState } from 'react';
import Ingrediente from "../../MisRecetas/RecetaFavorita/Ingrediente/Ingrediente"


export function Receta({ infoReceta }) {
    const objetoStringUsuario = localStorage.getItem('user');
    const objetoUsuario = JSON.parse(objetoStringUsuario);
    const userId = objetoUsuario.id;

    // Estado para controlar si la receta es favorita
    const [esFavorita, setEsFavorita] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState('');

    // Función para añadir a favoritos
    const handleAñadirFavorito = async () => {
        // Evitar múltiples clicks
        if (cargando || esFavorita) return;

        setCargando(true);
        setMensaje('');

        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/${userId}/favoritas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receta_id: infoReceta.id
                })
            });

            const data = await response.json();

            if (response.ok) {
                setEsFavorita(true);
                setMensaje('¡Receta añadida a favoritos!');
                setTimeout(() => setMensaje(''), 3000);
            } else {
                // Manejar errores específicos
                if (response.status === 409) {
                    setMensaje('Esta receta ya está en tus favoritos');
                    setEsFavorita(true);
                } else {
                    setMensaje(data.error || 'Error al añadir a favoritos');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje('Error de conexión. Intenta nuevamente.');
        } finally {
            setCargando(false);
        }
    };
    return (
        <>
            <article className="receta">
                <h4>{infoReceta["titulo"]}</h4>
                <section id='dificultad-ingredientes'>
                    <p id='parrafo-dificultad'><strong>Dificultad: </strong>{infoReceta["dificultad"]}</p>
                </section>
                <p><strong>Descripcion: </strong> {infoReceta["descripcion"]}</p>
                <section>
                    <p><strong>Tiempo de preparacion:</strong> {infoReceta["tiempo_preparacion"]} min</p>
                    <br />
                    <p><strong>Numero de personas: </strong>{infoReceta["porciones"]}</p>
                </section>
                <section id='seccion-descripcion'>
                    <p><strong>Instrucciones: </strong></p>
                    <p>{infoReceta["instrucciones"]}</p>
                </section>
                <section>
                    <p><strong>Ingredientes: </strong></p>
                    {infoReceta.ingredientes.map((ingrediente, indice) =>
                        <Ingrediente key={indice} nombre={ingrediente} />
                    )}
                </section>
                <button
                    onClick={handleAñadirFavorito}
                    disabled={cargando || esFavorita}
                    className={esFavorita ? 'favorita-activa' : ''}
                >
                    {cargando ? 'Añadiendo...' :
                        esFavorita ? 'Añadida a favoritos' :
                            'Añadir a favoritos'}
                </button>
                {mensaje && (
                    <div className={`mensaje ${mensaje.includes('¡') ? 'exito' : 'error'}`}>
                        {mensaje}
                    </div>
                )}
            </article>
        </>
    )
}