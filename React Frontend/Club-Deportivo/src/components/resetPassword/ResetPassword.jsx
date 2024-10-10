import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get("token");

    const response = await fetch('https://localhost:7081/api/Autenticacion/ResetPassword', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenFromUrl}`
      },
      body: JSON.stringify({ email, password, password2 })
    });

    alert("Su contraseña fue cambiada exitosamente.");

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la respuesta del servidor:", errorData);
        throw new Error("Error en la solicitud");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
        style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <h3 className="text-center mb-4">Cambiar Contraseña</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirma tu nueva contraseña"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-4">
            Cambiar Contraseña
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
