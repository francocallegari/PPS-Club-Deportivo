import React, { useState, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import "./CalendarEvents.css";
import ActivityCard from "../activityCard/ActivityCard";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user, token } = useContext(AuthenticationContext);
  const [pendingFees, setPendingFees] = useState([]);

  const memberId = user?.id;

  useEffect(() => {
    const fetchPendingFees = async () => {
      if (!memberId || !token) return;

      try {
        const response = await fetch(
          `https://localhost:7081/api/MemberShipFee/MemberFees/${memberId}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const pendientes = data.filter((fee) => fee.status === 1);
          setPendingFees(pendientes);
        } else {
          console.error("Error al obtener las cuotas pendientes");
        }
      } catch (error) {
        console.error("Error al obtener las cuotas:", error);
      }
    };

    fetchPendingFees();
  }, [memberId, token]);

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
    if (pendingFees.length >= 2) {
      return;
    }

    const { title, extendedProps } = info.event;
    const description = extendedProps.description;
    const date = new Date(extendedProps.date);
    const time = extendedProps.time;
    const image = extendedProps.image;
    setSelectedEvent({ title, description, date, time, image });
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);
  };

  const eventContent = (eventInfo) => {
    const { time, title } = eventInfo.event.extendedProps;
    return (
      <div className="event-content">
        <span className="event-time-title">
          {time} {title}
        </span>
        <span className="event-full-title">
          {time} {title}
        </span>{" "}
        {/* oculto inicialmente */}
      </div>
    );
  };

  return (
    <div>
      <h2 className="calendar-title">ACTIVIDADES</h2>

      {/* Usar ternario para mostrar la alerta o el calendario */}
      {pendingFees.length >= 2 ? (
        <div>
          <Alert variant="warning" className="custom-alert">
            <p>Tienes 2 o más cuotas pendientes.</p>
            <p>No puedes inscribirte en nuevos deportes hasta que regularices tu situación.</p>
          </Alert>
          <div className="suscripcion-title">
            <Link className="suscripcion-title" to="/cuotas">
              <Button className="boton-modificar" variant="primary">
                Ver mis cuotas
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="calendar-events-container">
          <div className="calendar-container bg-white p-4 rounded-md">
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
              eventContent={eventContent} // Contenido personalizado
              eventLimit={true}
              fixedWeekCount={false}
            />
          </div>

          <div className="details-column">
            <h2 className="details-column-title">Detalles</h2>
            <div className="selected-event-card">
              {selectedEvent ? (
                <div>
                  <button
                    className="close-button"
                    onClick={() => setSelectedEvent(null)}
                  >
                    &times;
                  </button>
                  <ActivityCard
                    title={selectedEvent.title}
                    date={formatDate(selectedEvent.date)}
                    time={selectedEvent.time}
                    description={selectedEvent.description}
                    image={selectedEvent.image}
                  />
                </div>
              ) : (
                <div className="placeholder-text">
                  <p>Seleccione un evento para más detalles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarEvents;
