import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../alert/Alert";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorType, setErrorType] = useState("error");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
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

    setErrorType("success");
    setError("Su contraseña fue cambiada exitosamente.");
    setTimeout(() => {
      navigate('/');
    }, 1500);

    if (!response.ok) {
      const errorData = await response.json();
      setError("Hubo un problema al actualizar la contraseña. Inténtalo de nuevo más tarde.");
      console.error("Error en la respuesta del servidor:", errorData);
      throw new Error("Error en la solicitud");
    }
  };

  return (
    <div className="Login-form-container">
      <div className={`Login-card login-card`}>
        <form onSubmit={handleSubmit}>

          {error && (
            <Alert
              type={errorType}
              message={error}
              onClose={() => { setErrorType("error"); setError(null); }}
            />
          )}

          <div>
            <h3 className="custom-title">Cambiar Contraseña
            </h3>

            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />

            <label htmlFor="password" className="mt-3">Nueva Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />

            <label htmlFor="password" className="mt-3">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="password2"
              placeholder="Confirma tu nueva contraseña"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="login-input"
              required
            />

            <button type="submit" className="login-button">
              Cambiar Contraseña
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
