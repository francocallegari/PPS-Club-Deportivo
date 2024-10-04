import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Modal, Button } from "react-bootstrap";
import "./CalendarEvents.css";

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    const activities = [
      {
        id: 1,
        title: "Entrenamiento de Fútbol",
        date: "2024-09-30",
        time: "10:00 AM",
        description: "Un entrenamiento para todos los niveles.",
      },
      {
        id: 2,
        title: "Clase de Yoga",
        date: "2024-10-02",
        time: "6:00 PM",
        description: "Relájate y mejora tu flexibilidad.",
      },
      {
        id: 3,
        title: "Torneo de Ajedrez",
        date: "2024-10-05",
        time: "3:00 PM",
        description: "Competencia abierta para todos los socios.",
      },
      {
        id: 4,
        title: "Excursión al Parque",
        date: "2024-10-10",
        time: "9:00 AM",
        description: "Disfruta de un día en la naturaleza.",
      },
    ];

    const formattedEvents = activities.map((activity) => ({
      title: activity.title,
      date: activity.date,
      description: activity.description,
    }));

    setEvents(formattedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    const { title, extendedProps } = info.event;
    const description = extendedProps.description;
    setSelectedEvent({ title, description });
  };

  const handleSignUpClick = (activity) => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log(`Inscrito en: ${selectedEvent.title}`);
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="activities-container">
        <h2 className="calendar-title">ACTIVIDADES</h2>
        <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          locales={[esLocale]}
          locale="es"
        />
        {selectedEvent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">{selectedEvent.title}</h3>
              <p className="modal-description">{selectedEvent.description}</p>

              <Button className="btn-signup" onClick={handleSignUpClick}>
                Inscribirme
              </Button>
              <Button
                className="btn-close"
                onClick={() => setSelectedEvent(null)}
              >
                Cerrar
              </Button>
            </div>
            
          </div>
        )}

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Deseas inscribirte en "{selectedEvent?.title}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Sí, inscribirme
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    </div>
  );
};

export default CalendarEvents;
