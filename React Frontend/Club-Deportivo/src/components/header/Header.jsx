import React from "react";
import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  const handleNewsNavigation = (e) => {
    e.preventDefault();
    navigate("/news");
  };

  const handleLoginNavigation = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Navbar className="navbar-container" expand="lg">
      <div className="navbar-logo">
        <span>Sports Club</span> {/* Texto alineado a la izquierda */}
      </div>
      <Nav className="mx-auto navbar-menu">
        <Nav.Item className="Nav-Seccion" onClick={handleHomeNavigation}>
          Inicio
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleSportsNavigation}>
          Deportes
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleActivitiesNavigation}>
          Actividades
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleNewsNavigation}>
          Noticias
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleLoginNavigation}>
          Iniciar Sesión
        </Nav.Item>
        <Nav.Item className="Nav-Seccion" onClick={handleLogout}>
          Cerrar Sesión
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
