import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import {
  faPencilAlt,
  faFutbol,
  faSwimmer,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const { user, token } = useContext(AuthenticationContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = user.role === "Member"
          ? `https://localhost:7081/api/User/MemberById/${user.id}`
          : `https://localhost:7081/api/User/${user.id}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Error al obtener los datos del usuario");
        
        const data = await response.json();
        setUserData(data);
        console.log("Datos obtenidos del usuario:", data);
      } catch (error) {
        setError("Hubo un problema al cargar los datos del usuario.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user.id, user.role]);

  const handleModify = async () => {
    try {
      const formattedDate = new Date(userData.dateOfBirth).toISOString().split('T')[0];
  
      const updatedData = {
        Name: userData.name,  
        UserName: userData.userName,  
        dni: userData.dni,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        dateOfBirth: formattedDate,
        userType: user.role
      };
  
      const response = await fetch(`https://localhost:7081/api/User/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar los datos del usuario");
      }
  
      const data = response.status !== 204 ? await response.json() : updatedData;
      if (data) {
        setUserData(data);
      }
      setShow(false);
    } catch (error) {
      setError("Hubo un problema al actualizar los datos del usuario.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="socio-container">
      {error && <Alert variant="danger">{error}</Alert>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar mis datos </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formDocumentNumber">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                value={userData.dni || ""}
                onChange={(e) => setUserData({ ...userData, dni: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Dirección de correo electrónico</Form.Label>
              <Form.Control
                type="email"
                value={userData.email || ""}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Teléfono de contacto</Form.Label>
              <Form.Control
                type="text"
                value={userData.phoneNumber || ""}
                onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={userData.address || ""}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBirthdate">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                value={userData.dateOfBirth || ""}
                onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            className="boton-guardar"
            variant="primary"
            onClick={handleModify}
          >
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {userData && (
        <>
          <div className="perfil">
            <img
              src="https://cdn-icons-png.freepik.com/512/10015/10015419.png"
              alt="Foto de perfil"
              className="foto-perfil"
            />
            <h2 className="nombre-usuario">{userData.name}</h2>

            <Button className="boton-modificar" variant="primary" onClick={handleShow}>
              Modificar mis datos <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          </div>

          <div className="info-personal">
            <h3 className="section-title">Mis datos personales</h3>
            <div className="datos-grid">
              <p><label>Documento:</label> {userData.dni}</p>
              <p><label>Dirección de correo electrónico:</label> {userData.email}</p>
              <p><label>Teléfono de contacto:</label> {userData.phoneNumber}</p>
              <p><label>Dirección:</label> {userData.address}</p>
              <p><label>Fecha de nacimiento:</label> {userData.dateOfBirth}</p>
            </div>
          </div>
        </>
      )}

      {user && user.role === "Member" && (
        <div className="deportes">
          <h3 className="section-title">Deportes y actividades</h3>
          {userData.sportsAttended && userData.sportsAttended.length > 0 ? (
            userData.sportsAttended.map((sport) => (
              <div key={sport.id} className="deporte-item">
                <p>{sport.name}</p>
              </div>
            ))
          ) : (
            <p>No tienes deportes asignados.</p>
          )}
        </div>
      )}

      {user && user.role === "Member" && (
        <div className="suscripcion">
          <h3 className="section-title">Cuotas pendientes</h3>
          <Link to="/cuotas">
            <Button className="boton-modificar" variant="primary">
              Ver mis cuotas
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
