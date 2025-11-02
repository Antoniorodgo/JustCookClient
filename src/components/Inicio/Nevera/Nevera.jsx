import React from "react";
import styles from "./Nevera.module.css";

export const Nevera = () => {
    return (
        <div className="mi-nevera">
            <h3>Mi nevera</h3>
            <div className="input-box">
                <input type="text" placeholder="Añadir ingrediente..." />
                <button>➕</button>
            </div>
            <ul></ul>
        </div>
    );
};
