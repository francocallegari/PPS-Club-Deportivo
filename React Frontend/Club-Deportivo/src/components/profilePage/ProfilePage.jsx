import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import {
  faPencilAlt,
  faFutbol,
  faSwimmer,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { user } = useContext(AuthenticationContext);


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`https://localhost:7081/api/User/${user.id}`, {
          method: "GET",
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
          },
      });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  address
: 
"Calle Santa Fe 5678, Rosario, Santa Fe, Argentina"
dateOfBirth
: 
"1985-03-22"
dni
: 
"21234567"
email
: 
"tom.brown@club.com"
id
: 
5
name
: 
"Tom Brown"
phoneNumber
: 
"341-567-8901"
userDeletionDate
: 
null
userName
: 
"member_tom"
userRegistrationDate
: 
"0001-01-01T00:00:00"
userType
: 
"Member"

  return (
    <div className="socio-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar mis datos </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formDocumentNumber">
              <Form.Label>Documento</Form.Label>
              <Form.Control type="text" defaultValue={profileData.dni} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Dirección de correo electrónico</Form.Label>
              <Form.Control type="email" defaultValue={profileData.email} />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Teléfono de contacto</Form.Label>
              <Form.Control type="text" defaultValue={profileData.phoneNumber} />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" defaultValue={profileData.address} />
            </Form.Group>
            <Form.Group controlId="formBirthdate">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control type="date" defaultValue={profileData.dateOfBirth} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            className="boton-guardar"
            variant="primary"
            onClick={handleClose}
          >
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="perfil">
        <img
          src="https://cdn-icons-png.freepik.com/512/10015/10015419.png"
          alt="Foto de perfil"
          className="foto-perfil"
        />
        <h2 className="nombre-usuario">{profileData.name}</h2>

        <Button
          className="boton-modificar"
          variant="primary"
          onClick={handleShow}
        >
          Modificar mis datos <FontAwesomeIcon icon={faPencilAlt} />
        </Button>
      </div>

      <div className="info-personal">
        <h3 className="section-title">Mis datos personales</h3>
        <div className="datos-grid">
        <p><label>Nº de socio:</label> {profileData.id}</p>
          <p><label>Documento:</label> {profileData.dni}</p>
          <p><label>Dirección de correo electrónico:</label> {profileData.email}</p>
          <p><label>Teléfono de contacto:</label> {profileData.phoneNumber}</p>
          <p><label>Dirección:</label> {profileData.address}</p>
          <p><label>Fecha de nacimiento:</label> {profileData.dateOfBirth}</p>
        </div>
      </div>

      <div className="suscripcion">
        <h3 className="section-title">Mi suscripción</h3>
        <p>
          <label>
            <b>Estado:</b>
          </label>
          Socio Activo
        </p>
        <p>
          <label>
            <b>Datos de facturación:</b>
          </label>
          XXXX XXXX XXXX 3096
        </p>
      </div>

      {user && user.role === "Member" && (
        <div className="deportes">
          <h3 className="section-title">Deportes y actividades</h3>
          <FontAwesomeIcon icon={faVolleyballBall} /> Voley
          <h1></h1>
          <FontAwesomeIcon icon={faFutbol} /> Fútbol
          <h1></h1>
          <FontAwesomeIcon icon={faSwimmer} /> Natación
        </div>
      )}

      {user && user.role === "Member" && (
        <div className="suscripcion">
          <h3 className="section-title">Cuotas pendientes</h3>
          <Link to="/cuotas">
            <Button className="boton-modificar" variant="primary">
              Ver mis cuotas
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
