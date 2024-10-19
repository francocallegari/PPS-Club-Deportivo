import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faSwimmer,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="socio-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar mis datos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formSocioNumber">
              <Form.Label>Nº de socio</Form.Label>
              <Form.Control type="text" defaultValue="53048" />
            </Form.Group>
            <Form.Group controlId="formDocumentNumber">
              <Form.Label>Documento</Form.Label>
              <Form.Control type="text" defaultValue="36859884" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Dirección de correo electrónico</Form.Label>
              <Form.Control type="email" defaultValue="alexa@example.com" />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Teléfono de contacto</Form.Label>
              <Form.Control type="text" defaultValue="341 3225849" />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                defaultValue="Zeballos 1059, Rosario, Santa Fe"
              />
            </Form.Group>
            <Form.Group controlId="formBirthdate">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control type="date" defaultValue="1986-10-14" />
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
        <h2 className="nombre-usuario">Alexa Rodríguez</h2>

        <Button
          className="boton-modificar"
          variant="primary"
          onClick={handleShow}
        >
          Modificar mis datos
        </Button>
      </div>

      <div className="info-personal">
        <h3 className="section-title">Mis datos personales</h3>
        <div className="datos-grid">
          <p>
            <label>Nº de socio:</label>
            53048
          </p>
          <p>
            <label>Documento:</label>
            36859884
          </p>
          <p>
            <label>Dirección de correo electrónico:</label>
            alexa@example.com
          </p>
          <p>
            <label>Teléfono de contacto:</label>
            341 3225849
          </p>
          <p>
            <label>Dirección:</label>
            Zeballos 1059, Rosario, Santa Fe
          </p>
          <p>
            <label>Fecha de nacimiento:</label>
            14 de octubre de 1986
          </p>
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

      <div className="deportes">
        <h3 className="section-title">Deportes y actividades</h3>
        <FontAwesomeIcon icon={faVolleyballBall} /> Voley
        <h1></h1>
        <FontAwesomeIcon icon={faFutbol} /> Fútbol
        <h1></h1>
        <FontAwesomeIcon icon={faSwimmer} /> Natación
      </div>
    </div>
  );
};

export default ProfilePage;
