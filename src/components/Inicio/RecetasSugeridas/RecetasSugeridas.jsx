import React from "react";
import styles from "./RecetasSugeridas.module.css";
export const RecetasSugeridas = () => {
    return (
        <div className={styles.recetasSugeridas}>
            <h2>Más recetas sugeridas</h2>
            <div className={styles.carousel}>
                <button className={`${styles.carouselBtn} ${styles.left}`}>&#10094;</button>
                <div className={styles.carouselTrack}>
                    <div className={styles.slide}><img src="receta1.jpg" alt="Receta 1" /></div>
                    <div className={styles.slide}><img src="receta2.jpg" alt="Receta 2" /></div>
                    <div className={styles.slide}><img src="receta3.jpg" alt="Receta 3" /></div>
                    <div className={styles.slide}><img src="receta4.jpg" alt="Receta 4" /></div>
                </div>
                <button className={`${styles.carouselBtn} ${styles.right}`}>&#10095;</button>
            </div>
        </div>
    );
};
