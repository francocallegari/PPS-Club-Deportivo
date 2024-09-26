import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
        style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <h3 className="text-center mb-4">
          {isRegistering ? "Registrarse" : "Iniciar Sesión"}
        </h3>
        <Form>
          {isRegistering ? (
            <>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre" />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-4">
                Registrarse
              </Button>
            </>
          ) : (
            <>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-4">
                Iniciar Sesión
              </Button>
            </>
          )}
        </Form>

        <div className="d-flex justify-content-between mt-3">
          <a href="#forgot-password" className="text-decoration-none">
            ¿No recuerdas tu contraseña?
          </a>
          <a
            href="#register"
            className="text-decoration-none"
            onClick={toggleRegistering}
          >
            {isRegistering ? "Iniciar Sesión" : "Registrarse"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
