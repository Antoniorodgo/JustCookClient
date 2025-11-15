import Ingrediente from './Ingrediente/Ingrediente'
import './RecetaFavorita.css'

function RecetaFavorita({ infoReceta }) {

    return (
        <>
            <article className="receta">
                <h4>{infoReceta["titulo"]}</h4>
                <section id='dificultad-ingredientes'>
                    <p id='parrafo-dificultad'>{infoReceta["dificultad"]}</p>
                </section>
                <p>{infoReceta["descripcion"]}</p>
                <section>
                    <p>{infoReceta["tiempo_preparacion"]} min</p>
                    <p>{infoReceta["porciones"]} personas</p>
                </section>
                <section id='seccion-descripcion'>
                    <p>Descripcion</p>
                    <p>{infoReceta["instrucciones"]}</p>
                </section>
                <section>
                    <p>Ingredientes:</p>
                    {infoReceta.ingredientes.map((ingrediente, indice) => <Ingrediente key={indice} nombre={ingrediente} />)}

                </section>
            </article>
        </>
    )
}

export default RecetaFavorita