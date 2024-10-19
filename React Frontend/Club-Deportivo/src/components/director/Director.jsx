import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "./Director.css";
import UsersList from '../usersList/UsersList';

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

    return (
        <>
            <h3 className='evento-approve'>Usuarios</h3>
            <div className="user-container">
                <div className="user-column">
                    <h3 className='user-title'>Administradores</h3>
                    <UsersList option="admins"></UsersList>
                </div>
                <div className="user-column">
                    <h3 className='user-title'>Entrenadores</h3>
                    <UsersList option="coaches"></UsersList>
                </div>
                <div className="user-column">
                    <h3 className='user-title'>Socios</h3>
                    <UsersList option="members"></UsersList>
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
