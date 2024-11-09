import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, CloseButton, Alert } from 'react-bootstrap'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext'

{/* El Coach se va a mandar automaticamente sacando su ID de la autenticacion.
    A partir del ID del Coach, se va a obtener el deporte del cual se quiere crear la clase
*/}

const SessionForm = ({ selectedSession, onSave, onEdit, ...props }) => {
    const {user, token} = useContext(AuthenticationContext)
    const [fields, setFields] = useState([])
    const [sessionData, setSessionData] = useState({
        days: [],
        startTime: '',
        duration: '',
        fieldId: ''
    })
    const [alert, setAlert] = useState(false)

    const fetchCoachSport = async () => {
        try {
            const response = await fetch(`https://localhost:7081/api/Sports/SportByCoachId/${user.id}`, {
                method: "GET",
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            if (response.ok) {
                const data = await response.json()

                await fetchFields(data.id)
            } else {
                throw new Error("Error al obtener el deporte del entrenador");
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const fetchFields = async (sportId) => {
        try {
            const response = await fetch(`https://localhost:7081/api/Field/FieldsBySportId?sportId=${sportId}`, {
                method: "GET",
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const data = await response.json();
                setFields(data);
            } else {
                throw new Error("Error al obtener las canchas");
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    useEffect(() => {
        if(user !== null && user.role === "Coach"){
            fetchCoachSport()
        }
        
    }, [])

    useEffect(() => {
        if (selectedSession) {
            setSessionData({
                days: selectedSession.daysOfWeek,
                startTime: selectedSession.startTime,
                duration: selectedSession.duration,
                fieldId: selectedSession.field.id
            })
            console.log(selectedSession) 
        } else {
            setSessionData({
                days: [],
                startTime: "",
                duration: "",
                fieldId: ""
            })
        }
    }, [selectedSession])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setSessionData((prevData) => {
            if (type === 'checkbox') {
                const dayValue = parseInt(value, 10);
                const updatedDays = checked
                    ? [...prevData.days, dayValue]  // Agregar si está marcado
                    : prevData.days.filter(day => day !== dayValue);  // Eliminar si está desmarcado

                return {
                    ...prevData,
                    days: updatedDays,
                }
            } else {
                return {
                    ...prevData,
                    [name]: value
                }
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(sessionData.days.length === 0 ||
            sessionData.startTime === "" ||
            sessionData.duration === "" ||
            sessionData.fieldId === ""
        ) {
            setAlert(true)
            return
        }

        const timeWithSeconds = sessionData.startTime + ":00"
        const sessionDto = {
            time: timeWithSeconds,
            duration: sessionData.duration,
            fieldId: sessionData.fieldId,
            coachId: user.id,
            daysOfWeek: sessionData.days
        }
        if (selectedSession) {
            onEdit(selectedSession.sessionId, sessionDto)
        } else {
            onSave(sessionDto)
        }

        setSessionData({
            days: [],
            startTime: '',
            duration: '',
            fieldId: ''
        })

        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {selectedSession ? 'Editar Clase' : 'Nueva Clase'}
                </Modal.Title>
                <CloseButton variant='white' className='close-button-modal' onClick={props.onHide}></CloseButton>
            </Modal.Header>
            <Modal.Body>
                {selectedSession && (
                    <Modal.Title>Deporte: {selectedSession.title}</Modal.Title>
                )}
                <Form>
                    <Form.Group>
                        <Form.Label><b>Días</b></Form.Label>
                        <Form.Check
                            name="Lunes"
                            type='checkbox'
                            label='Lunes'
                            value={1}
                            checked={sessionData.days.includes(1)}
                            onChange={handleChange}>
                        </Form.Check>
                        <Form.Check
                            name="Martes"
                            type='checkbox'
                            label='Martes'
                            value={2}
                            checked={sessionData.days.includes(2)}
                            onChange={handleChange}>

                        </Form.Check>
                        <Form.Check
                            name="Miercoles"
                            type='checkbox'
                            label='Miércoles'
                            value={3}
                            checked={sessionData.days.includes(3)}
                            onChange={handleChange}>

                        </Form.Check>
                        <Form.Check
                            name="Jueves"
                            type='checkbox'
                            label='Jueves'
                            value={4}
                            checked={sessionData.days.includes(4)}
                            onChange={handleChange}>

                        </Form.Check>
                        <Form.Check
                            name="Viernes"
                            type='checkbox'
                            label='Viernes'
                            value={5}
                            checked={sessionData.days.includes(5)}
                            onChange={handleChange}></Form.Check>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Hora de Inicio</b></Form.Label>
                        <Form.Control
                            type="time"
                            min="08:00"
                            max="22:00"
                            name='startTime'
                            value={sessionData.startTime}
                            onChange={handleChange}
                            required>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Duración -En Horas-</b></Form.Label>
                        <Form.Check
                            name="duration"
                            type='radio'
                            label='1:00'
                            value={60}  // 60 minutos
                            checked={sessionData.duration == 60}
                            onChange={handleChange}>
                        </Form.Check>
                        <Form.Check
                            name="duration"
                            type='radio'
                            label='1:30'
                            value={90}
                            checked={sessionData.duration == 90}
                            onChange={handleChange}>
                        </Form.Check>
                        <Form.Check
                            name="duration"
                            type='radio'
                            label='2:00'
                            value={120}
                            checked={sessionData.duration == 120}
                            onChange={handleChange}>
                        </Form.Check>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Cancha</b></Form.Label>
                        <Form.Select name='fieldId' value={sessionData.fieldId} onChange={handleChange}>
                            <option disabled value="">Seleccione una Cancha</option>
                            {fields.map((f) => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant='dark'>Cerrar</Button>
                <Button variant='success' onClick={handleSubmit}>{selectedSession ? 'Guardar Cambios' : 'Agregar Clase'}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SessionForm