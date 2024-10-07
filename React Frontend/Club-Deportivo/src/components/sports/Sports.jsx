import React, { useState } from "react";
import "./Sports.css";
import { Button } from "react-bootstrap";
import SportDetail from "../sportDetail/SportDetail";

const Sports = () => {

  const [selectedSport, setSelectedSport] = useState(null);

  const sportsList = [
    {
      id: 1,
      name: "Basquet",
      description: [
        "Lugar de entrenamiento: Cancha de basquet",
        "Entrenador: Juan Pérez",
      ],
      image:
        "http://webipedia.es/wp-content/uploads/2020/11/06_PelotaEntrandoACanasta.jpg",
      schedule: [
        { day: 'Lunes', time: '10:00 - 12:00' },
        { day: 'Miércoles', time: '14:00 - 16:00' },
        { day: 'Viernes', time: '16:00 - 18:00' },
      ],
    },
    {
      id: 2,
      name: "Voley",
      description: [
        "Lugar de entrenamiento: Cancha de voley",
        "Entrenadora: Sofia Gonzalez",
      ],
      image:
        "https://1.bp.blogspot.com/-F0PamBjTPXY/UZtg4uUZG3I/AAAAAAAACRI/6QIdNWnUeuA/s1600/Annerys-Victoria-Vargas-Valdez-Volleyball-London-2012-Olympics.jpg",
      schedule: [
        { day: 'Martes', time: '10:00 - 12:00' },
        { day: 'Jueves', time: '14:00 - 16:00' },
      ],
    },
    {
      id: 3,
      name: "Tenis",
      description: [
        "Lugar de entrenamiento: Cancha de tenis",
        "Entrenador: Pablo Ruiz",
      ],
      image: "https://deportivoromeral.cl/images/ramas/tenis2.jpg",
      schedule: [
        { day: 'Lunes', time: '10:00 - 12:00' },
        { day: 'Miércoles', time: '14:00 - 16:00' },
        { day: 'Viernes', time: '16:00 - 18:00' },
      ],
    },
    {
      id: 4,
      name: "Futsal",
      description: [
        "Lugar de entrenamiento: Estadio",
        "Entrenador: Esteban Gutierrez",
      ],
      image:
        "https://www.timbo.sc.gov.br/wp-content/uploads/2018/11/futsal-divulgacao.jpg",
      schedule: [
        { day: 'Lunes', time: '10:00 - 12:00' },
        { day: 'Miércoles', time: '14:00 - 16:00' },
        { day: 'Viernes', time: '16:00 - 18:00' },
      ],
    },
    {
      id: 5,
      name: "Natación",
      description: [
        "Lugar de entrenamiento: Pileta cubierta",
        "Entrenador: María Gómez",
      ],
      image:
        "https://media.revistagq.com/photos/5d15d8da274222b14be3327b/16:9/w_2560%2Cc_limit/gentrit-sylejmani-JjUyjE-oEbM-unsplash.jpg",
      schedule: [
        { day: 'Lunes', time: '10:00 - 12:00' },
        { day: 'Miércoles', time: '14:00 - 16:00' },
        { day: 'Viernes', time: '16:00 - 18:00' },
      ],
    },
    {
      id: 6,
      name: "Hockey",
      description: [
        "Lugar de entrenamiento: Cancha de hockey",
        "Entrenadora: Juan Perez"
      ],
      image:
        "https://images.pexels.com/photos/163526/field-hockey-player-girls-game-163526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      schedule: [
        { day: 'Lunes', time: '10:00 - 12:00' },
        { day: 'Miércoles', time: '14:00 - 16:00' },
        { day: 'Viernes', time: '16:00 - 18:00' },
      ],
    },
  ];

  const handleShowDetail = (sport) => {
    setSelectedSport(sport);
  };

  const handleCloseDetail = () => {
    setSelectedSport(null);
  };

  return (
    <div className="sports-container">
      <h2 className="sports-title">Nuestros Deportes</h2>
      <div className="sports-grid">
        {sportsList.map((sport) => (
          <div key={sport.id} className="sport-card">
            <img src={sport.image} alt={sport.name} className="sport-image" />
            <h3 className="sport-name">{sport.name}</h3>
            <Button className="btn-ver-mas" onClick={() => handleShowDetail(sport)}>
              VER MÁS
            </Button>
          </div>
        ))}
      </div>
      {selectedSport && <SportDetail sport={selectedSport} onClose={handleCloseDetail} />}
    </div>
  );
};

export default Sports;