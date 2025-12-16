import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroCarrusel.module.css";

export const HeroCarrusel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const videoRefs = useRef([]);

    const slides = [
        {
            id: 1,
            type: "image",
            src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
            title: "Descubre recetas deliciosas",
            subtitle: "Encuentra inspiración para tu cocina"
        },
        {
            id: 2,
            type: "image",
            src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=600&w=1600",
            title: "Organiza tu nevera",
            subtitle: "No desperdicies los ingredientes de tu nevera"
        },
        {
            id: 3,
            type: "image",
            src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Come variado y saludable",
            subtitle: "Recetas balanceadas y fáciles"
        }
    ];


    // Auto-slide cada 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Reproducir/pausar videos
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            if (index === currentSlide) video.play();
            else video.pause();
        });
    }, [currentSlide]);

    return (
        <div className={styles.heroCarousel}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
                >
                    {slide.type === "image" ? (
                        <img src={slide.src} alt={slide.title} />
                    ) : (
                        <video
                            ref={el => videoRefs.current[index] = el}
                            loop
                            muted
                            playsInline
                        >
                            <source src={slide.src} type="video/mp4" />
                        </video>
                    )}
                    <div className={styles.overlay}></div>
                    <div className={`${styles.textOverlay} ${index === currentSlide ? styles.animateText : ""}`}>
                        <h2>{slide.title}</h2>
                        <p>{slide.subtitle}</p>
                    </div>
                </div>
            ))}

            {/* Dots de navegación */}
            <div className={styles.dots}>
                {slides.map((_, idx) => (
                    <span
                        key={idx}
                        className={`${styles.dot} ${idx === currentSlide ? styles.activeDot : ""}`}
                        onClick={() => setCurrentSlide(idx)}
                    />
                ))}
            </div>
        </div>
    );
};
