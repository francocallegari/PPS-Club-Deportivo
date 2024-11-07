import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  InputGroup,
} from "react-bootstrap";
import "./Admin.css";

const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  //const [eventImage, setEventImage] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newsDetailedDescription, setNewsDetailedDescription] = useState("");
  const [newsEventDate, setNewsEventDate] = useState("");

  const handleShow = (type) => {
    setEventType(type);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirmSignUp = async () => {
    if (eventType === "event") {
      await addEvent();
    } else {
      await addNews();
    }
    handleClose();
    fetchData(); // Refresh data if needed for real-time updates in other components
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    handleShow("event");
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    handleShow("news");
  };

  const addEvent = async () => {
    const eventData = {
      Name: eventTitle,
      date: eventDate,
      time: eventTime,
      description: eventDescription,
      status: "Pendiente",
    };

    try {
      const response = await fetch(
        `https://localhost:7081/api/Event?creatorName=Nombre del Creador`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        console.log("Evento agregado con éxito.");
      } else {
        console.error("Error al agregar el evento.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const addNews = async () => {
    const newsData = {
      title: newsTitle,
      description: newsDescription, // Cambiado de shortDescription a description
      imageUrl: newsImage,
      publicationDate: newsEventDate, // Cambiado de eventDate a publicationDate
    };

    console.log("Datos de la noticia a enviar:", newsData);

    try {
      const response = await fetch(`https://localhost:7081/api/News`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      if (response.ok) {
        console.log("Noticia agregada con éxito.");
      } else {
        console.error("Error al agregar la noticia.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const fetchData = async () => {
    try {
      const eventResponse = await fetch(
        "https://localhost:7081/api/Event/Events"
      );
      const eventData = await eventResponse.json();
      console.log("Eventos obtenidos:", eventData);

      const newsResponse = await fetch("https://localhost:7081/api/News/News");
      const newsData = await newsResponse.json();
      console.log("Noticias obtenidas:", newsData);
    } catch (error) {
      console.error("Error al obtener eventos o noticias:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Col className="search">
        <Form>
          <Form.Group controlId="formBasicSearch">
            <InputGroup>
              <Form.Control
                style={{ width: "20rem" }}
                type="text"
                placeholder="Buscar socio"
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </InputGroup>
          </Form.Group>
        </Form>
      </Col>

      <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />

      <Container className="mt-5 container">
        <Row className="mb-4">
          <Col>
            <h3 className="title-admin">Agregar evento</h3>
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
                <Form.Control
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEventTime">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEventDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingresar descripción del evento"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 button">
                Agregar evento
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className="title-admin">Agregar noticia</h3>
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
                <Form.Label>Descripción </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Ingresar descripción corta de la noticia"
                  value={newsDescription}
                  onChange={(e) => setNewsDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formNewsImage">
                <Form.Label>URL de la imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar URL de la imagen"
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formNewsEventDate">
                <Form.Label>Fecha del evento</Form.Label>
                <Form.Control
                  type="date"
                  value={newsEventDate}
                  onChange={(e) => setNewsEventDate(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 button">
                Agregar noticia
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea agregar{" "}
          {eventType === "event" ? "el evento" : "la noticia"}{" "}
          <strong>{eventType === "event" ? eventTitle : newsTitle}</strong>?
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
};

export default Admin;
