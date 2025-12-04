import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../index.css";

export const Header = () => {

  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userLS = localStorage.getItem('user');
    setUsuario(userLS);
  }, []);

  // 🔵 Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsuario(null);
    navigate('/'); // redirige al inicio
  };

  return (
    <header>
      {/*  <div id="top" className="top-bar">
        <span>Bienvenido a nuestra web | La gestión de tu nevera como jamás lo imaginaste | Regístrate y disfruta</span><br />
      </div> */}

      <div className="header-main">

        <div className="logo">JustCook</div>

        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            {usuario !== null && <li><Link to="/MisRecetas">Mis recetas</Link></li>}
            {usuario !== null && <li><Link to="/MiNevera">Mi nevera</Link></li>}
          </ul>
        </nav>

        <div>
          {usuario === null ? (
            <Link to="/LoginRegistro" className="login-btn">
              Inicio de sesión
            </Link>
          ) : (
            <button className="login-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </div>

      </div>
    </header>
  )
}
