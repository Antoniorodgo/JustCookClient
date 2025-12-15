import React, { useState } from "react";
import "./AsideNevera.css";

export const AsideNevera = ({ ingredientes = [], setIngredientes }) => {
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");

  // Estados para el modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [accionConfirmada, setAccionConfirmada] = useState(null);

  // Función para mostrar modal de mensaje simple
  const mostrarMensaje = (mensaje) => {
    setMensajeModal(mensaje);
    setMostrarModal(true);
  };

  const agregarIngrediente = () => {
    const nombre = nuevoIngrediente.trim();
    if (!nombre) return mostrarMensaje("¡Sin ingrediente no hay receta!");

    const nuevo = { id: Date.now(), nombre };
    setIngredientes([...ingredientes, nuevo]);
    setNuevoIngrediente("");
  };

  const editar = (id, nuevoNombre) => {
    const nombre = nuevoNombre.trim();
    if (!nombre) return mostrarMensaje("¡El nombre no puede estar vacío!");
    setIngredientes(
      ingredientes.map(ing =>
        ing.id === id ? { ...ing, nombre } : ing
      )
    );
    setEditandoId(null);
  };

  const eliminar = (id) => {
    // Mostramos modal de confirmación
    setMensajeModal("¿Deseas eliminar el ingrediente?");
    setAccionConfirmada(() => () => {
      setIngredientes(ingredientes.filter(ing => ing.id !== id));
    });
    setMostrarModal(true);
  };

  const handleAceptarModal = () => {
    if (accionConfirmada) accionConfirmada();
    setAccionConfirmada(null);
    setMostrarModal(false);
  };

  const handleCancelarModal = () => {
    setAccionConfirmada(null);
    setMostrarModal(false);
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

        <button className="botonAgregar" onClick={agregarIngrediente}>
          Añadir
        </button>
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
                    className="inputEditar"
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && editar(ing.id, nombreEditado)
                    }
                    autoFocus
                  />

                  <div className="botones">
                    <button
                      className="botonGuardar"
                      onClick={() => editar(ing.id, nombreEditado)}
                    >
                      Guardar
                    </button>

                    <button
                      className="botonCancelar"
                      onClick={() => setEditandoId(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="nombreIng">{ing.nombre}</span>

                  <div className="botones">
                    <button
                      className="botonEditar"
                      onClick={() => {
                        setEditandoId(ing.id);
                        setNombreEditado(ing.nombre);
                      }}
                    >
                      Editar
                    </button>

                    <button
                      className="botonEliminar"
                      onClick={() => eliminar(ing.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {mostrarModal && (
        <div className="modalFondo">
          <div className="modalContenido">
            <p>{mensajeModal}</p>
            {accionConfirmada ? (
              <div className="botones">
                <button className="botonAceptar" onClick={handleAceptarModal}>
                  Aceptar
                </button>
                <button className="botonCancelar" onClick={handleCancelarModal}>
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="botonAceptar" onClick={() => setMostrarModal(false)}>
                Aceptar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
