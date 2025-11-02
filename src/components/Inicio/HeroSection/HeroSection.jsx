import React from "react";
import styles from "./HeroSection.module.css";
import { RecetasDisponibles } from "../RecetasDisponibles/RecetasDisponibles";
import { RecetasSugeridas } from "../RecetasSugeridas/RecetasSugeridas";
import { Nevera } from "../Nevera/Nevera";

export const HeroSection = () => {
    return (
        <section className={styles.hero}>
            {/* Lado izquierdo (por ahora vacío o informativo) */}
            <div className={styles.heroSide}>
                {/* Espacio para futuro contenido */}
            </div>

            {/* Zona central */}
            <div className={styles.heroCenter}>
                <div className="ingrediente-receta">
                    <h2>Ingrediente receta</h2>
                    {/* Aquí podrás mostrar el ingrediente seleccionado */}
                </div>

                {/* Sección de recetas disponibles */}
                <RecetasDisponibles />

                {/* Sección de recetas sugeridas */}
                <RecetasSugeridas />
            </div>

            {/* Lado derecho con la nevera */}
            <div className={`${styles.heroSide} ${styles.heroRight}`}>
                <Nevera />
            </div>
        </section>
    );
};
