import styles from "./Nevera.module.css"

export function IngredientesLista({ ingredientes, onDelete, loadingDelete }) {
    console.log("IngredientesLista recibió:", ingredientes);

    // NORMALIZACIÓN: Convertir a array sin importar la estructura
    let ingredientesArray = [];

    if (ingredientes && ingredientes.ingredientes && Array.isArray(ingredientes.ingredientes)) {
        // Caso 1: {count: X, ingredientes: [...]}
        ingredientesArray = ingredientes.ingredientes;
    } else if (Array.isArray(ingredientes)) {
        // Caso 2: Array directo
        ingredientesArray = ingredientes;
    } else if (ingredientes) {
        // Caso 3: Objeto individual o algo inesperado
        ingredientesArray = [ingredientes];
    }

    console.log("Array normalizado para render:", ingredientesArray);

    return (
        <div className={styles.ingredientesLista}>
            <h2>Mi Nevera</h2>
            {ingredientesArray.length === 0 ? (
                <p className={styles.vacio}>No hay ingredientes añadidos todavía.</p>
            ) : (
                <ul>
                    {ingredientesArray.map((item, index) => (
                        <li key={item.id || index}>
                            <span>
                                {item.nombre}
                                {item.cantidad && ` - ${item.cantidad}`}
                                {item.fecha_caducidad && ` - Caduca: ${new Date(item.fecha_caducidad).toLocaleDateString()}`}
                            </span>
                            <button
                                onClick={() => onDelete(index)}
                                disabled={loadingDelete}
                            >
                                {loadingDelete ? "..." : "✖"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}