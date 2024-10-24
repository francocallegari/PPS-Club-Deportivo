import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import "./Register.css";

function RegisterForm() {
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [sex, setSex] = useState("Femenino");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleLinkClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  const validateForm = () => {
    setErrors({});
    const newErrors = {};
    if (!email) newErrors.email = "El email es obligatorio.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";
    if (!phone) newErrors.phone = "El número celular es obligatorio.";
    if (!birthDate) newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    if (!dni) newErrors.dni = "El DNI es obligatorio.";
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    setShowSuccessModal(true);
  };

  const handleRegisterClick = () => {
    handleSubmit();
  };

  const currentDate = new Date().toISOString().split("T")[0]; //para que te muestre hasta la fecha de hoy

  return (
    <Form className="register-form-container" onSubmit={handleSubmit}>
      <h3 className="custom-title">Registrarse</h3>
      <Row className="mb-3 spacing-bottom">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridPhone">
        <Form.Label>Celular</Form.Label>
        <Form.Control
          placeholder="Número celular"
          className="register-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <small className="text-danger">{errors.phone}</small>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridBirthdate">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={currentDate}
          required
          className="register-input"
        />
        {errors.birthDate && <small className="text-danger">{errors.birthDate}</small>}
      </Form.Group>

      <Row className="mb-3 spacing-bottom">
        <Form.Group as={Col} controlId="formGridDni">
          <Form.Label>DNI</Form.Label>
          <Form.Control
            className="register-input"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          {errors.dni && <small className="text-danger">{errors.dni}</small>}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSex">
          <Form.Label>Sexo</Form.Label>
          <Form.Select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="register-input"
          >
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
            <>Acepto los <a href="/" onClick={handleLinkClick} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}><strong>Términos y condiciones</strong></a></>
          }
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
      </Form.Group>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Términos y Condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong style={{ color: 'blue'}}>1. Aceptación: </strong>
            Al usar nuestro sitio o aplicación, aceptas estos términos. Si no estás de acuerdo, no utilices el servicio.
            <br/>
            <strong style={{ color: 'blue'}}>2. Uso del Servicio: </strong>
            El contenido de este sitio es solo para tu uso personal. No puedes reproducir ni distribuir ningún material sin permiso.
            <br/>
            <strong style={{ color: 'blue'}}>3. Privacidad: </strong>
            Cuidamos tu información personal conforme a nuestra Política de Privacidad. No compartiremos tus datos sin tu consentimiento, salvo cuando lo exija la ley.
            <br/>
            <strong style={{ color: 'blue'}}>4. Propiedad Intelectual: </strong>
            Todo el contenido, incluidos textos e imágenes, es propiedad de All Stars. No puedes usar nuestro contenido sin autorización.
            <br/>
            <strong style={{ color: 'blue'}}>5. Responsabilidad del Usuario: </strong>
            Debes usar el servicio de forma legal y apropiada, proporcionando información veraz.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Te has registrado con éxito. Puedes iniciar sesión ahora.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button 
        variant="primary" 
        onClick={handleRegisterClick}
        className="register-button" 
        disabled={!termsAccepted}
      >
        Registrarse
      </Button>
    </Form>
  );
}

export default RegisterForm;