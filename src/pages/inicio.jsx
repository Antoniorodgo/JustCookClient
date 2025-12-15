import { HeroSection } from "../components/Inicio/HeroSection/HeroSection";
import { useEffect } from "react";
import { HeroCarrusel } from "../layout/HeroCarrusel/HeroCarrusel";

export const Inicio = () => {



    return (
        <>
            <main>
                <HeroCarrusel />
                <HeroSection />
            </main>
        </>
    );
};
