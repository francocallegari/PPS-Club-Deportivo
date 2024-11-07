
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./Director.css";
import React, { useEffect, useState, useContext } from 'react';
import StatisticsGraph from '../statisticsGraph/StatisticsGraph';


const Director = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [users, setUsers] = useState([]);


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

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7081/api/User/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://localhost:7081/api/User")
        if (!response.ok) throw new Error('Error al obtener los usuarios');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      <h3 className="evento-approve">Usuarios</h3>
      <div className="user-container">
        <div className="user-column">
          <h3 className="user-title">Socios</h3>
          {users.length > 0 ? (
            users
              .filter((user) => user?.userType === "Member")
              .map((user) => (
                <p key={user.id} className="user">
                  {user.userName} <i
                    className="fa-solid fa-x"
                    onClick={() => handleDeleteUser(user.id)}
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
                  {user.userName} <i
                    className="fa-solid fa-x"
                    onClick={() => handleDeleteUser(user.id)}
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
                  {user.userName} <i
                    className="fa-solid fa-x"
                    onClick={() => handleDeleteUser(user.id)}
                  ></i>
                </p>
              ))
          ) : (
            <p>Cargando entrenadores...</p>
          )}
        </div>

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

      <h3 className='evento-approve'>Estadisticas</h3>
      <StatisticsGraph />
      <br />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres aprobar el evento "<strong>{selectedEvent?.title}</strong>"?
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
