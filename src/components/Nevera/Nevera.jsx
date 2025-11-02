import { useState } from "react";
import { IngredientesLista } from "./IngredientesLista";
import { IngredientesInput } from "./IngredientesInput";
import styles from "./Nevera.module.css";

export function Nevera() {
    const [ingredientes, setIngredientes] = useState([]);

    // Añadir ingrediente (ahora es un objeto)
    const handleAdd = (nuevoIngrediente) => {
        // Comprobar que el nombre no esté vacío
        if (!nuevoIngrediente.nombre || nuevoIngrediente.nombre.trim() === "") return;

        setIngredientes([...ingredientes, nuevoIngrediente]);
    };

    // Eliminar ingrediente
    const handleDelete = (index) => {
        setIngredientes(ingredientes.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.ingredientesContainer}>
            <IngredientesInput onAdd={handleAdd} />
            <IngredientesLista ingredientes={ingredientes} onDelete={handleDelete} />
        </div>
    );
}
