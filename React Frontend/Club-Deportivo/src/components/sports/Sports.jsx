import React from "react";
import { Accordion } from "react-bootstrap";
import "./Sports.css";

const Sports = () => {
  const sportsList = [
    {
      id: 1,
      name: "Basquet - Masculino y Femenino",
      description:
        "Lugar de entrenamiento: Estadio - Lunes, miércoles y viernes a partir de las 18:30 hs , Cuota Deportiva: $24.000, Contacto: 341 744-5763",
    },
    {
      id: 2,
      name: "Voley - Masculino y Femenino",
      description:
        "Lugar de entrenamiento: Cancha de voley - Lunes a viernes a partir de las 18 hs, Cuota Deportiva: $18.000, Contacto: 341 143-5763",
    },
    {
      id: 3,
      name: "Tenis",
      description:
        "Lugar de entrenamiento: Cancha de tenis - Lunes a viernes a partir de las 16:30 hs, Cuota Deportiva: $28.000, Contacto: 341 711-1363",
    },
    {
      id: 4,
      name: "Futsal - Masculino y Femenino",
      description:
        "Lugar de entrenamiento: Estadio - Lunes a Viernes a partir de las 17 hs, Cuota Deportiva: $20.000, Contacto: 341 273-6763",
    },
    {
      id: 5,
      name: "Natación",
      description:
        "Lugar de entrenamiento: Pileta cubierta - Lunes y Miércoles a partir de las 18 hs, Cuota Deportiva: $22.000, Contacto: 341 711-1763",
    },
  ];

  return (
    <div className="sports-container">
      <h2 className="sports-title">Nuestros Deportes </h2>
      <Accordion>
        {sportsList.map((sport, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={sport.id}
            className="accordion-item"
          >
            <Accordion.Header className="accordion-header">
              {sport.name}
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              {sport.description}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Sports;
