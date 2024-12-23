import React, { useContext, useRef, useState } from "react";
import "./Login.css";
import RegisterForm from "./Register";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Alert from "../alert/Alert";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorType, setErrorType] = useState("error");
  const [error, setError] = useState(null);
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthenticationContext)

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
    setIsRecoveringPassword(false);
    navigate("/register");
  };

  const toggleRecoveringPassword = () => {
    setIsRecoveringPassword(!isRecoveringPassword);
    setIsRegistering(false);
  };

  const handleRecoverPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://localhost:7081/api/Autenticacion/ForgotPassword",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al recuperar la contraseña");
      }

      setEmail('');
      setErrorType("success");
      setError("Se ha enviado un correo para recuperar la contraseña.");
    } catch (error) {
      setError("Hubo un problema al recuperar la contraseña. Inténtalo de nuevo más tarde.");
      console.error("Error:", error);
      setEmail('');
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault()

    if (email.length === 0) {
      emailRef.current.focus()
      return
    }

    if (password.length === 0) {
      passwordRef.current.focus()
      return
    }

    try {
      const response = await fetch('https://localhost:7081/api/Autenticacion/authenticate', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const token = await response.text();

      if (response.ok) {
        console.log('Login successful');

        const decodedToken = jwtDecode(token)
        handleLogin(email, decodedToken.role, decodedToken.sub, token)
        navigate('/')
      } else {
        console.log('Usuario o contraseña inválido');
        setEmail('');
        setPassword('');
        setError('Credenciales inválidas');
      }
    } catch (error) {
      setError(error.message);
      console.error('Ocurrió un error inesperado', error);
      return;
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="Login-form-container">
      <div
        className={`Login-card ${isRegistering ? "register-card" : "login-card"
          }`}>

        {!isRegistering && (
          <h3 className="custom-title">
            {isRecoveringPassword ? "Recuperar Contraseña" : "Iniciar Sesión"}
          </h3>
        )}

        <form onSubmit={isRecoveringPassword ? handleRecoverPasswordSubmit : handleUserLogin}>

          {error && (
            <Alert
              type={errorType}
              message={error}
              onClose={() => { setErrorType("error"); setError(null); }}
            />
          )}

          {isRegistering ? (
            <RegisterForm />
          ) : isRecoveringPassword ? (
            <>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />

              <button type="submit" className="login-button">
                Recuperar Contraseña
              </button>
            </>
          ) : (
            <>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
              />

              <label htmlFor="password" className="mt-3">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
              />

              <button type="submit" className="login-button">
                Iniciar Sesión
              </button>
            </>
          )}
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
        </form>
      </div>
    </div>
  );
}

export default Login;
