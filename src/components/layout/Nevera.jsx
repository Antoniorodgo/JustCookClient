import { useState } from "react";

// Componente principal
export function Nevera() {
    // Estado que guarda todos los ingredientes de la lista
    const [ingredientes, setIngredientes] = useState([]);

    // Estado que guarda el valor actual del input (el ingrediente que estoy escribiendo)
    const [nuevoIngrediente, setNuevoIngrediente] = useState("");

    // Función para añadir un ingrediente a la lista
    const handleAdd = () => {
        // Si el input está vacío, no hacer nada
        if (nuevoIngrediente.trim() === "") return;

        // Creamos una nueva lista con los anteriores + el nuevo ingrediente
        setIngredientes([...ingredientes, nuevoIngrediente]);

        // Limpiamos el input después de añadir
        setNuevoIngrediente("");
    };

    // Función para eliminar un ingrediente según su posición (index)
    const handleDelete = (index) => {
        // Filtramos todos los ingredientes excepto el que tiene el índice que queremos borrar
        setIngredientes(ingredientes.filter((_, i) => i !== index));
    };

    return (
        <div className="ingredientes-container">
            {/* 📌 LISTADO DE INGREDIENTES */}
            <div className="ingredientes-lista">
                <h2>Mi Nevera</h2>

                {/* Si la lista está vacía mostramos un mensaje */}
                {ingredientes.length === 0 ? (
                    <p className="vacio">No hay ingredientes añadidos todavía.</p>
                ) : (
                    // Si hay ingredientes, los recorremos con .map()
                    <ul>
                        {ingredientes.map((item, index) => (
                            <li key={index}>
                                {/* Mostramos el nombre del ingrediente */}
                                <span>{item}</span>

                                {/* Botón para eliminar el ingrediente */}
                                <button onClick={() => handleDelete(index)}>✖</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 📌 INPUT PARA AÑADIR NUEVOS INGREDIENTES */}
            <div className="ingredientes-input">
                <h2>Añadir Ingrediente</h2>

                <div className="input-box">
                    {/* Input controlado: su valor depende del estado "nuevoIngrediente" */}
                    <input
                        type="text"
                        value={nuevoIngrediente}
                        onChange={(e) => setNuevoIngrediente(e.target.value)} // Cada vez que escribimos, actualizamos el estado
                        onKeyPress={(e) => e.key === "Enter" && handleAdd()} // Si presionamos "Enter", se añade automáticamente
                        placeholder="Escribe un ingrediente..."
                    />

                    {/* Botón para añadir el ingrediente */}
                    <button onClick={handleAdd}>➕</button>
                </div>
            </div>
        </div>
    );
}

