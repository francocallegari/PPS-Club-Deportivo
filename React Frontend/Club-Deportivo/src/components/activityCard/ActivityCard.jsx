import React from "react";
import "./ActivityCard.css";
import { Button } from "react-bootstrap";

const ActivityCard = ({ title, date, time, description, onSignUp }) => {
  return (
    <div className="activity-card">
      <h3>{title}</h3>
      <p><strong>Fecha:</strong> {date}</p>
      <p><strong>Hora:</strong> {time}</p>
      <p>{description}</p>
      <Button className="btn-sign-up" onClick={onSignUp}>
        INSCRIBIRSE
      </Button>
    </div>
  );
};

export default ActivityCard;
