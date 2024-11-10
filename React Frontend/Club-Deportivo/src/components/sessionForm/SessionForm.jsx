import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, CloseButton, Alert } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import "./SessionForm.css";

const SessionForm = ({ selectedSession, onSave, onEdit, ...props }) => {
  const { user, token } = useContext(AuthenticationContext);
  const [fields, setFields] = useState([]);
  const [sessionData, setSessionData] = useState({
    days: [],
    startTime: "",
    duration: "",
    fieldId: "",
  });

  const [alert, setAlert] = useState(false);

  const fetchCoachSport = async () => {
    try {
      const response = await fetch(
        `https://localhost:7081/api/Sports/SportByCoachId/${user.id}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        await fetchFields(data.id);
      } else {
        throw new Error("Error al obtener el deporte del entrenador");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchFields = async (sportId) => {
    try {
      const response = await fetch(
        `https://localhost:7081/api/Field/FieldsBySportId?sportId=${sportId}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFields(data);
      } else {
        throw new Error("Error al obtener las canchas");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user !== null && user.role === "Coach") {
      fetchCoachSport();
    }
  }, []);

  useEffect(() => {
    if (selectedSession) {
      setSessionData({
        days: selectedSession.daysOfWeek,
        startTime: selectedSession.startTime,
        duration: selectedSession.duration,
        fieldId: selectedSession.field.id,
      });
      console.log(selectedSession);
    } else {
      setSessionData({
        days: [],
        startTime: "",
        duration: "",
        fieldId: "",
      });
    }
  }, [selectedSession]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSessionData((prevData) => {
      if (type === "checkbox") {
        const dayValue = parseInt(value, 10);
        const updatedDays = checked
          ? [...prevData.days, dayValue] // Agregar si está marcado
          : prevData.days.filter((day) => day !== dayValue); // Eliminar si está desmarcado

        return {
          ...prevData,
          days: updatedDays,
        };
      } else {
        return {
          ...prevData,
          [name]: type === "radio" ? parseInt(value, 10) : value, // Convierte a número solo si es radio
        };
      }
    });
  };

  // Función para generar los horarios disponibles en intervalos de 30 minutos
  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        timeOptions.push(time);
      }
    }
    return timeOptions;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      sessionData.days.length === 0 ||
      sessionData.startTime === "" ||
      sessionData.duration === "" ||
      sessionData.fieldId === ""
    ) {
      setAlert(true);
      return;
    }

    const timeWithSeconds = sessionData.startTime + ":00";
    const sessionDto = {
      time: timeWithSeconds,
      duration: sessionData.duration,
      fieldId: sessionData.fieldId,
      coachId: user.id,
      daysOfWeek: sessionData.days,
    };
    if (selectedSession) {
      onEdit(selectedSession.sessionId, sessionDto);
    } else {
      onSave(sessionDto);
    }

    setSessionData({
      days: [],
      startTime: "",
      duration: "",
      fieldId: "",
    });

    props.onHide();
  };

  const resetForm = () => {
    setSessionData({
      days: [],
      startTime: "",
      duration: "",
      fieldId: "",
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        resetForm(); // Restablece el formulario al cerrar
        props.onHide();
      }}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedSession ? "Editar Clase" : "Nueva Clase"}
        </Modal.Title>
        <CloseButton
          variant="white"
          className="close-button-modal"
          onClick={() => {
            resetForm(); 
            props.onHide();
          }}
        ></CloseButton>
      </Modal.Header>
      <Modal.Body>
        {selectedSession && (
          <Modal.Title>Deporte: {selectedSession.title}</Modal.Title>
        )}
        <Form>
          <Form.Group>
            <Form.Label>
              <b>Días</b>
            </Form.Label>
            <div className="d-flex flex-column">
              <Form.Check
                inline
                name="Lunes"
                type="checkbox"
                label="Lunes"
                value={1}
                checked={sessionData.days.includes(1)}
                onChange={handleChange}
              />
              <Form.Check
                inline
                name="Martes"
                type="checkbox"
                label="Martes"
                value={2}
                checked={sessionData.days.includes(2)}
                onChange={handleChange}
              />
              <Form.Check
                inline
                name="Miércoles"
                type="checkbox"
                label="Miércoles"
                value={3}
                checked={sessionData.days.includes(3)}
                onChange={handleChange}
              />
              <Form.Check
                inline
                name="Jueves"
                type="checkbox"
                label="Jueves"
                value={4}
                checked={sessionData.days.includes(4)}
                onChange={handleChange}
              />
              <Form.Check
                inline
                name="Viernes"
                type="checkbox"
                label="Viernes"
                value={5}
                checked={sessionData.days.includes(5)}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Hora de Inicio</b>
            </Form.Label>
            <Form.Select
              name="startTime"
              value={sessionData.startTime}
              onChange={handleChange}
            >
              <option disabled value="">
                Seleccione una Hora
              </option>
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Duración - En Horas</b>
            </Form.Label>
            <div className="d-flex flex-column">
              <Form.Check
                inline
                name="duration"
                type="radio"
                label="1:00"
                value={60} // 60 minutos
                checked={sessionData.duration === 60}
                onChange={handleChange}
              />
              <Form.Check
                inline
                name="duration"
                type="radio"
                label="1:30"
                value={90}
                checked={sessionData.duration === 90}
                onChange={handleChange}
              />
              <Form.Check
                inline
                name="duration"
                type="radio"
                label="2:00"
                value={120}
                checked={sessionData.duration === 120}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Cancha</b>
            </Form.Label>
            <Form.Select
              name="fieldId"
              value={sessionData.fieldId}
              onChange={handleChange}
            >
              <option disabled value="">
                Seleccione una Cancha
              </option>
              {fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        {alert && (
          <Alert variant="danger" className="mt-3">
            Todos los campos son requeridos.
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-modal"
          variant="danger"
          onClick={() => {
            resetForm();
            props.onHide();
          }}
        >
          Cancelar
        </Button>
        <Button
          className="btn-modal"
          variant="primary"
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionForm;
