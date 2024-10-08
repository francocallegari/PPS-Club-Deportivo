import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "./SportDetail.css";

const SportDetail = ({ sport, onClose }) => {
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

      <Modal.Footer>
        <Button className="btn-cerrar" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SportDetail;
