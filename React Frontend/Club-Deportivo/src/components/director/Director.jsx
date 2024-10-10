import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./Director.css";

const Director = () => {
    const initialEvents = [
        { id: 1, title: 'Torneo de Fútbol', status: 'Pendiente' },
        { id: 2, title: 'Clínica de Natación', status: 'Pendiente' },
        { id: 3, title: 'Seminario de Yoga', status: 'Pendiente' },
    ];

    const [events, setEvents] = useState(initialEvents);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const users = [
        { id: 1, name: "Manuel De Macedo", type: "admin" },
        { id: 2, name: "Franco Callegari", type: "admin" },
        { id: 3, name: "Facundo Gomez", type: "coach" },
        { id: 4, name: "Anabella Rustici", type: "coach" },
        { id: 5, name: "Aylen Guy", type: "client" },
        { id: 6, name: "Delfina Isaguirre", type: "client" },
    ];

    const approveEvent = (id) => {
        const eventToApprove = events.find(event => event.id === id);
        setSelectedEvent(eventToApprove);
        setShowModal(true);
        const updatedEvents = events.map(event =>
            event.id === id ? { ...event, status: 'Aprobado' } : event
        );
        setEvents(updatedEvents);
    };

    const handleClose = () => setShowModal(false);

    const admins = users.filter(user => user.type === "admin");
    const coaches = users.filter(user => user.type === "coach");
    const clients = users.filter(user => user.type === "client");

    return (
        <>
            <div className="user-container">
                <div className="user-column">
                    <h3 className='user-title'>Administradores</h3>
                    {admins.map(user => (
                        <p className="user" key={user.id}><i className="fas fa-user"></i>{user.name}</p>
                    ))}
                </div>
                <div className="user-column">
                    <h3 className='user-title'>Entrenadores</h3>
                    {coaches.map(user => (
                        <p className="user" key={user.id}><i className="fas fa-user"></i>{user.name}</p>
                    ))}
                </div>
                <div className="user-column">
                    <h3 className='user-title'>Clientes</h3>
                    {clients.map(user => (
                        <p className="user" key={user.id}><i className="fas fa-user"></i>{user.name}</p>
                    ))}
                </div>
            </div>

            <div className="events-container">
                <div className="events-header">
                    <h3 className="eventos-title">Eventos</h3>
                    <h3 className="eventos-title estado">Estado</h3>
                </div>
                <div className="event-cards">
                    {events.length > 0 ? (
                        events.map(event => (
                            <div className={`event-card ${event.status.toLowerCase()}`} key={event.id}>
                                <div className="event-details">
                                    <h4 className="title">{event.title}</h4>
                                    <p className={`event-status ${event.status.toLowerCase()}`}>{event.status}</p>
                                    {event.status === 'Pendiente' && (
                                        <button className="approve-btn" onClick={() => approveEvent(event.id)}>
                                            Aprobar
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay eventos.</p>
                    )}
                </div>
            </div>

            {/* Modal de confirmación */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Evento Aprobado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && `El evento "${selectedEvent.title}" ha sido aprobado con éxito.`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Director;
