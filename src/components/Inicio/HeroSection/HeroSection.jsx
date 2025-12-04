import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { AsideNevera } from "../AsideNevera/AsideNevera";
import { Receta } from "../Receta/Receta";

export const HeroSection = () => {
    const [recetas, setRecetas] = useState([]);
    const [recetasFiltradas, setRecetasFiltradas] = useState([]);

    // Ingrediente provisional para filtrar
    const ingredienteFiltro = 'mozzarella';

    const obtenerRecetas = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/recetas");
            if (!response.ok) {
                throw new Error("Error al obtener las recetas");
            }
            const data = await response.json();
            const arrayRecetas = data.recetas;
            console.log(arrayRecetas);
            setRecetas(arrayRecetas);

            // Filtrar las recetas por el ingrediente provisional
            const recetasConMozzarella = arrayRecetas.filter(receta => {
                // Verificar si la receta tiene ingredientes y si contiene 'mozzarella'
                // Convierte a minúsculas para hacer la búsqueda insensible a mayúsculas/minúsculas
                return receta.ingredientes &&
                    receta.ingredientes.some(ingrediente =>
                        ingrediente.toLowerCase().includes(ingredienteFiltro.toLowerCase())
                    );
            });

            setRecetasFiltradas(recetasConMozzarella);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerRecetas();
    }, []);

    return (
        <section className={styles.hero}>
            <div className={styles.heroCenter}>
                <div className="ingrediente-receta">
                    <h2>Recetas con {ingredienteFiltro}</h2>

                    {/* Mostrar estado del filtrado */}
                    <p>Total recetas: {recetas.length} | Recetas con {ingredienteFiltro}: {recetasFiltradas.length}</p>

                    {recetas.length === 0 ? (
                        <p>Cargando recetas...</p>
                    ) : recetasFiltradas.length === 0 ? (
                        <p>No hay recetas con {ingredienteFiltro}</p>
                    ) : (
                        recetasFiltradas.map((receta, indice) => (
                            <Receta key={indice} infoReceta={receta} />
                        ))
                    )}
                </div>
            </div>
            <div className={`${styles.heroSide} ${styles.heroRight}`}>
                <AsideNevera />
            </div>
        </section>
    );
};