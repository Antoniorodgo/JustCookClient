import Ingrediente from './Ingrediente/Ingrediente'
import './RecetaFavorita.css'
import { useState } from "react";

function RecetaFavorita({ infoReceta, onEliminar }) {
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setShowModal(true); // Abrir modal
    };

    const confirmDelete = () => {
        setIsDeleting(true); // Activa animación fade-out

        setTimeout(() => {
            onEliminar(infoReceta.id);
            setShowModal(false);
        }, 400);
    };
    return (
        <>
            <article className={`receta ${isDeleting ? "fadeOut" : ""}`}>
                <h4>{infoReceta["titulo"]}</h4>
                <section id='dificultad-ingredientes'>
                    <p id='parrafo-dificultad'><strong>Dificultad: </strong>{infoReceta["dificultad"]}</p>
                </section>
                <p><strong>Descripcion: </strong> {infoReceta["descripcion"]}</p>
                <section>
                    <p><strong>Tiempo de preparacion:</strong> {infoReceta["tiempo_preparacion"]} min</p>
                    <br />
                    <p><strong>Numero de personas:</strong>{infoReceta["porciones"]}</p>
                </section>
                <section id='seccion-descripcion'>
                    <p><strong>Instrucciones: </strong></p>
                    <p>{infoReceta["instrucciones"]}</p>
                </section>
                <section>
                    <p><strong>Ingredientes: </strong></p>
                    {infoReceta.ingredientes.map((ingrediente, indice) => <Ingrediente key={indice} nombre={ingrediente} />)}
                </section>
                <section>
                    <button className='btnEliminar' onClick={handleDelete}>Eliminar de Favoritos</button>
                </section>
            </article>
            {showModal && (
                <div className="modalOverlay">
                    <div className="modalBox">
                        <p>¿Seguro que quieres eliminar esta receta?</p>
                        <div className="modalButtons">
                            <button className="btnCancelar" onClick={() => setShowModal(false)}>Cancelar</button>
                            <button className="btnConfirmar" onClick={confirmDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RecetaFavorita