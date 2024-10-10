import React from "react";
import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import logo from "../../images/logo.png";

const Header = () => {
  const navigate = useNavigate();

  // Funciones de navegación
  const handleHomeNavigation = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSportsNavigation = (e) => {
    e.preventDefault();
    navigate("/sports");
  };

  const handleActivitiesNavigation = (e) => {
    e.preventDefault();
    navigate("/activities");
  };

  const handleLoginNavigation = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
  };
  
  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };
  
  const handleClubNavigation = (e) => {
    e.preventDefault();
    navigate("/club");
  };

  return (
    <Navbar className="navbar-container" expand="lg">
      <div className="Header-section ">
        <Image
          className="club-logo"
          src={logo}
          alt="Club Logo"
          onClick={handleHomeNavigation}
        />
      </div>
      <Nav className="mx-auto navbar-menu">
        <Nav.Item className="Nav-Seccion" onClick={handleClubNavigation}>
          El club
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleSportsNavigation}>
          Deportes
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleActivitiesNavigation}>
          Actividades
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleLoginNavigation}>
          Iniciar sesión
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleLogout}>
          Cerrar sesión
        </Nav.Item>
        <i class="fa-regular fa-circle-user" onClick={handleProfile}></i>
      </Nav>
    </Navbar>
  );
};

export default Header;
