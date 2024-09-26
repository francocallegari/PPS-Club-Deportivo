import React, { useState } from "react";
import ActivityCard from "../activityCard/ActivityCard";
import { Modal, Button } from "react-bootstrap";
import "./ActivitiesGrid.css";

const ActivitiesGrid = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Datos estáticos de ejemplo
  const activities = [
    {
      id: 1,
      title: "Entrenamiento de Fútbol",
      date: "2024-09-30",
      time: "10:00 AM",
      description: "Un entrenamiento para todos los niveles.",
      link: "/actividades/futbol-entrenamiento",
    },
    {
      id: 2,
      title: "Clase de Yoga",
      date: "2024-10-02",
      time: "6:00 PM",
      description: "Relájate y mejora tu flexibilidad.",
      link: "/actividades/clase-yoga",
    },
    {
      id: 3,
      title: "Torneo de Ajedrez",
      date: "2024-10-05",
      time: "3:00 PM",
      description: "Competencia abierta para todos los socios.",
      link: "/actividades/torneo-ajedrez",
    },
    {
      id: 4,
      title: "Excursión al Parque",
      date: "2024-10-10",
      time: "9:00 AM",
      description: "Disfruta de un día en la naturaleza.",
      link: "/actividades/excursion-parque",
    },
  ];

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
