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
    const [coachSport, setCoachSport] = useState({})

    const fetchCoachSport = async () => {
        try {
            const response = await fetch(`https://localhost:7081/api/Sports/SportByCoachId/${user.id}`, {
                method: "GET",
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const data = await response.json()
                setCoachSport(data)
                await fetchSessions(`https://localhost:7081/api/TrainingSession/SessionsBySportId/${data.id}`)
            } else {
                throw new Error("Error al obtener el deporte del entrenador");
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

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
            } else if (user.role == "Coach"){
                fetchCoachSport()
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
                id: session.id,
                title: session.field.sport.name,
                daysOfWeek: session.daysOfWeek,
                startTime: session.time,
                endTime: endTime,
                extendedProps: { // Propiedades adicionales 
                    field: session.field,
                    coach: session.coach
                }
            }
        })
    }

    const handleEventClick = (info) => {
        const { title, start, end, extendedProps, _def, id } = info.event
        const days = _def.recurringDef.typeData.daysOfWeek
        const eventInfo = {
            id: id,
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

    const addNewSession = async (newSession) => {
        try {
            const response = await fetch('https://localhost:7081/api/TrainingSession', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSession),
            });
            const data = await response.json();
            if (response.ok) {
                setSessions((prev) => [...prev, data])
            } else {
                console.log('Ocurrió un error')
                return
            }
        } catch (error) {
            console.error('Ocurrió un error inesperado', error)
        }
    }
    const editSession = async (sessionId, sessionDto) => {
        try {
            const response = await fetch(`https://localhost:7081/api/TrainingSession/${sessionId}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sessionDto),
            });
            if (response.ok) {
                setSelectedSession(null);  // Actualiza la clase que se quiere editar
                setShowModal(false)
                setEvent(null)
                fetchCoachSport()
            } else {
                console.log('Ocurrió un error')
                return
            }
        } catch (error) {
            console.error('Ocurrió un error inesperado', error)
        }
    }
    const deleteSession = async (sessionId) => {
        try {
            const response = await fetch(`https://localhost:7081/api/TrainingSession/${sessionId}`, {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                console.log("Session eliminada correctamente")
                setEvent(null)
                setShowSessionModal(false)
                fetchCoachSport()
            } else {
                throw new Error("Error al eliminar la clase de entrenamiento");
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div>
            <h2 className="sessions-title">CLASES</h2>
            {showAlert ? (
                <Alert variant='warning' style={{ textAlign: "center", marginLeft: "100px", marginRight: "100px" }}>Tiene que iniciar sesión para poder ver las clases disponibles!</Alert>
            ) : (
                <div className='sessions-container' style={{ display: 'flex', flexDirection: 'column' }}>
                    {user && user.role === "Coach" && (
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
                        onSave={addNewSession}
                        onEdit={editSession}
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
                                        session={event}
                                        onEdit={handleEdit}
                                        onDelete={deleteSession}
                                    />
                                </Modal>
                            )}
                        </div>
                    </div>
                    {user && user.role === "Coach" && coachSport && (
                        <div className='mt-5 mb-5'>
                            <h2 className='membersList-title'>SOCIOS ANOTADOS</h2>
                            <div className='users-list-container'>
                                <UsersList option="sportMembers" sportId={coachSport.id}></UsersList>
                            </div>
                        </div>
                    )}

                </div>
            )}

        </div>
    )
}

export default SessionsList