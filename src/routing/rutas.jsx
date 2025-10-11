import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { Inicio } from "../pages/inicio";
import { Ingredientes } from "../pages/Ingredientes";
import { MiNevera } from "../pages/MiNevera";
import { MisRecetas } from "../pages/MisRecetas";

export const Rutas = () => {
    return (
        <BrowserRouter>
            {/*Layout*/}
            {/*Contenido central y rutas*/}
            <section>
                <Routes>
                    <Route path="/" element={<Inicio />}></Route>
                    <Route path="/MiNevera" element={<MiNevera />}></Route>
                    <Route path="/MisRecetas" element={<MisRecetas />}></Route>
                </Routes>
            </section>
        </BrowserRouter>
    )
}