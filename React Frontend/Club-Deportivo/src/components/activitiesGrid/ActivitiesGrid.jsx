import React, { useState } from "react";
import ActivityCard from "../activityCard/ActivityCard";
import { Modal, Button } from "react-bootstrap";
import "./ActivitiesGrid.css";
import CalendarEvents from "../calendarEvents/CalendarEvents";

const ActivitiesGrid = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);


  const handleSignUpClick = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const handleConfirm = () => {
    console.log(`Inscrito en: ${selectedActivity.title}`);
    setShowModal(false);
    setSelectedActivity(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  return (
    <div>
      <h2 className="activities-title">ACTIVIDADES</h2>
      <div className="activities-grid">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            title={activity.title}
            date={activity.date}
            time={activity.time}
            description={activity.description}
            link={activity.link}
            onSignUp={() => handleSignUpClick(activity)}
          />
        ))}
      </div>

      <CalendarEvents
        
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Deseas inscribirte en "{selectedActivity?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Sí, inscribirme
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActivitiesGrid;
