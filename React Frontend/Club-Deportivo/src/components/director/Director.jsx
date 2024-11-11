import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./Director.css";
import React, { useContext, useEffect, useState } from "react";
import StatisticsGraph from "../statisticsGraph/StatisticsGraph";
import Alert from "../alert/Alert";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

const Director = () => {
  const [events, setEvents] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [users, setUsers] = useState([]);
  const [errorType, setErrorType] = useState("error");
  const [error, setError] = useState(null);
  const [errorEventoType, setErrorEventoType] = useState("error");
  const [errorEvento, setEventoError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { token } = useContext(AuthenticationContext)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7081/api/Event/Events"
      );
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowApproveModal = (event) => {
    setSelectedEvent(event);
    setShowApproveModal(true);
  };

  const handleShowRejectModal = (event) => {
    setSelectedEvent(event);
    setShowRejectModal(true);
  };

  const handleCloseModal = () => {
    setShowApproveModal(false);
    setShowRejectModal(false);
  };

  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const approveEvent = async () => {
    if (selectedEvent) {
      try {
        await axios.put("https://localhost:7081/api/Event/ApproveEvent", null, {
          params: { directorId: 1, eventId: selectedEvent.id },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setErrorEventoType("success");
        setEventoError("Se ha aprobado el evento exitosamente.");
        fetchData();
        handleCloseModal();
      } catch (error) {
        setEventoError("Hubo un problema al aprobar el evento. Inténtalo de nuevo más tarde.");
        console.error("Error al aprobar el evento:", error);
      }
    }
    setShowApproveModal(false);
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(
          `https://localhost:7081/api/User/${selectedUser.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          setError("Error al eliminar el usuario.");
          throw new Error("Error al eliminar el usuario");
        }
        setErrorType("success");
        setError("Se ha eliminado el usuario exitosamente.");

        setUsers(users.filter((user) => user.id !== selectedUser.id));
        handleCloseDeleteModal();
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        setError("Hubo un problema al eliminar el usuario. Inténtalo de nuevo más tarde.");
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://localhost:7081/api/User", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error("Error al obtener los usuarios");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUser();
  }, []);

  const rejectEvent = async (selectedEvent) => {
    const id = Number(selectedEvent.id);
    console.log("ID del evento:", id);

    if (isNaN(id)) {
      console.error("El ID no es un número válido");
      setEventoError("ID de evento no válido. Por favor, inténtalo de nuevo.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token de autenticación no encontrado");
      setEventoError("Token de autenticación no encontrado. Por favor, inicia sesión.");
      return;
    }

    try {
      const response = await fetch(`https://localhost:7081/api/Event/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        if (response.status === 204) {
          console.log('Evento rechazado exitosamente');
        } else {
          try {
            const data = await response.json();
            console.log('Evento rechazado:', data);
          } catch (jsonError) {
            console.warn("No se pudo parsear la respuesta JSON:", jsonError);
          }
        }
        fetchData();
      } else {
        throw new Error(`Error al rechazar el evento: ${response.statusText}`);
      }
    } catch (error) {
      setEventoError(`Hubo un problema al rechazar el evento. ${error.message}`);
      console.error("Error al rechazar el evento:", error);
    }

    setShowRejectModal(false);
  };

  return (
    <>
      <h3 className="evento-approve">Usuarios</h3>
      <div>
        {error && (
          <Alert
            type={errorType}
            message={error}
            onClose={() => { setErrorType("error"); setError(null); }}
          />
        )}
      </div>

      <div className="user-container">
        <div className="user-column">
          <h3 className="user-title">Socios</h3>
          {users.length > 0 ? (
            users
              .filter((user) => user?.userType === "Member")
              .map((user) => (
                <p key={user.id} className="user">
                  {user.userName}{" "}
                  <i
                    className="fa-solid fa-x"
                    onClick={() => handleShowDeleteModal(user)}
                  ></i>
                </p>
              ))
          ) : (
            <p>Cargando socios...</p>
          )}
        </div>

        <div className="user-column">
          <h3 className="user-title">Administradores</h3>
          {users.length > 0 ? (
            users
              .filter((user) => user?.userType === "Admin")
              .map((user) => (
                <p key={user.id} className="user">
                  {user.userName}{" "}
                  <i
                    className="fa-solid fa-x"
                    onClick={() => handleShowDeleteModal(user)}
                  ></i>
                </p>
              ))
          ) : (
            <p>Cargando administradores...</p>
          )}
        </div>

        <div className="user-column">
          <h3 className="user-title">Entrenadores</h3>
          {users.length > 0 ? (
            users
              .filter((user) => user?.userType === "Coach")
              .map((user) => (
                <p key={user.id} className="user">
                  {user.userName}{" "}
                  <i
                    className="fa-solid fa-x"
                    onClick={() => handleShowDeleteModal(user)}
                  ></i>
                </p>
              ))
          ) : (
            <p>Cargando entrenadores...</p>
          )}
        </div>

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que quieres eliminar al usuario "
            <strong>{selectedUser?.userName || "Sin nombre"}</strong>"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="colorButton" onClick={handleCloseDeleteModal}>
              Cancelar
            </Button>
            <Button variant="primary" className="colorButton" onClick={handleDeleteUser}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="user-column">
          <h3 className="user-title">Directores</h3>
          {users.length > 0 ? (
            users
              .filter((user) => user?.userType === "Director")
              .map((user) => (
                <p key={user.id} className="user">
                  {user.userName}
                </p>
              ))
          ) : (
            <p>Cargando directores...</p>
          )}
        </div>
      </div>

      <h3 className="evento-approve">Eventos a aprobar</h3>
      <div>
        {errorEvento && (
          <Alert
            type={errorEventoType}
            message={errorEvento}
            onClose={() => { setErrorEventoType("error"); setEventoError(null); }}
          />
        )}
      </div>
      <div>

        <div className="container-events">
          <div className="user-column">
            <h3 className="user-title">Eventos</h3>
            {events.length > 0 ? (
              events.map((event) => (
                <p className="user" key={event.id}>
                  {event.name} - 
                  {event.description} -
                  {new Date(event.date).toLocaleDateString("es-ES")}
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
              <div key={event.id} className="buttons">
                <Button
                  className="user"
                  onClick={() => handleShowApproveModal(event)}
                  disabled={event.status !== 0}
                >
                  Aprobar
                </Button>
                <Button
                  className="user"
                  onClick={() => handleShowRejectModal(event)}
                  disabled={event.status !== 0}
                >
                  Rechazar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showApproveModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres aprobar el evento "
          <strong>{selectedEvent?.name || "Sin título"}</strong>"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="colorButton" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" className="colorButton" onClick={approveEvent}>
            Aprobar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejectModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres rechazar el evento "
          <strong>{selectedEvent?.name || "Sin título"}</strong>"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="colorButton" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" className="colorButton" onClick={() => {
            console.log("ID del evento antes de llamar:", selectedEvent);
            if (selectedEvent && selectedEvent.id) {
              rejectEvent(selectedEvent);
            } else {
              console.error("El ID del evento seleccionado es inválido");
            }
          }}>
            Rechazar
          </Button>
        </Modal.Footer>
      </Modal>

      <br /><br /><br /><br /><br />
      <h3 className="evento-approve">Estadisticas</h3>
      <StatisticsGraph />
      <br /><br />

    </>
  );
};

export default Director;
