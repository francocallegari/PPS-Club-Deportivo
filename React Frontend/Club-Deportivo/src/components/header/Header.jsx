import React, { useContext } from "react";
import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import logo from "../../images/logo.png";
import { Button } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthenticationContext)

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

  const handleLogoutButton = (e) => {
    handleLogout()
    navigate("/")
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleClubNavigation = (e) => {
    e.preventDefault();
    navigate("/club");
  };

  const handleRegisterNavigation = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    navigate("/admin")
  }

  const handleCoach = (e) => {
    e.preventDefault();
    navigate("/sessions")
  }

  const handleDirector = (e) => {
    e.preventDefault();
    navigate("/director");
  }

  const handleSessionsNavigation = (e) => {
    e.preventDefault();
    navigate("/sessions");
  }

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

        {(user?.role === "Member" || !user) && (
          <>
            <Nav.Item className="Nav-Seccion" onClick={handleSportsNavigation}>
              Deportes
            </Nav.Item>

            <Nav.Item className="Nav-Seccion" onClick={handleActivitiesNavigation}>
              Actividades
            </Nav.Item>
          </>
        )}

        {user && (
          <Nav.Item className="Nav-Seccion" onClick={handleSessionsNavigation}>
            Clases
          </Nav.Item>
        )}

        {user && user.role === "Admin" && (
          <Nav.Item className="Nav-Seccion" onClick={handleAdmin}>
            Panel de Admin
          </Nav.Item>
        )}

        {user && user.role === "Coach" && (
          <Nav.Item className="Nav-Seccion" onClick={handleCoach}>
            Panel del coach
          </Nav.Item>
        )}

        {user && user.role === "Director" && (
          <Nav.Item className="Nav-Seccion" onClick={handleDirector}>
            Panel del director
          </Nav.Item>
        )}

        <Nav.Item className="Nav-Seccion" onClick={!user ? handleLoginNavigation : handleLogoutButton}>
          {!user ? "Iniciar sesión" : "Cerrar Sesión"}
        </Nav.Item>

        {!user && (
          <div className="ecomeMember-button">
            <Nav.Item className="becomeMember-button" onClick={handleRegisterNavigation}>
              ASOCIATE
            </Nav.Item>
          </div>
        )}

        {user && (
          <i className="fa-regular fa-circle-user profile-icon" onClick={handleProfile}></i>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
