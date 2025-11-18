import styles from "./Nevera.module.css"
export function IngredientesLista({ ingredientes, onDelete }) {
    return (
        <div className={styles.ingredientesLista}>
            <h2>Mi Nevera</h2>
            {ingredientes.length === 0 ? (
                <p className={styles.vacio}>No hay ingredientes añadidos todavía.</p>
            ) : (
                <ul>
                    {ingredientes.ingredientes.map((item, index) => (
                        <li key={index}>
                            <span>{item.nombre} {item.peso && `- ${item.peso}`} {item.caducidad && `- ${item.caducidad}`}</span>
                            <button onClick={() => onDelete(index)}>✖</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
