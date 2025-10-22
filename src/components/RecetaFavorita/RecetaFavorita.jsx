import Ingrediente from '../Ingrediente/Ingrediente'
import './RecetaFavorita.css'

function RecetaFavorita() {
    const data = {
        "tituloDelPlato": "Pasta al ajo y aceite",
        "dificultad": "fácil",
        "descripcionBreve": "Un plato rápido y sabroso con pocos ingredientes.",
        "descripcionExtendida": "Esta receta italiana clásica combina pasta, ajo, aceite de oliva y un toque de picante. Es perfecta para preparar en menos de 20 minutos cuando tienes poco tiempo pero quieres algo delicioso y reconfortante.",
        "tiempo": 20,
        "paraCuantos": 2,
        "ingredientes": [
            "pasta",
            "ajo",
            "aceite de oliva",
            "guindilla",
            "Sal",
            "Perejil"
        ],
        "numeroIngredientesQueFaltan": 1
    }
    return (
        <>
            <article className="receta">
                <h4>{data["tituloDelPlato"]}</h4>
                <section id='dificultad-ingredientes'>
                    <p id='parrafo-dificultad'>{data["dificultad"]}</p>
                    <p>Te faltan {data["numeroIngredientesQueFaltan"]}</p>
                </section>
                <p>{data["descripcionBreve"]}</p>
                <section>
                    <p>{data["tiempo"]} min</p>
                    <p>{data["paraCuantos"]} personas</p>
                </section>
                <section id='seccion-descripcion'>
                    <p>Descripcion</p>
                    <p>{data["descripcionExtendida"]}</p>
                </section>
                <section>
                    <p>Ingredientes:</p>
                    {data.ingredientes.map((ingrediente, indice) => <Ingrediente key={indice} nombre={ingrediente} />)}

                </section>
            </article>
        </>
    )
}

export default RecetaFavorita