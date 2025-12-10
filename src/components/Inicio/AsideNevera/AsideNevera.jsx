import React, { useState } from "react";
import "./AsideNevera.css";

export const AsideNevera = ({ ingredientes = [], setIngredientes }) => {
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");

  const agregarIngrediente = () => {
    const nombre = nuevoIngrediente.trim();
    if (!nombre) return alert("¡Escribe algo!");

    const nuevo = { id: Date.now(), nombre };
    setIngredientes([...ingredientes, nuevo]);
    setNuevoIngrediente("");
  };

  const editar = (id, nuevoNombre) => {
    const nombre = nuevoNombre.trim();
    if (!nombre) return;
    setIngredientes(ingredientes.map(ing => 
      ing.id === id ? { ...ing, nombre } : ing
    ));
    setEditandoId(null);
  };

  const eliminar = (id) => {
    if (confirm("¿Eliminar?")) {
      setIngredientes(ingredientes.filter(ing => ing.id !== id));
    }
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Nevera Virtual</h1>

      <div className="agregarSeccion">
        <input
          value={nuevoIngrediente}
          onChange={(e) => setNuevoIngrediente(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarIngrediente()}
          placeholder="Nuevo ingrediente..."
        />
        <button onClick={agregarIngrediente}>Añadir</button>
      </div>

      <div className="lista">
        {ingredientes.length === 0 ? (
          <p>Nevera vacía</p>
        ) : (
          ingredientes.map((ing) => (
            <div key={ing.id} className="ingrediente">
              {editandoId === ing.id ? (
                <>
                  <input
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && editar(ing.id, nombreEditado)}
                    autoFocus
                  />
                  <button onClick={() => editar(ing.id, nombreEditado)}>Guardar</button>
                  <button onClick={() => setEditandoId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <span>{ing.nombre}</span>
                  <button onClick={() => {
                    setEditandoId(ing.id);
                    setNombreEditado(ing.nombre);
                  }}>Editar</button>
                  <button onClick={() => eliminar(ing.id)}>Eliminar</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};