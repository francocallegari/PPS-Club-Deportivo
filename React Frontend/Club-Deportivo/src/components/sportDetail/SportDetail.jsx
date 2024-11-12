import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import "./SportDetail.css";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Alert from "../alert/Alert";

const SportDetail = ({ sport, onClose }) => {
  const { user, token } = useContext(AuthenticationContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sportSessions, setSportSessions] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const convertToDays = (daysOfWeek) => {
    const daysConverted = daysOfWeek.map((day) => days[day]);
    return daysConverted;
  };

  const fetchSessionsBySport = async () => {
    try {
      const response = await fetch(
        `https://localhost:7081/api/TrainingSession/SessionsBySportId/${sport.id}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSportSessions(data);
      } else {
        throw new Error("Error al obtener las clases de entrenamiento");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchSessionsBySport();
  }, []);

  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Función para seleccionar una sesión
  const handleSelectSession = (sessionId) => {
    setSelectedSessionId(sessionId);
  };

  const handleInscripcion = async () => {
    try {
      // Verificar si una sesión está seleccionada
      if (!selectedSessionId) {
        setAlertMessage("Por favor selecciona una sesión antes de inscribirte.");
        return;
      }
  
      // Verifica la selección de sesión
      console.log('Session ID:', selectedSessionId); // Muestra la ID de la sesión seleccionada
      console.log('UserID:', user.id);
      const response = await fetch(
        `https://localhost:7081/api/Sports/SignUpSportSession?memberId=${user.id}&sessionId=${selectedSessionId}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Verifica si la respuesta fue exitosa
      if (response.ok) {
        setShowConfirmation(true);
      } else {
        const errorData = await response.text();
        setAlertMessage("Ya estas inscripto en este deporte");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error.message);
    }
  };
  

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Modal
        show={!!sport}
        onHide={onClose}
        centered
        className="sport-detail-modal"
      >
        <Modal.Header closeButton className="sport-title">
          <Modal.Title>{sport?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="sport-detail-content">
            <img
              src={sport?.imageURL}
              alt={sport?.name}
              className="sport-detail-image"
            />

            {sportSessions.length !== 0 ? (
              <>
                <h4>Horarios de Entrenamiento</h4>
                <Table striped bordered hover className="sport-schedule">
                  <thead>
                    <tr>
                      <th>Días</th>
                      <th>Horarios</th>
                      <th>Lugar</th>
                      <th>Selección</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sportSessions.map((session, index) => {
                      const [hours, minutes] = session.time
                        .split(":")
                        .map(Number); // Obtiene las horas y minutos del horario de inicio
                      const durationMinutes = session.duration; // Duración en minutos

                      // Calcula el horario de finalización
                      const endTimeHours =
                        Math.floor(
                          (hours * 60 + minutes + durationMinutes) / 60
                        ) % 24;
                      const endTimeMinutes = (minutes + durationMinutes) % 60;

                      // Formatea el horario de inicio y finalización para que solo muestre HH:MM
                      const formattedStartTime = `${String(hours).padStart(
                        2,
                        "0"
                      )}:${String(minutes).padStart(2, "0")}`;
                      const formattedEndTime = `${String(endTimeHours).padStart(
                        2,
                        "0"
                      )}:${String(endTimeMinutes).padStart(2, "0")}`;

                      return (
                        <tr key={index}>
                          <td>
                            {convertToDays(session.daysOfWeek).join(", ")}
                          </td>
                          <td>
                            {formattedStartTime} - {formattedEndTime}
                          </td>{" "}
                          <td>
                          {session.field.name}
                          </td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedSessionId === session.id}
                              onChange={() => handleSelectSession(session.id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

              </>
            ) : (
              <p>Aún no hay horarios disponibles para este deporte</p>
            )}
            {alertMessage && (
              <Alert
                message={alertMessage}
                onClose={() => setAlertMessage("")}
              ></Alert>
            )}
          </div>
        </Modal.Body>

        <div className="btn-sport">
          {user && user.role === "Member" && (
            <Modal.Footer>
              <Button
                className="btn-Incribirme"
                onClick={handleInscripcion}
                disabled={sportSessions.length === 0}
              >
                Incribirme
              </Button>
            </Modal.Footer>
          )}

          <Modal.Footer>
            <Button className="btn-cerrar" onClick={onClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Inscripción Exitosa!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Te has inscrito exitosamente en {sport?.name}.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseConfirmation}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SportDetail;
