import React, { useState } from "react";
import "./ActivityCard.css";
import { Button, Modal } from "react-bootstrap";

const ActivityCard = ({ title, date, time, description }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleConfirmSignUp = () => {
    console.log("Usuario inscrito a la actividad:", title);
    handleClose();
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
      <Button className="btn-sign-up" onClick={handleShow}>
        INSCRIBIRSE
      </Button>

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
