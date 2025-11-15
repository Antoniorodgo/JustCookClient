import { Supermercados } from "../layout/Supermercados";
import { HeroSection } from "../components/Inicio/HeroSection/HeroSection";
import { RecetasDisponibles } from "../components/Inicio/RecetasDisponibles/RecetasDisponibles";
import { RecetasSugeridas } from "../components/Inicio/RecetasSugeridas/RecetasSugeridas";
import { Nevera } from "../components/Inicio/Nevera/Nevera";
import { useEffect } from "react";

export const Inicio = () => {

    const obtenerRecetas = async () => {
        const response = await fetch('http://localhost:3000/api/recetas')
        const data = await response.json()
        const arrayRecetas = data.recetas
        console.log(arrayRecetas)
    }

    useEffect(() => {
        const arrayDeRecetas = obtenerRecetas()

    }, [])

    return (
        <>
            <main>
                <HeroSection>
                    <RecetasDisponibles />
                    <RecetasSugeridas />
                    <Nevera />
                </HeroSection>
            </main>
            <Supermercados />
        </>
    );
};
