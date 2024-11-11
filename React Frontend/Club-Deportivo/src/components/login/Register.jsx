import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import "./Register.css";
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
import Alert from "../alert/Alert"

function RegisterForm({ checkForm, alertMessage }) {
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [existingUser, setExistingUser] = useState(false)
  const [apiMessage, setApiMessage] = useState(alertMessage)

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
    navigate("/");
  };

  const validateForm = () => {
    setErrors({});
    const newErrors = {};
    if (!email) newErrors.email = "El email es obligatorio.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";
    if (!phone) newErrors.phone = "El número celular es obligatorio.";
    if (!birthDate) newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    if (!dni) newErrors.dni = "El DNI es obligatorio.";
    if (!userName) newErrors.userName = "El nombre de usuario es obligatorio.";
    if (!fullName) newErrors.fullName = "El nombre completo es obligatorio.";
    if (!address) newErrors.address = "La dirección es obligatoria.";

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(errors)
      return;
    }

    const newUserData = {
      userName,
      name: fullName,
      email,
      password,
      userType: "Member",
      phoneNumber: phone,
      dateOfBirth: birthDate,
      dni,
      address
    };

    validateUser(newUserData)

  };

  const validateUser = async (userData) => {
    try {
      const response = await fetch(`https://localhost:7081/api/User/ValidateExistingUser?userName=${userData.userName}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        checkForm(userData)
      } else {
        setExistingUser(true)
        throw new Error("El usuario ya existe");
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const currentDate = new Date().toISOString().split("T")[0]; // Limita la fecha a la fecha de hoy

  return (
    <div className="registerDiv">
      <Form className="register-form-container">
        {apiMessage && <Alert message={apiMessage} onClose={() => setApiMessage("")}></Alert>}
    
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

          <Form.Group as={Col} controlId="formGridUserName">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="register-input"
            />
            {errors.userName && <small className="text-danger">{errors.userName}</small>}
            {existingUser && <small className="text-danger">El nombre de usuario ya está registrado</small>}
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridFullName">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre Completo"
            className="register-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Dirección"
            className="register-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <small className="text-danger">{errors.address}</small>}
        </Form.Group>

        {errors.server && <div className="text-danger mb-3">{errors.server}</div>}

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Términos y Condiciones</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong style={{ color: 'blue' }}>1. Aceptación: </strong>
              Al usar nuestro sitio o aplicación, aceptas estos términos. Si no estás de acuerdo, no utilices el servicio.
              <br />
              <strong style={{ color: 'blue' }}>2. Uso del Servicio: </strong>
              El contenido de este sitio es solo para tu uso personal. No puedes reproducir ni distribuir ningún material sin permiso.
              <br />
              <strong style={{ color: 'blue' }}>3. Privacidad: </strong>
              Cuidamos tu información personal conforme a nuestra Política de Privacidad. No compartiremos tus datos sin tu consentimiento, salvo cuando lo exija la ley.
              <br />
              <strong style={{ color: 'blue' }}>4. Propiedad Intelectual: </strong>
              Todo el contenido, incluidos textos e imágenes, es propiedad de All Stars. No puedes usar nuestro contenido sin autorización.
              <br />
              <strong style={{ color: 'blue' }}>5. Responsabilidad del Usuario: </strong>
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
            <Modal.Title>Éxito</Modal.Title>
          </Modal.Header>
          <Modal.Body>¡Te has registrado correctamente!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Iniciar sesión
            </Button>
          </Modal.Footer>
        </Modal>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '900px', marginBottom: '30px' }}>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label={<>Acepto los <a href="/" onClick={handleLinkClick} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}><strong>Términos y condiciones</strong></a></>}
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="register-button" disabled={!termsAccepted} onClick={handleSubmit}>
            Siguiente
            <FaArrowRight className="ml-3"></FaArrowRight>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;