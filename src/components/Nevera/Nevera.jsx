import { useState, useEffect } from "react";
import { IngredientesLista } from "./IngredientesLista";
import { IngredientesInput } from "./IngredientesInput";
import styles from "./Nevera.module.css";
import axios from "axios";

export function Nevera() {
    const [ingredientes, setIngredientes] = useState([]);
    const [error, setError] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);

    // Conseguir el id del usuario logeado
    const objetoStringUsuario = localStorage.getItem('user');
    const objetoUsuario = JSON.parse(objetoStringUsuario);
    const userId = objetoUsuario.id;

    const normalizarIngredientes = (data) => {
        if (data && data.ingredientes && Array.isArray(data.ingredientes)) {
            return data.ingredientes;
        } else if (Array.isArray(data)) {
            return data;
        } else if (data && data.ingrediente_usuario) {
            return [data.ingrediente_usuario];
        }
        return [];
    };

    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/ingredientes/${userId}`);
                console.log("Datos cargados del GET:", res.data);

                // Normalizar datos
                const ingredientesArray = normalizarIngredientes(res.data);
                console.log("Array normalizado:", ingredientesArray);

                // Guardar en estado manteniendo la estructura original si es necesario
                if (res.data && res.data.ingredientes && Array.isArray(res.data.ingredientes)) {
                    // Guardar como está para consistencia
                    setIngredientes(res.data);
                } else {
                    // Guardar como array
                    setIngredientes(ingredientesArray);
                }

            } catch (err) {
                setError("No se pudieron cargar tus alimentos.");
                console.error(err);
                setIngredientes([]);
            }
        };

        fetchIngredientes();
    }, [userId]);

    const handleAdd = async (nuevoIngrediente) => {
        if (!nuevoIngrediente.nombre.trim() || !nuevoIngrediente.cantidad) {
            setError("Por favor, ingresa nombre y cantidad");
            return;
        }

        try {
            const ingredienteData = {
                nombre: nuevoIngrediente.nombre,
                cantidad: nuevoIngrediente.cantidad,
                fecha_caducidad: nuevoIngrediente.caducidad || null
            };

            console.log("Enviando datos al POST:", ingredienteData);

            const res = await axios.post(
                `http://localhost:3000/api/ingredientes/${userId}`,
                ingredienteData
            );

            console.log("Respuesta del POST:", res.data);

            // ACTUALIZACIÓN DEL ESTADO - CORREGIDO
            if (res.data && res.data.ingrediente_usuario) {
                // Crear un objeto completo con el nombre que enviamos
                const ingredienteCompleto = {
                    ...res.data.ingrediente_usuario,
                    nombre: nuevoIngrediente.nombre  // ← AÑADIMOS EL NOMBRE AQUÍ
                };

                console.log("Ingrediente completo para añadir:", ingredienteCompleto);

                setIngredientes(prev => {
                    // Normalizar el estado anterior
                    const prevArray = normalizarIngredientes(prev);

                    // Añadir el nuevo ingrediente CON NOMBRE
                    const nuevoArray = [...prevArray, ingredienteCompleto];

                    // Si el estado anterior tenía estructura {ingredientes: [...]}
                    // mantener esa estructura
                    if (prev && prev.ingredientes && Array.isArray(prev.ingredientes)) {
                        return {
                            ...prev,
                            ingredientes: nuevoArray,
                            count: nuevoArray.length
                        };
                    }

                    // Si no, devolver array simple
                    return nuevoArray;
                });

                // Limpiar errores si todo fue bien
                setError(null);
                console.log("Ingrediente añadido exitosamente");
            } else {
                throw new Error("Respuesta inesperada del servidor");
            }

        } catch (err) {
            console.error("Error añadiendo ingrediente:", err);
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Error al añadir el ingrediente");
            }
        }
    };

    // Función para eliminar un ingrediente - SIN CAMBIOS
    const handleDelete = async (index) => {
        console.log("Eliminar ingrediente en índice:", index);

        // Obtener el ingrediente a eliminar
        const ingredientesArray = normalizarIngredientes(ingredientes);
        const ingredienteAEliminar = ingredientesArray[index];

        if (!ingredienteAEliminar) {
            setError("Ingrediente no encontrado");
            return;
        }
        const ingredienteId = ingredienteAEliminar.ingrediente_id || ingredienteAEliminar.id;
        if (!ingredienteId) {
            setError("No se pudo identificar el ingrediente a eliminar");
            return;
        }
        console.log("Eliminando - userId:", userId, "ingredienteId:", ingredienteId);
        setLoadingDelete(true);
        try {
            const res = await axios.delete(
                `http://localhost:3000/api/ingredientes/${userId}/${ingredienteId}`
            );
            console.log("Respuesta del DELETE:", res.data);
            // Actualizar estado local eliminando el ingrediente
            setIngredientes(prev => {
                const prevArray = normalizarIngredientes(prev);
                const nuevoArray = prevArray.filter((_, i) => i !== index);

                if (prev && prev.ingredientes && Array.isArray(prev.ingredientes)) {
                    return {
                        ...prev,
                        ingredientes: nuevoArray,
                        count: nuevoArray.length
                    };
                }
                return nuevoArray;
            });
            setError(null);
            console.log("Ingrediente eliminado exitosamente");
        } catch (err) {
            console.error("Error eliminando ingrediente:", err);
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <div className={styles.ingredientesContainer}>
            <IngredientesInput onAdd={handleAdd} />
            <IngredientesLista
                ingredientes={ingredientes}
                onDelete={handleDelete}
                loadingDelete={loadingDelete}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}