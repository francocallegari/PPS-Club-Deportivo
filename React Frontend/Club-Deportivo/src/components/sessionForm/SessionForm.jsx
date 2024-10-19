import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, CloseButton } from 'react-bootstrap'

{/* El Coach se va a mandar automaticamente sacando su ID de la autenticacion.
    A partir del ID del Coach, se va a obtener el deporte del cual se quiere crear la clase
*/}

const SessionForm = ({ selectedSession, onSave, ...props }) => {
    const fields = [
        { id: 1, name: 'Cancha de Basquet 1', sport: 'Basquet' },
        { id: 2, name: 'Cancha de Basquet 2', sport: 'Basquet' },
        { id: 3, name: 'Cancha de Tenis 1', sport: 'Tenis' },
        { id: 4, name: 'Cancha de Tenis 2', sport: 'Tenis' },
        { id: 5, name: 'Cancha de Voley 1', sport: 'Voley' },
        { id: 6, name: 'Cancha de Voley 2', sport: 'Voley' },
        { id: 7, name: 'Cancha de Futbol 1', sport: 'Fútbol' },
        { id: 8, name: 'Cancha de Futbol 2', sport: 'Fútbol' }
    ]

    const [sessionData, setSessionData] = useState({
        days: [],
        startTime: '',
        duration: '',
        field: ''
    })

    useEffect(() => {
        if (selectedSession) {
            setSessionData({
                days: selectedSession.daysOfWeek,
                startTime: selectedSession.startTime,
                duration: selectedSession.duration,
                field: selectedSession.field
            })
            console.log(selectedSession)
        } else {
            setSessionData({
                days: [],
                startTime: "",
                duration: "",
                field: ""
            })
        }
    }, [selectedSession])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSessionData({
            ...sessionData,
            [name]: value,
        })
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
                        <Form.Label>Días</Form.Label>
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
                        <Form.Label>Hora de Inicio</Form.Label>
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
                        <Form.Label>Duración -en minutos-</Form.Label>
                        <Form.Control
                            type='number'
                            name='duration'
                            value={sessionData.duration}
                            onChange={handleChange}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cancha</Form.Label>
                        <Form.Select name='field' value={sessionData.field} onChange={handleChange}>
                            <option disabled value="">Seleccione una Cancha</option>
                            {fields.map((f) => (
                                <option key={f.id} value={f.name}>{f.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant='dark'>Cerrar</Button>
                <Button variant='success'>{selectedSession ? 'Guardar Cambios' : 'Agregar Clase'}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SessionForm