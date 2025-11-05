import { Supermercados } from "../layout/Supermercados";
import { HeroSection } from "../components/Inicio/HeroSection/HeroSection";
import { RecetasDisponibles } from "../components/Inicio/RecetasDisponibles/RecetasDisponibles";
import { RecetasSugeridas } from "../components/Inicio/RecetasSugeridas/RecetasSugeridas";
import { Nevera } from "../components/Inicio/Nevera/Nevera";

export const Inicio = () => {
    return (
        <>
            <main>
                <HeroSection>
                    <RecetasDisponibles />
                    <RecetasSugeridas />
                    <Nevera />
                </HeroSection>
            </main>
            {/*  <Supermercados /> */}
        </>
    );
};
