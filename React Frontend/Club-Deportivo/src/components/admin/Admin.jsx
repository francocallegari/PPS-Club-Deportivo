import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import "./Admin.css";

const Admin = ({ addNews }) => {
    const [showModal, setShowModal] = useState(false);
    const [eventType, setEventType] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [newsTitle, setNewsTitle] = useState('');

    const handleShow = (type) => {
        setEventType(type);
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);

    const handleConfirmSignUp = () => {
        const title = eventType === 'event' ? eventTitle : newsTitle;
        console.log(`${eventType === 'event' ? 'Evento' : 'Noticia'} agregado/a:`, title);
        handleClose();
      };

    const handleEventSubmit = (e) => {
        e.preventDefault();
        handleShow('event');
    };

    const handleNewsSubmit = (e) => {
        e.preventDefault();
        handleShow('news');
    };

    return (
        <div>
            <Container className="mt-5 container">
                <Row className="mb-4">
                    <Col>
                        <h3 className='title-admin'>Agregar evento</h3>
                        <Form onSubmit={handleEventSubmit}>
                            <Form.Group controlId="formEventTitle">
                                <Form.Label>Título del evento</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar título del evento"
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEventDate">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>

                            <Form.Group controlId="formEventTime">
                                <Form.Label>Hora</Form.Label>
                                <Form.Control type="time" />
                            </Form.Group>

                            <Form.Group controlId="formEventDescription">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Ingresar descripción del evento" />
                            </Form.Group>

                            <Form.Group controlId="formEventImage">
                                <Form.Label>URL de la imagen</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar URL de la imagen" />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3 button">
                                Agregar evento
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h3 className='title-admin'>Agregar noticia</h3>
                        <Form onSubmit={handleNewsSubmit}>
                            <Form.Group controlId="formNewsTitle">
                                <Form.Label>Título de la noticia</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar título de la noticia"
                                    value={newsTitle}
                                    onChange={(e) => setNewsTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formNewsDescription">
                                <Form.Label>Descripción corta</Form.Label>
                                <Form.Control as="textarea" rows={2} placeholder="Ingresar descripción corta de la noticia" />
                            </Form.Group>

                            <Form.Group controlId="formNewsImage">
                                <Form.Label>URL de la imagen</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar URL de la imagen" />
                            </Form.Group>

                            <Form.Group controlId="formNewsEventDate">
                                <Form.Label>Fecha del evento</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>

                            <Form.Group controlId="formNewsDetailedDescription">
                                <Form.Label>Descripción detallada</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Ingresar descripción detallada de la noticia" />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3 button">
                                Agregar noticia
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de que desea agregar {eventType === 'event' ? 'el evento' : 'la noticia'}{" "}
                    <strong>{eventType === 'event' ? eventTitle : newsTitle}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmSignUp}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Admin;
