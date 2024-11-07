import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./Director.css";
import UsersList from "../usersList/UsersList";

const Director = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Método para obtener los eventos del backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7081/api/Event/Events"
      );
      console.log(response.data); // Verifica la estructura de los datos en la consola
      setEvents(response.data); // Obtiene todos los eventos sin filtrar por estado
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
    }
  };

  // Llama a fetchData al montar el componente para cargar los eventos
  useEffect(() => {
    fetchData();
  }, []);

  const handleShowModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const approveEvent = async () => {
    if (selectedEvent) {
      try {
        await axios.put(`https://localhost:7081/api/Event/ApproveEvent`, null, {
          params: { directorId: 1, eventId: selectedEvent.id }, // Ajusta el directorId si es necesario
        });
        fetchData(); // Llama a fetchData después de aprobar para actualizar los datos en pantalla
        handleCloseModal();
      } catch (error) {
        console.error("Error al aprobar el evento:", error);
      }
    }
  };

  return (
    <>
      <h3 className="evento-approve">Usuarios</h3>
      <div className="user-container">
        <div className="user-column">
          <h3 className="user-title">Administradores</h3>
          <UsersList option="admins" />
        </div>
        <div className="user-column">
          <h3 className="user-title">Entrenadores</h3>
          <UsersList option="coaches" />
        </div>
        <div className="user-column">
          <h3 className="user-title">Socios</h3>
          <UsersList option="members" />
        </div>
      </div>

      <h3 className="evento-approve">Eventos a aprobar</h3>
      <div className="container-events">
        <div className="user-column">
          <h3 className="user-title">Eventos</h3>
          {events.length > 0 ? (
            events.map((event) => (
              <p className="user" key={event.id}>
                {event.name}
              </p>
            ))
          ) : (
            <p>No hay eventos para mostrar.</p>
          )}
        </div>

        <div className="user-column">
          <h3 className="user-title">Estado</h3>
          {events.map((event) => (
            <p className="user" key={event.id}>
              {event.status === 0 ? "Pendiente" : "Aprobado"}
            </p>
          ))}
        </div>

        <div className="user-column">
          <h3 className="user-title">Aprobar</h3>
          {events.map((event) => (
            <Button
              className="user"
              key={event.id}
              onClick={() => handleShowModal(event)}
              disabled={event.status !== 0} // Solo permite aprobar si está pendiente
            >
              Aprobar
            </Button>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres aprobar el evento "
          <strong>{selectedEvent?.title || "Sin título"}</strong>"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={approveEvent}>
            Aprobar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Director;
