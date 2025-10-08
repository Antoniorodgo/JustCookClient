import React from "react";  
import { Routes, Route, BrowserRouter, Navigate, Link} from "react-router-dom";
import { Inicio } from "../components/pages/Inicio";
import { Ingredientes } from "../components/pages/Ingredientes";
import  {MiNevera}  from "../components/pages/MiNevera";
import { MisRecetas } from "../components/pages/MisRecetas";

export const Rutas =() => {
    return (
        <BrowserRouter>
            {/*Layout*/}

            {/*Contenido central y rutas*/}

            <section>
                <Routes>
                    <Route path="/" element={<Inicio/>}></Route>
                    <Route path="/MiNevera" element={<MiNevera/>}></Route>
                    <Route path="/MisRecetas" element={<MisRecetas/>}></Route>
                </Routes>

            </section>

        </BrowserRouter>
    )
}