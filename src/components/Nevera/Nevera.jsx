import { useState, useEffect } from "react"; // useState para manejar estado local, useEffect para efectos secundarios (cargar datos)
import { IngredientesLista } from "./IngredientesLista"; // Componente que muestra la lista de ingredientes
import { IngredientesInput } from "./IngredientesInput"; // Componente que permite añadir ingredientes
import styles from "./Nevera.module.css"; // Estilos CSS del componente
import axios from "axios"; // Librería para hacer peticiones HTTP al backend

export function Nevera({ userId }) {
    // Estado local para almacenar los ingredientes del usuario
    const [ingredientes, setIngredientes] = useState([]);
    // Estado para manejar errores al cargar o modificar ingredientes
    const [error, setError] = useState(null);

    // 1️⃣ Cargar ingredientes desde el backend cuando el componente se monta o cambia el userId
    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                // Petición GET a la API para traer los ingredientes del usuario
                const res = await axios.get(`http://localhost:3000/api/ingredientes/${userId}`);
                setIngredientes(res.data); // Guardamos los ingredientes en el estado
            } catch (err) {
                // Si hay un error, lo guardamos en el estado para mostrarlo
                setError("No se pudieron cargar tus alimentos.");
                console.error(err);
            }
        };

        fetchIngredientes(); // Llamamos a la función de carga
    }, [userId]); // Se vuelve a ejecutar si cambia el userId

    // 2️⃣ Función para añadir un nuevo ingrediente al backend y actualizar el estado
    const handleAdd = async (nuevoIngrediente) => {
        // Evita añadir ingredientes sin nombre
        if (!nuevoIngrediente.nombre.trim()) return;

        try {
            // Petición POST al backend enviando el nuevo ingrediente
            const res = await axios.post(
                `http://localhost:3000/api/ingredientes/${userId}`,
                nuevoIngrediente
            );

            // Actualizamos la lista de ingredientes con la respuesta del backend
            setIngredientes([...ingredientes, res.data]);
        } catch (err) {
            console.error(err); // Mostramos errores en consola
        }
    };

    // 3️⃣ Función para eliminar un ingrediente del backend y actualizar el estado
    const handleDelete = async (index) => {
        const ingrediente = ingredientes[index]; // Obtenemos el ingrediente a eliminar

        try {
            // Petición DELETE al backend para eliminar el ingrediente por su ID
            await axios.delete(
                `http://localhost:3000/api/ingredientes/${userId}/${ingrediente.id}`
            );

            // Actualizamos el estado eliminando el ingrediente de la lista
            setIngredientes(ingredientes.filter((_, i) => i !== index));
        } catch (err) {
            console.error(err); // Mostramos errores en consola
        }
    };

    return (
        <div className={styles.ingredientesContainer}>
            {/* Formulario para añadir ingredientes */}
            <IngredientesInput onAdd={handleAdd} />

            {/* Lista de ingredientes con opción de eliminar */}
            <IngredientesLista ingredientes={ingredientes} onDelete={handleDelete} />

            {/* Mostrar error si ocurre alguno */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
