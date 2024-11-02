import React, { useState } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import "./Asociate.css";

function AsociateForm() {
  const [birthDate, setBirthDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
    setIsRecoveringPassword(false);
  };

  const toggleRecoveringPassword = () => {
    setIsRecoveringPassword(!isRecoveringPassword);
    setIsRegistering(false);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Form className="asociate-form">
      <h3 className="text-center">ASOCIATE</h3>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            className="asociate-input"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            className="asociate-input"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridPhone">
        <Form.Label>Celular</Form.Label>
        <Form.Control placeholder="Número celular" className="asociate-input" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridBirthdate">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className="asociate-input"
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridDni">
          <Form.Label>DNI</Form.Label>
          <Form.Control className="asociate-input" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSex">
          <Form.Label>Sexo</Form.Label>
          <Form.Select defaultValue="Femenino" className="asociate-input">
            <option>Femenino</option>
            <option>Masculino</option>
            <option>Otro</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          label={
            <>
              Acepto los{" "}
              <a
                href="/"
                onClick={handleLinkClick}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                <strong>Términos y condiciones</strong>
              </a>
            </>
          }
        />
      </Form.Group>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Términos y Condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong style={{ color: "blue" }}>1. Aceptación: </strong>
            Al usar nuestro sitio o aplicación, aceptas estos términos. Si no
            estás de acuerdo, no utilices el servicio.
            <br />
            <strong style={{ color: "blue" }}>2. Uso del Servicio: </strong>
            El contenido de este sitio es solo para tu uso personal. No puedes
            reproducir ni distribuir ningún material sin permiso.
            <br />
            <strong style={{ color: "blue" }}>3. Privacidad: </strong>
            Cuidamos tu información personal conforme a nuestra Política de
            Privacidad. No compartiremos tus datos sin tu consentimiento, salvo
            cuando lo exija la ley.
            <br />
            <strong style={{ color: "blue" }}>
              4. Propiedad Intelectual:{" "}
            </strong>
            Todo el contenido, incluidos textos e imágenes, es propiedad de All
            Stars. No puedes usar nuestro contenido sin autorización.
            <br />
            <strong style={{ color: "blue" }}>
              5. Responsabilidad del Usuario:{" "}
            </strong>
            Debes usar el servicio de forma legal y apropiada, proporcionando
            información veraz.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button variant="primary" type="submit" className="asociate-button">
        Asociarse
      </Button>
      <div className="login-links">
        {!isRecoveringPassword && (
          <a href="#forgot-password" onClick={toggleRecoveringPassword}>
            ¿No recuerdas tu contraseña?
          </a>
        )}
        {!isRecoveringPassword && (
          <a href="#register" onClick={toggleRegistering}>
            {isRegistering ? "Iniciar Sesión" : "Registrarse"}
          </a>
        )}
        {isRecoveringPassword && (
          <a href="#login" onClick={toggleRecoveringPassword}>
            Volver a Iniciar Sesión
          </a>
        )}
      </div>
    </Form>
  );
}

export default AsociateForm;