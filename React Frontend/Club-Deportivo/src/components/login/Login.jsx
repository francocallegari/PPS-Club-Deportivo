import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
    setIsRecoveringPassword(false);
  };

  const toggleRecoveringPassword = () => {
    setIsRecoveringPassword(!isRecoveringPassword);
    setIsRegistering(false);
  };


  //TODO: Pasar a hook personalizado
  function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7081/api/Autenticacion/authenticate', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok)
        throw new Error('Error al iniciar sesión');

      const token = await response.text();
      //TODO: Pasar a hook personalizado
      const decoded = decodeJWT(token);
      //TODO: Armar servicio de AuthenticationContext
      //handleLogin(data, email, data.type);
      navigate('/');

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.");
    }
  };

  const recoverPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7081/api/Autenticacion/ForgotPassword', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Error al recuperar la contraseña');
      }

      alert("Se ha enviado un correo para recuperar la contraseña.");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al recuperar la contraseña. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
        style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <h3 className="text-center mb-4">
          {isRegistering
            ? "Registrarse"
            : isRecoveringPassword
              ? "Recuperar Contraseña"
              : "Iniciar Sesión"}
        </h3>
        <Form onSubmit={isRecoveringPassword ? recoverPasswordHandler : loginHandler}>
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
          ) : isRecoveringPassword ? (
            <>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-4">
                Recuperar Contraseña
              </Button>
            </>
          ) : (
            <>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-4">
                Iniciar Sesión
              </Button>
            </>
          )}
        </Form>

        <div className="d-flex justify-content-between mt-3">
          {!isRecoveringPassword && (
            <a
              href="#forgot-password"
              className="text-decoration-none"
              onClick={toggleRecoveringPassword}
            >
              ¿No recuerdas tu contraseña?
            </a>
          )}
          {!isRecoveringPassword && (
            <a
              href="#register"
              className="text-decoration-none"
              onClick={toggleRegistering}
            >
              {isRegistering ? "Iniciar Sesión" : "Registrarse"}
            </a>
          )}
          {isRecoveringPassword && (
            <a
              href="#login"
              className="text-decoration-none"
              onClick={toggleRecoveringPassword}
            >
              Volver a Iniciar Sesión
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
