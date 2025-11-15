import React from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { Routes, Route } from "react-router-dom";
import { Inicio } from "../pages/inicio";
import { Ingredientes } from "../pages/Ingredientes";
import { MiNevera } from "../pages/MiNevera";
import { MisRecetas } from "../pages/MisRecetas";
import { LoginRegistro } from "../pages/LoginRegistro";
import Anadiringredientes from "../pages/Anadiringredientes";

export const Rutas = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/Anadiringredientes" element={<Anadiringredientes />}></Route>
                    <Route path="/" element={<Inicio />}></Route>
                    <Route path="/MiNevera" element={<MiNevera />}></Route>
                    <Route path="/MisRecetas" element={<MisRecetas />}></Route>
                    <Route path="/LoginRegistro" element={<LoginRegistro />}></Route>
                </Routes>
            </main>
            <Footer />
        </>
    );
};