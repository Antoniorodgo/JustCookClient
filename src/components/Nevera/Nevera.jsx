import { useState } from "react";
import {IngredientesLista} from "./IngredientesLista";
import {IngredientesInput} from "./IngredientesInput";
import styles from "./Nevera.module.css";

export function Nevera() {
    const [ingredientes, setIngredientes] = useState([]);

    // Añadir ingrediente
    const handleAdd = (nuevoIngrediente) => {
        if (nuevoIngrediente.trim() === "") return;
        setIngredientes([...ingredientes, nuevoIngrediente]);
    };

    // Eliminar ingrediente
    const handleDelete = (index) => {
        setIngredientes(ingredientes.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.ingredientesContainer}>
            <IngredientesLista ingredientes={ingredientes} onDelete={handleDelete} />
            <IngredientesInput onAdd={handleAdd} />
        </div>
    );
}

