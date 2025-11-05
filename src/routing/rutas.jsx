import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { Inicio } from "../pages/inicio";
import { MiNevera } from "../pages/MiNevera";
import { MisRecetas } from "../pages/MisRecetas";
import { LoginRegistro } from "../pages/LoginRegistro";

export const Rutas = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
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