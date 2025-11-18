import React, { useState, useEffect } from "react";
import "./asideNevera.css"; // Importamos el CSS externo

export const AsideNevera = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Obtener ingredientes
  const obtenerIngredientes = async () => {
    setCargando(true);
    setError("");
    try {
      const respuesta = await fetch("/api/ingredientes/:userId");
      if (!respuesta.ok) throw new Error("Error al obtener ingredientes");
      const data = await respuesta.json();
      setIngredientes(data);
    } catch (err) {
      console.error(err);
      setError("❌ Error al cargar los ingredientes.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerIngredientes();
  }, []);

  // Añadir ingrediente
  const agregarIngrediente = async () => {
    if (!nuevoIngrediente.trim()) {
      alert("Por favor, escribe un nombre de ingrediente.");
      return;
    }
    setCargando(true);
    setError("");
    try {
      const respuesta = await fetch("/api/ingredientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoIngrediente }),
      });
      if (!respuesta.ok) throw new Error("Error al añadir ingrediente");
      setNuevoIngrediente("");
      obtenerIngredientes();
    } catch (err) {
      console.error(err);
      setError("❌ Error al añadir el ingrediente.");
    } finally {
      setCargando(false);
    }
  };

  // Entrar en modo edición
  const empezarEdicion = (id, nombreActual) => {
    setEditandoId(id);
    setNombreEditado(nombreActual);
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    if (!nombreEditado.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    setCargando(true);
    setError("");
    try {
      const respuesta = await fetch(`/api/ingredientes/:id${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreEditado }),
      });
      if (!respuesta.ok) throw new Error("Error al modificar ingrediente");
      setEditandoId(null);
      setNombreEditado("");
      obtenerIngredientes();
    } catch (err) {
      console.error(err);
      setError("❌ Error al modificar el ingrediente.");
    } finally {
      setCargando(false);
    }
  };

  // Eliminar ingrediente
  const eliminarIngrediente = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este ingrediente?")) return;
    setCargando(true);
    setError("");
    try {
      const respuesta = await fetch(`/api/ingredientes/:id${id}`, { method: "DELETE" });
      if (!respuesta.ok) throw new Error("Error al eliminar ingrediente");
      obtenerIngredientes();
    } catch (err) {
      console.error(err);
      setError("❌ Error al eliminar el ingrediente.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">🥦 Gestor de Ingredientes</h1>

      <div className="agregarSeccion">
        <input
          type="text"
          placeholder="Escribe un nuevo ingrediente..."
          value={nuevoIngrediente}
          onChange={(e) => setNuevoIngrediente(e.target.value)}
          className="input"
        />
        <button onClick={agregarIngrediente} className="botonAgregar">➕ Añadir</button>
      </div>

      {cargando && <p className="mensaje">Cargando...</p>}
      {error && <p className="mensaje" style={{ color: "red" }}>{error}</p>}

      <div className="lista">
        {ingredientes.length === 0 ? (
          <p>No hay ingredientes todavía.</p>
        ) : (
          ingredientes.map((ing) => (
            <div key={ing.id} className="ingrediente">
              {editandoId === ing.id ? (
                <>
                  <input
                    type="text"
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    className="inputEditar"
                  />
                  <button onClick={() => guardarEdicion(ing.id)} className="botonGuardar">💾 Guardar</button>
                  <button onClick={() => setEditandoId(null)} className="botonCancelar">✖ Cancelar</button>
                </>
              ) : (
                <>
                  <span>{ing.nombre}</span>
                  <div>
                    <button onClick={() => empezarEdicion(ing.id, ing.nombre)} className="botonEditar">✏️</button>
                    <button onClick={() => eliminarIngrediente(ing.id)} className="botonEliminar">❌</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AsideNevera;
