import React from 'react'
import { Link } from 'react-router-dom'
import "../index.css";

export const Header = () => {
  return (
    <header >
      {/* Barra superior */}
      <div id="top" className="top-bar">
        <span>Bienvenido a nuestra web | La gestion de tu nevera como jamas lo imaginaste | Regístrate y disfruta</span><br />
      </div>
      {/* Header principal */}
      <div className="header-main">

        <div className="logo">JustCook</div>

        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/MisRecetas">Mis recetas</Link></li>
            <li><Link to="/MiNevera">Mi nevera</Link></li>
          </ul>
        </nav>

        <div>
          <Link to="/LoginRegistro" className="login-btn">Inicio Sesión</Link>

        </div>
      </div>
    </header>
  )
}
