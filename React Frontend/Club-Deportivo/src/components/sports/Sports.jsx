import React, { useState, useEffect } from "react";
import "./Sports.css";
import { Button } from "react-bootstrap";
import SportDetail from "../sportDetail/SportDetail";

const Sports = () => {
  const [sport, setSport] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);

  const fetchSport = async () => {
    try {
      const response = await fetch("https://localhost:7081/api/Sports/sports",{
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      if(response.ok){
        const data = await response.json();
        setSport(data);
      } else {
        throw new Error("Error al obtener las noticias");
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() =>{
    fetchSport();
  }, [])
  
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
        {sport.map((sport) => (
          <div key={sport.id} className="sport-card">
            <img src={sport.imageURL} alt={sport.name} className="sport-image" />
            <h3 className="sport-name">{sport.name}</h3>
            <Button className="btn-ver-mas" onClick={() => handleShowDetail(sport)}>
              VER MÁS  <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
        ))}
      </div>
      {selectedSport && <SportDetail sport={selectedSport} onClose={handleCloseDetail} />}
    </div>
  );
};

export default Sports;