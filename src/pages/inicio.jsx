import React from "react";
import { Header } from "../layout/Header";
import { Supermercados } from "../layout/Supermercados";
import { Footer } from "../layout/footer";

export const Inicio = () => {
    return (
        <>
            <Header></Header>
            <main style={{ height: "1000px", padding: "40px" }}>
                {/* Hero Section */}
                <section className="hero">
                    {/* Div izquierdo (información futura) */}
                    <div className="hero-side hero-left">
                        {/* Aquí puedes agregar info adicional en el futuro */}
                    </div>

                    {/* Div central */}
                    <div className="hero-center">
                        {/* Ingrediente receta */}
                        <div className="ingrediente-receta">
                            <h2>Ingrediente receta</h2>
                            {/* Contenido de ingrediente en el futuro */}
                        </div>

                        {/* Recetas disponibles */}
                        <div className="recetas-disponibles">
                            <h2>Recetas disponibles</h2>
                            <div className="carousel">
                                <button className="carousel-btn left">&#10094;</button>
                                <div className="carousel-track">
                                    <div className="slide"><img src="receta1.jpg" alt="Receta 1" /></div>
                                    <div className="slide"><img src="receta2.jpg" alt="Receta 2" /></div>
                                    <div className="slide"><img src="receta3.jpg" alt="Receta 3" /></div>
                                    <div className="slide"><img src="receta4.jpg" alt="Receta 4" /></div>
                                </div>
                                <button className="carousel-btn right">&#10095;</button>
                            </div>
                        </div>

                        {/* Más recetas sugeridas / aleatorias */}
                        <div className="recetas-sugeridas">
                            <h2>Más recetas sugeridas</h2>
                            <div className="carousel">
                                <button className="carousel-btn left">&#10094;</button>
                                <div className="carousel-track">
                                    <div className="slide"><img src="receta1.jpg" alt="Receta 1" /></div>
                                    <div className="slide"><img src="receta2.jpg" alt="Receta 2" /></div>
                                    <div className="slide"><img src="receta3.jpg" alt="Receta 3" /></div>
                                    <div className="slide"><img src="receta4.jpg" alt="Receta 4" /></div>
                                </div>
                                <button className="carousel-btn right">&#10095;</button>
                            </div>
                        </div>
                    </div>

                    {/* Div derecho (información futura) */}
                    <div className="hero-side hero-right">
                        <div className="mi-nevera">
                            <h3>Mi nevera</h3>
                            <div className="input-box">
                                <input
                                    type="text"
                                    id="ingrediente-input"
                                    placeholder="Añadir ingrediente..."
                                />
                                <button id="add-btn">➕</button>
                            </div>
                            <ul id="lista-ingredientes"></ul>
                        </div>
                    </div>
                </section>
            </main>
            <Supermercados></Supermercados>
            <Footer></Footer>
        </>);
};
