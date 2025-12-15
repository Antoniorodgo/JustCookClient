import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../index.css";

export const Header = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userLS = localStorage.getItem('user');
    if (userLS) {
      setUsuario(JSON.parse(userLS));
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsuario(null);
    navigate('/');
  };

  // Enlaces de navegación
  const enlaces = [
    { path: "/", label: "Inicio", protegido: false },
    { path: "/MisRecetas", label: "Mis recetas", protegido: true },
    { path: "/MiNevera", label: "Mi nevera", protegido: true },
  ];

  return (
    <header>
      <div className="header-main">
        <div className="logo" >
          JustCook
        </div>

        {/* Navegación */}
        <nav>
          <ul>
            {enlaces.map((enlace, index) => {
              if (enlace.protegido && !usuario) return null;
              return (
                <li
                  key={index}
                  className={location.pathname === enlace.path ? "active" : ""}
                >
                  <Link to={enlace.path}>{enlace.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Botón login / cerrar sesión con nombre de usuario */}
        <div className="login-container">
          {!usuario ? (
            <Link to="/LoginRegistro" className="login-btn">
              Inicio de sesión
            </Link>
          ) : (
            <>
              <span style={{ marginRight: '12px', fontWeight: '500', color: '#333' }}>
                Nevera de "{usuario.nombre}"
              </span>
              <button className="login-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  )
}
