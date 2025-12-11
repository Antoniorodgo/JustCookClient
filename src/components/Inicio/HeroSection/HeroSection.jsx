import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { AsideNevera } from "../AsideNevera/AsideNevera";
import { Receta } from "../Receta/Receta";

export const HeroSection = () => {
    const [recetas, setRecetas] = useState([]);
    const [recetasFiltradas, setRecetasFiltradas] = useState([]);
    const [ingredientesNevera, setIngredientesNevera] = useState([]);

    const obtenerRecetas = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/recetas");
            if (!response.ok) throw new Error("Error al obtener las recetas");
            const data = await response.json();
            const arrayRecetas = data.recetas;
            console.log(arrayRecetas);
            setRecetas(arrayRecetas);

            filtrarRecetasPorNevera(arrayRecetas, ingredientesNevera);
        } catch (error) {
            console.error(error);
        }
    };

    // Función para filtrar cada vez que cambie la nevera
    const filtrarRecetasPorNevera = (todasLasRecetas, ingredientesActuales) => {
        if (ingredientesActuales.length === 0) {
            setRecetasFiltradas([]);
            return;
        }

        const recetasQuePuedoHacer = todasLasRecetas.filter(receta => {
            if (!receta.ingredientes || !Array.isArray(receta.ingredientes)) return false;

           
            return receta.ingredientes.some(ingredienteReceta => {
                const nombreIng = ingredienteReceta.toLowerCase().trim();
                return ingredientesActuales.some(ingNevera =>
                    ingNevera.nombre.toLowerCase().includes(nombreIng) ||
                    nombreIng.includes(ingNevera.nombre.toLowerCase())
                );
            });
        });

        setRecetasFiltradas(recetasQuePuedoHacer);
    };

    useEffect(() => {
        obtenerRecetas();
    }, []);

    useEffect(() => {
        if (recetas.length > 0) {
            filtrarRecetasPorNevera(recetas, ingredientesNevera);
        }
    }, [ingredientesNevera, recetas]);

    return (
        <section className={styles.hero}>
            <div className={styles.heroCenter}>
                <div className="ingrediente-receta">
                    <h2>Recetas que puedes hacer con tu nevera</h2>

                    <p>
                        Tienes {ingredientesNevera.length} ingrediente(s) | 
                        Recetas posibles: {recetasFiltradas.length}
                    </p>

                    {recetas.length === 0 ? (
                        <p>Cargando recetas...</p>
                    ) : recetasFiltradas.length === 0 ? (
                        <p>Añade ingredientes a tu nevera para ver recetas</p>
                    ) : (
                        recetasFiltradas.map((receta, indice) => (
                            <Receta key={indice} infoReceta={receta} />
                        ))
                    )}
                </div>
            </div>

            <div className={`${styles.heroSide} ${styles.heroRight}`}>
                <AsideNevera 
                    ingredientes={ingredientesNevera}
                    setIngredientes={setIngredientesNevera}
                />
            </div>
        </section>
    );
};