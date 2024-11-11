import React, { useState, useContext } from "react";
import "./ActivityCard.css";
import { Button, Modal } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Alert from '../alert/Alert'

const ActivityCard = ({ title, date, time, description, id }) => {
  const [showModal, setShowModal] = useState(false);
  const { user, token } = useContext(AuthenticationContext);
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("")

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleConfirmSignUp = async () => {
    handleClose()

    try {
      const response = await fetch(
        `https://localhost:7081/api/Event/SignUpEvent?memberId=${user.id}&eventId=${id}`,
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
        setAlertMessage("Se inscribió correctamente al evento")
        setAlertType("success")
      } else {
        const errorData = await response.text();
        setAlertMessage(errorData);
        setAlertType("error")
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error)
    }
  };

  return (
    <div className="activity-card">
      <h3>{title}</h3>
      <p>
        <strong>Fecha:</strong> {date}
      </p>
      <p>
        <strong>Hora:</strong> {time}
      </p>
      <p>{description}</p>

      {user && user.role === "Member" && (
        <Button className="btn-sign-up" onClick={handleShow}>
          INSCRIBIRSE
        </Button>
      )}

      {alertMessage && <Alert message={alertMessage} type={alertType} onClose={() => {setAlertMessage(""); setAlertType("")}}></Alert>}

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Inscripción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea inscribirse en la actividad{" "}
          <strong>{title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmSignUp}>
            Confirmar Inscripción
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActivityCard;
