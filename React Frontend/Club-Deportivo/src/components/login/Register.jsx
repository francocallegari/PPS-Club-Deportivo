import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Register.css";

function RegisterForm() {
  const [birthDate, setBirthDate] = useState("");

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            className="register-input"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            className="register-input"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridPhone">
        <Form.Label>Celular</Form.Label>
        <Form.Control placeholder="Número celular" className="register-input" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridBirthdate">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          className="register-input"
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridDni">
          <Form.Label>DNI</Form.Label>
          <Form.Control className="register-input" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSex">
          <Form.Label>Sexo</Form.Label>
          <Form.Select defaultValue="Femenino" className="register-input">
            <option>Femenino</option>
            <option>Masculino</option>
            <option>Otro</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Acepto los términos y condiciones" />
      </Form.Group>

      <Button variant="primary" type="submit" className="register-button">
        Registrarse
      </Button>
    </Form>
  );
}

export default RegisterForm;
