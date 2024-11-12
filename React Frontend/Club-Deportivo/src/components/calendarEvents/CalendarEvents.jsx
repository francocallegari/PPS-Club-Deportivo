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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activities, setActivities] = useState([])
  const { user, token } = useContext(AuthenticationContext);
  const [pendingFees, setPendingFees] = useState([]);

  const memberId = user?.id;

  

  const fetchEvents = async () => {
    try {
      const response = await fetch(`https://localhost:7081/api/Event/Events`, {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json"
        },
      });
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        throw new Error("Error al obtener los eventos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const formattedEvents = (activities) => {
    return activities.map((activity) => {
      const [date, time] = activity.date.split("T")

      return {
        id: activity.id,
        title: activity.name,
        date: new Date(date),
        time: time,
        description: activity.description
      }
    })
  }

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
    const id = extendedProps.id;
    setSelectedEvent({ title, description, date, time, id });
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
      
      {/* Mostrar alerta si el usuario tiene 2 o más cuotas pendientes */}
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
          
          {/* Calendario de eventos */}
          <div className="calendar-container bg-white p-4 rounded-md">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={formattedEvents(activities).map((event) => ({
                title: event.title,
                date: event.date.toISOString().split("T")[0],
                extendedProps: {
                  id: event.id,
                  title: event.title,
                  date: event.date.toISOString(),
                  time: event.time,
                  description: event.description,
                },
              }))}
              eventClick={handleEventClick}
              titleFormat={{ month: "long" }}
              dayHeaderFormat={{ weekday: "long" }}
              locales={[esLocale]}
              locale="es"
              eventContent={eventContent}
              eventLimit={true}
              fixedWeekCount={false}
            />
          </div>
  
          {/* Detalles del evento seleccionado */}
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
                    id={selectedEvent.id}
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
