import React, { useState, useEffect, useContext } from "react";
import "./Sports.css";
import { Button } from "react-bootstrap";
import SportDetail from "../sportDetail/SportDetail";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Sports = () => {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const { user, token } = useContext(AuthenticationContext);
  const [pendingFees, setPendingFees] = useState([]);
  const [error, setError] = useState(null);

  const memberId = user?.id;

  // Fetch pending fees for the user
  useEffect(() => {
    const fetchPendingFees = async () => {
      if (!memberId || !token) return;

      try {
        const response = await fetch(
          `https://localhost:7081/api/MemberShipFee/MemberFees/${memberId}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const pendientes = data.filter((fee) => fee.status === 1);
          setPendingFees(pendientes);
        } else {
          console.error("Error al obtener las cuotas pendientes");
          setError("Hubo un problema al obtener las cuotas pendientes.");
        }
      } catch (error) {
        console.error("Error al obtener las cuotas:", error);
        setError("Hubo un problema al obtener las cuotas.");
      }
    };

    fetchPendingFees();
  }, [memberId, token]);

  const fetchSports = async () => {
    try {
      const response = await fetch("https://localhost:7081/api/Sports/sports", {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSports(data);
      } else {
        throw new Error("Error al obtener los deportes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleShowDetail = (sport) => {
    setSelectedSport(sport);
  };

  const handleCloseDetail = () => {
    setSelectedSport(null);
  };

  return (
    <div className="sports-container">
      <h2 className="sports-title">Nuestros Deportes</h2>

      {pendingFees.length >= 2 ? (
        <div>
          <Alert variant="warning" className="custom-alert">
            <p>Tienes 2 o más cuotas pendientes.</p>
            <p>No puedes inscribirte en nuevos deportes hasta que regularices tu situación.</p>
          </Alert>
          <div className="suscripcion">
            <h3 className="section-title">Cuotas pendientes</h3>
            <Link to="/cuotas">
              <Button className="boton-modificar" variant="primary">
                Ver mis cuotas
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="sports-grid">
          {sports.map((sport) => (
            <div key={sport.id} className="sport-card">
              <img src={sport.imageURL} alt={sport.name} className="sport-image" />
              <h3 className="sport-name">{sport.name}</h3>
              <Button className="btn-ver-mas" onClick={() => handleShowDetail(sport)}>
                VER MÁS  <i className="fas fa-arrow-right"></i>
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedSport && <SportDetail sport={selectedSport} onClose={handleCloseDetail} />}
    </div>
  );
};

export default Sports;
