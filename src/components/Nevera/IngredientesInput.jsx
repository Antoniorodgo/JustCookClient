import { useState } from "react";
import styles from "./Nevera.module.css";

export function IngredientesInput({ onAdd }) {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [caducidad, setCaducidad] = useState("");

    const handleAddClick = () => {
        if (nombre.trim() === "" || cantidad.trim() === "") {
            alert("Por favor, ingresa nombre y cantidad");
            return;
        }

        onAdd({
            nombre,
            cantidad,
            caducidad
        });

        setNombre("");
        setCantidad("");
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
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddClick()}
                    placeholder="Cantidad (ej: 200g, 1 unidad)..."
                />
                <input
                    type="date"
                    value={caducidad}
                    onChange={(e) => setCaducidad(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddClick()}
                />
                <button onClick={handleAddClick}>➕</button>
            </div>
        </div>
    );
}