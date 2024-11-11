import React, { useRef, useState, useEffect, useContext } from "react";
import SessionCard from "../sessionCard/SessionCard";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./SessionsList.css";
import SessionForm from "../sessionForm/SessionForm";
import { Alert, Button, CloseButton, Modal } from "react-bootstrap";
import UsersList from "../usersList/UsersList";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SessionsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [event, setEvent] = useState(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [sessions, setSessions] = useState([]);
  const { user, token } = useContext(AuthenticationContext);
  const [coachSport, setCoachSport] = useState({});
  const [errorAlert, setErrorAlert] = useState(false);
  const [pendingFees, setPendingFees] = useState([]);

  const memberId = user?.id;

  // Fetch pending fees
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

  const fetchCoachSport = async () => {
    try {
      const response = await fetch(
        `https://localhost:7081/api/Sports/SportByCoachId/${user.id}`,
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
        setCoachSport(data);
        await fetchSessions(
          `https://localhost:7081/api/TrainingSession/SessionsBySportId/${data.id}`
        );
      } else {
        throw new Error("Error al obtener el deporte del entrenador");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSessions = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      } else {
        throw new Error("Error al obtener las clases de entrenamiento");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      if (user.role === "Member") {
        const url = `https://localhost:7081/api/TrainingSession/SessionsByMemberId?memberId=${user.id}`;
        fetchSessions(url);
      } else if (user.role === "Coach") {
        fetchCoachSport();
      }
    } else {
      setShowAlert(true);
      // navigate("/login")
    }
  }, [user]);

  const convertSessionsToEvents = (sessions) => {
    return sessions.map((session) => {
      let [hours, minutes] = session.time.split(":").map(Number);
  
      let startDate = new Date(`1970-01-01T${session.time}`);
      startDate.setHours(hours, minutes, 0, 0);
      startDate.setMinutes(startDate.getMinutes() + session.duration);
  
      const endTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}`;
  

      const isCurrentUserCoach = String(session.coach.id) === String(user.id);
  

      const memberColors = ['event-color-1', 'event-color-2', 'event-color-3', 'event-color-4'];
  
      let eventColor = '';
  
      if (isCurrentUserCoach) {

        eventColor = 'event-color';
      } else {
        eventColor = memberColors[Math.floor(Math.random() * memberColors.length)];

        if (session.coach.id !== user.id) {
          eventColor = 'faded-class';
        }
      }
  
      // Asignar la clase de deporte dependiendo del nombre del deporte
      const sportClass = `sport-${session.field.sport.name.toLowerCase().replace(/\s+/g, '-')}`;
  
      return {
        id: session.id,
        title: session.field.name,
        daysOfWeek: session.daysOfWeek,
        startTime: session.time,
        endTime: endTime,
        extendedProps: {
          field: session.field,
          coach: session.coach,
          sportClass: sportClass,
          sport: session.field.sport.name,
        },
        classNames: `${eventColor} ${sportClass}`, 
      };
    });
  };
  
  
  
  const handleEventClick = (info) => {
    const { title, start, end, extendedProps, _def, id } = info.event;
    const days = _def.recurringDef.typeData.daysOfWeek;
    const eventInfo = {
      id: id,
      title: title,
      daysOfWeek: days,
      startTime: start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: end.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      extendedProps: extendedProps,
    };
    setEvent(eventInfo);
    setShowSessionModal(true);
  };

  const handleEdit = (session) => {
    setSelectedSession(session); // Actualiza la clase que se quiere editar
    setShowModal(true);
  };

  const addNewSession = async (newSession) => {
    try {
      const response = await fetch(
        "https://localhost:7081/api/TrainingSession",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newSession),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSessions((prev) => [...prev, data]);
      } else {
        console.log("Ocurrió un error");
        return;
      }
    } catch (error) {
      console.error("Ocurrió un error inesperado", error);
      setErrorAlert(true);
    }
  };

  const editSession = async (sessionId, sessionDto) => {
    try {
      const response = await fetch(
        `https://localhost:7081/api/TrainingSession/${sessionId}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sessionDto),
        }
      );
      if (response.ok) {
        setSelectedSession(null); // Actualiza la clase que se quiere editar
        setShowModal(false);
        setEvent(null);
        fetchCoachSport();
      } else {
        console.log("Ocurrió un error");
        return;
      }
    } catch (error) {
      console.error("Ocurrió un error inesperado", error);
      setErrorAlert(true);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      const response = await fetch(
        `https://localhost:7081/api/TrainingSession/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Session eliminada correctamente");
        setEvent(null);
        setShowSessionModal(false);
        fetchCoachSport();
      } else {
        throw new Error("Error al eliminar la clase de entrenamiento");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (errorAlert) {
      const timer = setTimeout(() => {
        setErrorAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errorAlert]);

  return (
    <div>
      {user && user.role === "Coach" ? (
        coachSport && (
          <h2 className="sessions-title">Clases de {coachSport.name}</h2>
        )
      ) : (
        <h2 className="sessions-title">Mis clases</h2>
      )}
  
      {pendingFees.length >= 2 ? (
        <div>
          <Alert variant="warning" className="custom-alert">
            <p>Tienes 2 o más cuotas pendientes.</p>
            <p>No puedes inscribirte en nuevos deportes hasta que regularices tu situación.</p>
          </Alert>
          <div className="suscripcion">
            <h3 className="section-title">Cuotas pendientes</h3>
            <Link to="/cuotas">
              <Button className="boton-modificar" variant="primary">
                Ver mis cuotas
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {errorAlert && (
            <Alert variant="danger" className="alert-fixed">
              Ya existe una clase en ese horario o la cancha se encuentra ocupada
            </Alert>
          )}
  
          {showAlert ? (
            <Alert
              variant="warning"
              style={{
                textAlign: "center",
                marginLeft: "100px",
                marginRight: "100px",
              }}
            >
              Tiene que iniciar sesión para poder ver las clases disponibles!
            </Alert>
          ) : (
            <div
              className="sessions-container"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {user && user.role === "Coach" && (
                <Button
                  variant="primary"
                  className="modal-button mb-5 mt-5"
                  onClick={() => {
                    setSelectedSession(null);
                    setShowModal(true);
                  }}
                >
                  + Agregar Clase
                </Button>
              )}
  
              <SessionForm
                selectedSession={selectedSession}
                show={showModal}
                onHide={() => setShowModal(false)}
                onSave={addNewSession}
                onEdit={editSession}
              />
  
              <div style={{ display: "flex", marginBottom: "30px" }}>
                <div className="calendarContainer">
                  <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={false}
                    allDaySlot={false}
                    slotMinTime="08:00:00" // Hora de inicio
                    slotMaxTime="22:00:00" // Hora de fin
                    slotDuration="00:30:00" // Intervalos de 30 minutos
                    slotLabelInterval="01:00:00"
                    dayHeaderFormat={{ weekday: "long" }}
                    weekends={false}
                    locale="es"
                    contentHeight="auto"
                    events={convertSessionsToEvents(sessions)}
                    eventClick={handleEventClick}
                    slotEventOverlap={false} // Evita que los eventos se superpongan en la misma franja horaria
                    eventOverlap={true} // Permite que dos eventos se alineen uno junto al otro
                    eventOrder="field.name"
                    eventClassNames={(info) => {
                      // Aquí aplicamos la clase dinámica 'sportClass' para asignar colores por deporte
                      return info.event.extendedProps.sportClass; // Clase CSS dinámica para cada deporte
                    }}
                  />
                </div>
  
                <div>
                  {event && (
                    <Modal
                      show={showSessionModal}
                      onHide={() => setShowSessionModal(false)}
                    >
                      <Modal.Header className="modal-header">
                        <CloseButton
                          variant="white"
                          className="close-button-modal"
                          onClick={() => setShowSessionModal(false)}
                        ></CloseButton>
                      </Modal.Header>
                      <SessionCard
                        session={event}
                        onEdit={handleEdit}
                        onDelete={deleteSession}
                      />
                    </Modal>
                  )}
                </div>
              </div>
  
              {user && user.role === "Coach" && coachSport && (
                <div className="mt-5 mb-5">
                  <h2 className="membersList-title">SOCIOS ANOTADOS</h2>
                  <div className="users-list-container">
                    <UsersList
                      option="sportMembers"
                      sportId={coachSport.id}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
  
}

export default SessionsList;
