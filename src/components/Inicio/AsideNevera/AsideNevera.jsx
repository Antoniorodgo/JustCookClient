import React, { useState, useEffect } from "react";

export const AsideNevera = () => {

  // Obtención del userId 
  const userId =
    (typeof window !== "undefined" && window.__USER_ID__) ||
    localStorage.getItem("userId") ||
    null;

  // Estados del componente
  const [ingredientes, setIngredientes] = useState([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");


  // ======================
  //      GET Ingredientes
  // ======================
  const obtenerIngredientes = async () => {
    setCargando(true);
    setError("");

    try {
      // Ruta correcta según tu backend
      const ruta = userId
        ? `/api/ingredientes/${userId}`   // Ingredientes del usuario
        : `/api/ingredientes`;            // Todos los ingredientes

      const respuesta = await fetch(ruta);

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


  // ======================
  //      POST Ingrediente
  // ======================
  const agregarIngrediente = async () => {
    if (!nuevoIngrediente.trim()) {
      alert("Por favor, escribe un nombre de ingrediente.");
      return;
    }

    setCargando(true);
    setError("");

    try {
      // Ruta correcta del backend
      const ruta = userId
        ? `/api/ingredientes/${userId}`
        : `/api/ingredientes`;

      const respuesta = await fetch(ruta, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoIngrediente }) // SOLO nombre
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


  // ======================
  //      PUT Ingrediente
  // ======================
  const guardarEdicion = async (id) => {
    if (!nombreEditado.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }

    setCargando(true);
    setError("");

    try {
      const respuesta = await fetch(`/api/ingredientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreEditado }) // SOLO nombre
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


  // ======================
  //     DELETE Ingrediente
  // ======================
  const eliminarIngrediente = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este ingrediente?")) return;

    setCargando(true);
    setError("");

    try {
      const respuesta = await fetch(`/api/ingredientes/${id}`, {
        method: "DELETE"
      });

      if (!respuesta.ok) throw new Error("Error al eliminar ingrediente");

      obtenerIngredientes();
    } catch (err) {
      console.error(err);
      setError("❌ Error al eliminar el ingrediente.");
    } finally {
      setCargando(false);
    }
  };


  // ======================
  //       UI
  // ======================
  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>🥦 Gestor de Ingredientes</h1>

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

      {cargando && <p style={styles.mensaje}>Cargando...</p>}
      {error && <p style={{ ...styles.mensaje, color: "red" }}>{error}</p>}

      <div style={styles.lista}>
        {ingredientes.length === 0 ? (
          <p>No hay ingredientes todavía.</p>
        ) : (
          ingredientes.map((ing) => (
            <div key={ing.id} style={styles.ingrediente}>
              {editandoId === ing.id ? (
                <>
                  <input
                    type="text"
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    style={styles.inputEditar}
                  />
                  <button
                    onClick={() => guardarEdicion(ing.id)}
                    style={styles.botonGuardar}
                  >
                    💾 Guardar
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    style={styles.botonCancelar}
                  >
                    ✖ Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span>{ing.nombre}</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditandoId(ing.id);
                        setNombreEditado(ing.nombre);
                      }}
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
};


// ======= ESTILOS =======
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

export default AsideNevera;
