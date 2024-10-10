import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Button, Modal } from "react-bootstrap";
import "./CalendarEvents.css";

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchEvents = async () => {
    const activities = [
      {
        id: 1,
        title: "Entrenamiento de Fútbol",
        date: "2024-09-30",
        time: "10:00",
        description: "Un entrenamiento para todos los niveles.",
        image: "url_de_la_imagen_1.jpg",
      },
      {
        id: 2,
        title: "Clase de Yoga",
        date: "2024-10-02",
        time: "6:00",
        description: "Relájate y mejora tu flexibilidad.",
        image: "url_de_la_imagen_2.jpg",
      },
      {
        id: 3,
        title: "Torneo de Ajedrez",
        date: "2024-10-05",
        time: "3:00",
        description: "Competencia abierta para todos los socios.",
        image: "url_de_la_imagen_3.jpg",
      },
      {
        id: 4,
        title: "Excursión al Parque",
        date: "2024-10-10",
        time: "9:00",
        description: "Disfruta de un día en la naturaleza.",
        image: "url_de_la_imagen_4.jpg",
      },
    ];

    const formattedEvents = activities.map((activity) => ({
      title: activity.title,
      date: new Date(activity.date),
      time: activity.time,
      description: activity.description,
      image: activity.image,
    }));

    setEvents(formattedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    const { title, extendedProps } = info.event;
    const description = extendedProps.description;
    const date = new Date(extendedProps.date);
    const time = extendedProps.time;
    const image = extendedProps.image;
    setSelectedEvent({ title, description, date, time, image });
    handleShow();
  };

  const renderEventContent = (eventInfo) => {
    const { time, title } = eventInfo.event.extendedProps;
    return (
      <div
      style={{
        display: "grid",
        gridTemplateColumns: "0.3fr 1fr",
        alignItems: "start",
        padding: "3px",
      }}
    >
      <span style={{ textAlign: "left", paddingLeft: "3px"}}>{time} {title}</span>
    </div>
    );
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="bg-[antiquewhite] p-6">
      <div className="activities-container">
        <h2 className="calendar-title">ACTIVIDADES</h2>

        <div className="calendar-container bg-white p-4 rounded-md shadow-md mx-auto w-3/4">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events.map((event) => ({
              title: event.title,
              date: event.date.toISOString().split("T")[0],
              extendedProps: {
                title: event.title,
                date: event.date.toISOString(),
                time: event.time,
                description: event.description,
                image: event.image,
              },
            }))}
            eventClick={handleEventClick}
            titleFormat={{ month: "long" }}
            dayHeaderFormat={{ weekday: "long" }}
            locales={[esLocale]}
            locale="es"
            eventContent={renderEventContent}
            fixedWeekCount={false}
          />
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent?.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
              />
            )}
            <h3>
              {selectedEvent ? formatDate(selectedEvent.date) : ""} -{" "}
              {selectedEvent?.time}
            </h3>
            <p>Descripción del evento: </p>
            <p>{selectedEvent?.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="primary"

            >
              Inscribirme
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CalendarEvents;
