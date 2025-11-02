import { useState } from "react";
import styles from "./Nevera.module.css";

export function IngredientesInput({ onAdd }) {
    const [nuevoIngrediente, setNuevoIngrediente] = useState("");

    const handleAddClick = () => {
        onAdd(nuevoIngrediente);
        setNuevoIngrediente("");
    };

    return (
        <div className={style.ingredientesInput}>
            <h2>Añadir Ingrediente</h2>
            <div className={style.inputBox}>
                <input
                    type="text"
                    value={nuevoIngrediente}
                    onChange={(e) => setNuevoIngrediente(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddClick()}
                    placeholder="Escribe un ingrediente..."
                />
                <button onClick={handleAddClick}>➕</button>
            </div>
        </div>
    );
}
