import Ingrediente from './Ingrediente/Ingrediente'
import './RecetaFavorita.css'

function RecetaFavorita({ receta }) {
    return (
        <>
            <article className="receta">
                <h4>{receta.tituloDelPlato}</h4>
                <section id='dificultad-ingredientes'>
                    <p id='parrafo-dificultad'>{receta.dificultad}</p>
                    <p>Te faltan {receta.numeroIngredientesQueFaltan}</p>
                </section>
                <p>{receta.descripcionBreve}</p>
                <section>
                    <p>{receta.tiempo} min</p>
                    <p>{receta.paraCuantos} personas</p>
                </section>
                <section id='seccion-descripcion'>
                    <p><strong>Descripcion</strong></p>
                    <p>{receta.descripcionExtendida}</p>
                </section>
                <section>
                    <p>Ingredientes:</p>
                    {receta.ingredientes.map((ingrediente, i) => <Ingrediente key={i} nombre={ingrediente} />)}

                </section>
            </article>
        </>
    )
}

export default RecetaFavorita