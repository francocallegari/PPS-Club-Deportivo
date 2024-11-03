import React, { useContext, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "./SportDetail.css";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

const SportDetail = ({ sport, onClose }) => {
  const { user } = useContext(AuthenticationContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInscripcion = async () => {
    try {
      const response = await fetch(`https://localhost:7081/api/TrainingSession/`, {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          sportId: sport.id
        })
      });

      if (response.ok) {
        setShowConfirmation(true);
      } else {
        throw new Error("Error al realizar la inscripción");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

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

            <h4>Horarios de Entrenamiento</h4>
            <Table striped bordered hover className="sport-schedule">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Horario</th>
                </tr>
              </thead>

            </Table>

            <h4>Descripción</h4>
            <ul className="sport-detail-list">

            </ul>
          </div>
        </Modal.Body>

        <div className="btn-sport">
          {user && user.role === "Member" && (
            <Modal.Footer>
              <Button className="btn-Incribirme" onClick={handleInscripcion}>
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
