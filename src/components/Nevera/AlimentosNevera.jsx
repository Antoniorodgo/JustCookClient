import React, { useState, useEffect } from "react";
import axios from "axios";
import { IngredientesLista } from "./IngredientesLista";

const AlimentosNevera = ({ userId }) => {
    // Estado local de alimentos
    const [alimentos, setAlimentos] = useState([]);
    const [error, setError] = useState(null);

    // Cargar alimentos del backend
    useEffect(() => {
        const fetchAlimentos = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/ingredientes/${userId}`
                );
                setAlimentos(response.data);
                setError(null);
            } catch (err) {
                setError("No se pudieron cargar los alimentos en Tu Nevera");
                console.error("Error: ", err);
            }
        };

        if (userId) fetchAlimentos(); // solo si userId existe
    }, [userId]);

    // Eliminar alimento localmente (si quieres eliminar en backend, usar axios.delete)
    const handleDelete = (index) => {
        setAlimentos(alimentos.filter((_, i) => i !== index));
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <IngredientesLista ingredientes={alimentos} onDelete={handleDelete} />
        </div>
    );
};

export default AlimentosNevera;
