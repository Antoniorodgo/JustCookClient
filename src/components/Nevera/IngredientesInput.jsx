import { useState } from "react";
import styles from "./Nevera.module.css";

export function IngredientesInput({ onAdd }) {
    const [nombre, setNombre] = useState("");
    const [peso, setPeso] = useState("");
    const [caducidad, setCaducidad] = useState("");


    const handleAddClick = () => {
        if(nombre.trim() === "") return; //no agrega si el nombre esta vacio

        onAdd({nombre, peso, caducidad});
        setNombre("");
        setPeso("");
        setCaducidad("");
    };

    return (
        <div className={styles.ingredientesInput}>
            <h2>Añadir producto a tu nevera</h2>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddClick()}
                    placeholder="Nombre del producto..."
                />
                <input
                    type="text"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddClick()}
                    placeholder="Peso del producto..."
                />
                <input
                    type="date"
                    value={caducidad}
                    onChange={(e) => setCaducidad(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddClick()}
                    placeholder="Caducidad del producto..."
                />
                <button onClick={handleAddClick}>➕</button>
            </div>
        </div>
    );
}
