import React from "react";
import styles from "./Nevera.module.css";

export const Nevera = () => {
    return (
        <div className={styles.nevera}>
            <h3>Mi nevera</h3>
            <div className={styles.inputBox}>
                <input type="text" placeholder="Añadir ingrediente..." />
                <button>➕</button>
            </div>
            <ul></ul>
        </div>
    );
};
