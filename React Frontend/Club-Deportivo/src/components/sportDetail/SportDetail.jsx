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
  const memberId = user?.id;
  const [pendingFees, setPendingFees] = useState([]);


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

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return new Date(0, 0, 0, hour, minute);
  };

  const formatTimeString = (date) => {
    return date.toTimeString().slice(0, 5); // 'HH:MM' format
  };

  const getEndTime = (startTime, duration) => {
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + duration);
    return endTime;
  };

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
    <div>
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
                          <th>Lugar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sportSessions.map((session, index) =>
                          convertToDays(session.daysOfWeek).map((day, dayIndex) => {
                            const startTime = formatTime(session.time);
                            const endTime = getEndTime(startTime, session.duration);
                            return (
                              <tr key={`${index}-${dayIndex}`}>
                                <td>{day}</td>
                                <td>
                                  {formatTimeString(startTime)} - {formatTimeString(endTime)}
                                </td>
                                <td>{session.field.name}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </Table>
  
                    <h4>Descripción</h4>
                    <ul className="sport-detail-list">
                      {sportSessions.map((session, index) => (
                        <li key={index}>
                          <b>Profesor:</b> {session.coach.name}
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
      )}
    </div>
  );
  
};

export default SportDetail;
