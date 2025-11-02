import React from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import { Inicio } from "../pages/Inicio";
import { Ingredientes } from "../pages/Ingredientes";
import { MiNevera } from "../pages/MiNevera";
import { MisRecetas } from "../pages/MisRecetas";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

export const Rutas = () => {
    return (
        <BrowserRouter>
            <Header></Header>
            <main>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/MiNevera" element={<MiNevera />} />
                    <Route path="/MisRecetas" element={<MisRecetas />} />
                </Routes>
            </main>
            <Footer></Footer>
        </BrowserRouter>
    )
}