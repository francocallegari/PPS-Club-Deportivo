import React, { useState } from "react";
import "./Login.css";
import RegisterForm from "./Register";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [email, setEmail] = useState("");

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
    setIsRecoveringPassword(false);
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

      alert("Se ha enviado un correo para recuperar la contraseña.");
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Hubo un problema al recuperar la contraseña. Inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div className="Login-form-container">
      <div
        className={`Login-card ${
          isRegistering ? "register-card" : "login-card"
        }`}
      >
        <h3 className="custom-title">
          {isRegistering
            ? "Registrarse"
            : isRecoveringPassword
            ? "Recuperar Contraseña"
            : "Iniciar Sesión"}
        </h3>
        <form
          onSubmit={
            isRecoveringPassword ? handleRecoverPasswordSubmit : undefined
          }
        >
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
              />

              <label htmlFor="password" className="mt-3">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className="login-input"
              />

              <button type="submit" className="login-button">
                Iniciar Sesión
              </button>
            </>
          )}
        </form>

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
      </div>
    </div>
  );
}

export default Login;
