import { useState, useEffect } from "react";
import { IngredientesLista } from "./IngredientesLista";
import { IngredientesInput } from "./IngredientesInput";
import styles from "./Nevera.module.css";
import axios from "axios";
export function Nevera() {
    import { useState, useEffect } from "react";
    import { IngredientesLista } from "./IngredientesLista";
    import { IngredientesInput } from "./IngredientesInput";
    import styles from "./Nevera.module.css";
    import axios from "axios";

    export function Nevera() {

        const [ingredientes, setIngredientes] = useState([]);
        const [error, setError] = useState(null);

        // Conseguir el id del usuario logeado
        const objetoStringUsuario = localStorage.getItem('user')
        const objetoUsuario = JSON.parse(objetoStringUsuario)
        const idUsuarioLogeado = objetoUsuario.id

        const jsonUser = JSON.parse(localStorage.getItem('user'));
        const userId = jsonUser.id;
        console.log(userId);

        useEffect(() => {
            const fetchIngredientes = async () => {
                try {
                    const res = await axios.get(`http://localhost:3000/api/ingredientes/${userId}`);
                    setIngredientes(res.data);
                    const res = await axios.get(`http://localhost:3000/api/ingredientes/${idUsuarioLogeado}`);
                    setIngredientes(res.data);
                } catch (err) {
                    setError("No se pudieron cargar tus alimentos.");
                    console.error(err);
                }
            };

            fetchIngredientes();
        }, [userId]); // Se vuelve a ejecutar si cambia el userId

        // función para añadir un nuevo ingrediente al backend y actualizar el estado
        const handleAdd = async (nuevoIngrediente) => {
            if (!nuevoIngrediente.nombre.trim()) return;
            try {
                const res = await axios.post(
                    `http://localhost:3000/api/ingredientes/${idUsuarioLogeado}`,
                    nuevoIngrediente
                );

                // Actualizamos la lista de ingredientes con la respuesta del back
                setIngredientes([...ingredientes, res.data]);
                // ✨ SOLUCIÓN: Usar la función de actualización del estado
                setIngredientes(prevIngredientes => [...prevIngredientes, res.data]);
            } catch (err) {
                console.error(err);
                console.error(err);
            }
        };
        // 3️⃣ Función para eliminar un ingrediente del backend y actualizar el estado
        const handleDelete = async (index) => {
            const ingrediente = ingredientes[index];
            try {
                // Petición DELETE al backend para eliminar el ingrediente por su ID
                await axios.delete(
                    `http://localhost:3000/api/ingredientes/${userId}/${idUsuarioLogeado}`
                );
                setIngredientes(ingredientes.filter((_, i) => i !== index));
            } catch (err) {
                console.error(err);
                console.error(err);
            }
        };
        return (
            <div className={styles.ingredientesContainer}>

                <IngredientesInput onAdd={handleAdd} />
                <IngredientesLista ingredientes={ingredientes} onDelete={handleDelete} />

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        );
    }
