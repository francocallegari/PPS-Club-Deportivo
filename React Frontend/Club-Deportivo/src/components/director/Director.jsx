import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
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

    const handleShowModal = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const approveEvent = () => {
        if (selectedEvent) {
            const updatedEvents = events.map(event =>
                event.id === selectedEvent.id ? { ...event, status: 'Aprobado' } : event
            );
            setEvents(updatedEvents);
            handleCloseModal();
        }
    };

    const users = [
        { id: 1, name: "Manuel De Macedo", type: "admin" },
        { id: 2, name: "Franco Callegari", type: "admin" },
        { id: 3, name: "Facundo Gomez", type: "coach" },
        { id: 4, name: "Anabella Rustici", type: "coach" },
        { id: 5, name: "Aylen Guy", type: "client" },
        { id: 6, name: "Delfina Isaguirre", type: "client" },
    ];

    const admins = users.filter(user => user.type === "admin");
    const coaches = users.filter(user => user.type === "coach");
    const clients = users.filter(user => user.type === "client");

    return (
        <>
            <h3 className='evento-approve'>Usuarios</h3>
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

            <h3 className='evento-approve'>Eventos a aprobar</h3>
            <div className='container-events'>
                <div className='user-column'>
                    <h3 className='user-title'>Eventos</h3>
                    {events.map(event => (
                        <p className='user' key={event.id}>{event.title}</p>
                    ))}
                </div>

                <div className='user-column'>
                    <h3 className='user-title'>Estado</h3>
                    {events.map(event => (
                        <p className='user' key={event.id}>{event.status}</p>
                    ))}
                </div>

                <div className='user-column'>
                    <h3 className='user-title'>Aprobar</h3>
                    {events.map(event => (
                        <Button
                            className='user'
                            key={event.id}
                            onClick={() => handleShowModal(event)}
                            disabled={event.status === 'Aprobado'}
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
