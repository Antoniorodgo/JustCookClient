import React from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { Routes, Route } from "react-router-dom";
import { Inicio } from "../pages/Inicio";
import { Ingredientes } from "../pages/Ingredientes";
import { MiNevera } from "../pages/MiNevera";
import { MisRecetas } from "../pages/MisRecetas";

export const Rutas = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Inicio />}></Route>
                    <Route path="/MiNevera" element={<MiNevera />}></Route>
                    <Route path="/MisRecetas" element={<MisRecetas />}></Route>
                </Routes>
            </main>
            <Footer />
        </>
    );
};