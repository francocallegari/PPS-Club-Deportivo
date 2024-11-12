import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "./SportDetail.css";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Alert from '../alert/Alert'

const SportDetail = ({ sport, onClose }) => {
  const { user, token } = useContext(AuthenticationContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sportSessions, setSportSessions] = useState([]);
  const [alertMessage, setAlertMessage] = useState("")

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

  const handleInscripcion = async () => {
    try {
      const response = await fetch(
        `https://localhost:7081/api/Sports/SignUpSport?memberId=${user.id}&sportId=${sport.id}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        setShowConfirmation(true);
      } else {
        const errorData = await response.text();
        setAlertMessage(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error)
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
                      <th>Horario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sportSessions.map((session, index) =>
                      convertToDays(session.daysOfWeek).map((day, dayIndex) => (
                        <tr key={`${index}-${dayIndex}`}>
                          <td>{day}</td>
                          <td>{session.time}</td>{" "}
                          {/* Horario compartido por todos los días */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>

                <h4>Descripción</h4>
                <ul className="sport-detail-list">
                  {sportSessions.map((session, index) => (
                    <li key={index}>
                      <b>Profesor:</b> {session.coach.name} - <b>Cancha:</b>{" "}
                      {session.field.name}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Aún no hay horarios disponibles para este deporte</p>
            )}
            {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage("")}></Alert>}
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
