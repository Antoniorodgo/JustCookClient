import Ingrediente from "../../MisRecetas/RecetaFavorita/Ingrediente/Ingrediente"

export function Receta({ infoReceta }) {
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
                    {infoReceta.ingredientes.map((ingrediente, indice) => <Ingrediente key={indice} nombre={ingrediente} />)}

                </section>
            </article>
        </>
    )
}
