
import React, { useState, useEffect } from "react";

export const AsideNevera = () => {

  // variables internas del componente

  const [ingredientes, setIngredientes] = useState([]); // lista de ingredientes
  const [nuevoIngrediente, setNuevoIngrediente] = useState(""); // texto del input para añadir
  const [editandoId, setEditandoId] = useState(null); // guarda el id del ingrediente que se está editando
  const [nombreEditado, setNombreEditado] = useState(""); // guarda el nuevo nombre al editar
  const [cargando, setCargando] = useState(false); // muestra mensaje de carga
  const [error, setError] = useState(""); // muestra errores si hay problema con el servidor


  // FUNCIÓN PARA OBTENER TODOS LOS INGREDIENTES (GET)

  const obtenerIngredientes = async () => {
    setCargando(true);
    setError("");

    try {
      const respuesta = await fetch("/api/ingredientes/:userId");
      if (!respuesta.ok) throw new Error("Error al obtener ingredientes");
      const data = await respuesta.json();
      setIngredientes(data); // guardamos los ingredientes en el estado
    } catch (err) {
      console.error(err);
      setError("❌ Error al cargar los ingredientes.");
    } finally {
      setCargando(false);
    }
  };


  // CARGAR INGREDIENTES AUTOMÁTICAMENTE AL ABRIR LA PÁGINA

  useEffect(() => {
    obtenerIngredientes();
  }, []);


  // AÑADIR UN NUEVO INGREDIENTE (POST)

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nuevoIngrediente }),
      });

      if (!respuesta.ok) throw new Error("Error al añadir ingrediente");

      setNuevoIngrediente(""); // limpiamos el input
      obtenerIngredientes(); // recargamos la lista
    } catch (err) {
      console.error(err);
      setError("❌ Error al añadir el ingrediente.");
    } finally {
      setCargando(false);
    }
  };


  // ENTRAR EN MODO EDICIÓN

  const empezarEdicion = (id, nombreActual) => {
    setEditandoId(id);
    setNombreEditado(nombreActual);
  };


  // PARA GUARDAR CAMBIOS DE EDICIÓN (PUT)

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombreEditado }),
      });

      if (!respuesta.ok) throw new Error("Error al modificar ingrediente");

      // Salimos del modo edición
      setEditandoId(null);
      setNombreEditado("");
      obtenerIngredientes(); // recargamos la lista
    } catch (err) {
      console.error(err);
      setError("❌ Error al modificar el ingrediente.");
    } finally {
      setCargando(false);
    }
  };


  // ELIMINAR UN INGREDIENTE (DELETE)

  const eliminarIngrediente = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este ingrediente?")) return;

    setCargando(true);
    setError("");

    try {
      const respuesta = await fetch(`/api/ingredientes/:id${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) throw new Error("Error al eliminar ingrediente");

      obtenerIngredientes(); // recargamos la lista
    } catch (err) {
      console.error(err);
      setError("❌ Error al eliminar el ingrediente.");
    } finally {
      setCargando(false);
    }
  };


  // INTERFAZ DE USUARIO (HTML + estilos en JS)
 
  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>🥦 Gestor de Ingredientes</h1>

      {/* Sección para añadir un nuevo ingrediente */}
      <div style={styles.agregarSeccion}>
        <input
          type="text"
          placeholder="Escribe un nuevo ingrediente..."
          value={nuevoIngrediente}
          onChange={(e) => setNuevoIngrediente(e.target.value)}
          style={styles.input}
        />
        <button onClick={agregarIngrediente} style={styles.botonAgregar}>
          ➕ Añadir
        </button>
      </div>

      {/* Mensajes de carga o error */}
      {cargando && <p style={styles.mensaje}>Cargando...</p>}
      {error && <p style={{ ...styles.mensaje, color: "red" }}>{error}</p>}

      {/* Lista de ingredientes */}
      <div style={styles.lista}>
        {ingredientes.length === 0 ? (
          <p>No hay ingredientes todavía.</p>
        ) : (
          ingredientes.map((ing) => (
            <div key={ing.id} style={styles.ingrediente}>
              {editandoId === ing.id ? (
                // Si estamos editando este ingrediente, mostramos un input
                <>
                  <input
                    type="text"
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    style={styles.inputEditar}
                  />
                  <button onClick={() => guardarEdicion(ing.id)} style={styles.botonGuardar}>
                    💾 Guardar
                  </button>
                  <button onClick={() => setEditandoId(null)} style={styles.botonCancelar}>
                    ✖ Cancelar
                  </button>
                </>
              ) : (
                // Si no estamos editando, mostramos el nombre normal
                <>
                  <span>{ing.nombre}</span>
                  <div>
                    <button
                      onClick={() => empezarEdicion(ing.id, ing.nombre)}
                      style={styles.botonEditar}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => eliminarIngrediente(ing.id)}
                      style={styles.botonEliminar}
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


// CSS simple

const styles = {
  contenedor: {
    backgroundColor: "#f0f7ff",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  titulo: {
    color: "#2b4c7e",
    marginBottom: "20px",
  },
  agregarSeccion: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    gap: "10px",
  },
  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  lista: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    width: "400px",
    margin: "0 auto",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  ingrediente: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    borderBottom: "1px solid #eee",
    paddingBottom: "5px",
  },
  botonAgregar: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  botonEditar: {
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "4px 8px",
    marginRight: "5px",
  },
  botonGuardar: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "4px 8px",
    marginRight: "5px",
  },
  botonCancelar: {
    backgroundColor: "gray",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "4px 8px",
  },
  botonEliminar: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "4px 8px",
  },
  inputEditar: {
    padding: "6px",
    width: "150px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  mensaje: {
    color: "#555",
    fontSize: "14px",
  },
};


// EXPORTAMOS EL COMPONENTE

export default AsideNevera;
