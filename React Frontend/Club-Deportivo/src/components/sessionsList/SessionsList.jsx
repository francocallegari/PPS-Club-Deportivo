import React, { useRef, useState, useEffect, useContext } from 'react'
import SessionCard from '../sessionCard/SessionCard'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import './SessionsList.css'
import SessionForm from '../sessionForm/SessionForm'
import { Alert, Button, CloseButton, Modal } from 'react-bootstrap'
import UsersList from '../usersList/UsersList'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext'
import { useNavigate } from 'react-router-dom'

const SessionsList = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedSession, setSelectedSession] = useState(null)
    const [event, setEvent] = useState(null)
    const [showSessionModal, setShowSessionModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [sessions, setSessions] = useState([])
    const { user } = useContext(AuthenticationContext)

    const fetchSessions = async (url) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const data = await response.json();
                setSessions(data);
                console.log(data)
            } else {
                throw new Error("Error al obtener las clases de entrenamiento");
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    useEffect(() => {
        if (user !== null) {
            if (user.role == "Member") {
                const url = `https://localhost:7081/api/TrainingSession/SessionsByMemberId?memberId=${user.id}`
                fetchSessions(url)
            } else {
                const url = "https://localhost:7081/api/TrainingSession/Sessions"
                fetchSessions(url)
            }
        } else {
            setShowAlert(true)
            //navigate("/login")
        }

    }, [user])

    const convertSessionsToEvents = (sessions) => {
        return sessions.map(session => {
            let [hours, minutes] = session.time.split(":").map(Number);

            // Crear un objeto Date y configurar la hora inicial
            let startDate = new Date(`1970-01-01T${session.time}`);
            startDate.setHours(hours, minutes, 0, 0);

            // Sumar los minutos
            startDate.setMinutes(startDate.getMinutes() + session.duration);

            // Actualizar el horario al nuevo valor en formato "HH:MM"
            const endTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}`;

            return {
                title: session.field.sport.name,
                daysOfWeek: session.daysOfWeek,
                startTime: session.time,
                endTime: endTime,
                extendedProps: { // Propiedades adicionales 
                    field: session.field.name,
                    coach: session.coach.name
                }
            }
        })
    }

    const handleEventClick = (info) => {
        const { title, start, end, extendedProps, _def } = info.event
        const days = _def.recurringDef.typeData.daysOfWeek
        const eventInfo = {
            title: title,
            daysOfWeek: days,
            startTime: start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            extendedProps: extendedProps
        }
        setEvent(eventInfo)
        setShowSessionModal(true)
    }

    const handleEdit = (session) => {
        setSelectedSession(session);  // Actualiza la clase que se quiere editar
        setShowModal(true)
    }

    return (
        <div>
            <h2 className="sessions-title">CLASES</h2>
            {showAlert ? (
                <Alert variant='warning' style={{ textAlign: "center", marginLeft: "100px", marginRight: "100px" }}>Tiene que iniciar sesión para poder ver las clases disponibles!</Alert>
            ) : (
                <div className='sessions-container' style={{ display: 'flex', flexDirection: 'column' }}>
                    {user.role === "Coach" && (
                        <Button variant="primary" className='modal-button mb-5 mt-5' onClick={() => {
                            setSelectedSession(null)
                            setShowModal(true)
                        }}>
                            + Agregar Clase
                        </Button>
                    )}

                    <SessionForm
                        selectedSession={selectedSession}
                        show={showModal}
                        onHide={() => setShowModal(false)}
                    />
                    <div style={{ display: 'flex', marginBottom: "30px" }}>
                        <div className="calendarContainer">
                            <FullCalendar
                                plugins={[timeGridPlugin]}
                                initialView="timeGridWeek"
                                headerToolbar={false} // Oculta el toolbar (prev, next, etc)
                                allDaySlot={false} // Oculta la fila de "Todo el día"
                                slotMinTime="08:00:00" // Hora de inicio
                                slotMaxTime="22:00:00" // Hora de fin
                                slotDuration="00:30:00" // Intervalos de 30 minutos
                                slotLabelInterval="01:00:00" // Mostrar etiqueta cada hora
                                dayHeaderFormat={{ weekday: 'long' }} // Mostrar solo el nombre del día
                                weekends={false}
                                locale='es'
                                contentHeight="auto"
                                events={convertSessionsToEvents(sessions)}
                                eventClick={handleEventClick}
                                eventClassNames={(arg) => `event-${arg.event.title}`}
                            />
                        </div>
                        <div>
                            {event && (
                                <Modal show={showSessionModal} onHide={() => setShowSessionModal(false)}>
                                    <Modal.Header className='modal-header'>
                                        <CloseButton variant='white' className='close-button-modal' onClick={() => setShowSessionModal(false)}></CloseButton>
                                    </Modal.Header>
                                    <SessionCard
                                        startTime={event.startTime}
                                        endTime={event.endTime}
                                        daysOfWeek={event.daysOfWeek}
                                        field={event.extendedProps.field}
                                        coach={event.extendedProps.coach}
                                        sport={event.title}
                                        onEdit={handleEdit}
                                    />
                                </Modal>
                            )}
                        </div>
                    </div>
                    {user && user.role === "Coach" && (
                        <div className='mt-5 mb-5'>
                            <h2 className='membersList-title'>SOCIOS ANOTADOS</h2>
                            <div className='users-list-container'>
                                <UsersList option="members"></UsersList>
                            </div>
                        </div>
                    )}

                </div>
            )}

        </div>
    )
}

export default SessionsList