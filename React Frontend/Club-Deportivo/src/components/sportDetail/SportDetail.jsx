import React, { useContext } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "./SportDetail.css";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

const SportDetail = ({ sport, onClose }) => {

  const { user } = useContext(AuthenticationContext);

  return (
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
            src={sport?.image}
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
            <tbody>
              {sport?.schedule.map((day, index) => (
                <tr key={index}>
                  <td>{day.day}</td>
                  <td>{day.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>Descripción</h4>
          <ul className="sport-detail-list">
            {sport?.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      </Modal.Body>

      <div className="btn-sport">

        {user && user.role === "Member" && (
          <Modal.Footer>
            <Button className="btn-Incribirme">
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
  );
};

export default SportDetail;
