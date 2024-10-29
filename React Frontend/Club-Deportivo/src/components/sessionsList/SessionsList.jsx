import React, { useRef, useState, useEffect } from 'react'
import SessionCard from '../sessionCard/SessionCard'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import './SessionsList.css'
import SessionForm from '../sessionForm/SessionForm'
import { Button, CloseButton, Modal } from 'react-bootstrap'
import UsersList from '../usersList/UsersList'

const SessionsList = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedSession, setSelectedSession] = useState(null)
    const [event, setEvent] = useState(null)
    const [showSessionModal, setShowSessionModal] = useState(false)

    const SESSIONS = [
        {
            id: 1,
            title: 'Basquet',
            daysOfWeek: [1, 3, 5],
            startTime: '08:00:00',
            endTime: '10:00:00',
            field: "Cancha de Basquet 1",
            coach: "Juan Perez"
        },
        {
            id: 2,
            title: 'Futbol',
            daysOfWeek: [2, 4],
            startTime: '09:00:00',
            endTime: '11:00:00',
            field: "Cancha de Futbol 1",
            coach: "Juan Perez"
        },
        {
            id: 3,
            title: 'Tenis',
            daysOfWeek: [2, 4],
            startTime: '10:00:00',
            endTime: '12:00:00',
            field: "Cancha de Tenis 1",
            coach: "Juan Perez"
        },
        {
            id: 4,
            title: 'Tenis',
            daysOfWeek: [2, 4],
            startTime: '17:00:00',
            endTime: '18:00:00',
            field: "Cancha de Tenis 2",
            coach: "Juan Perez"
        }
    ]

    const convertSessionsToEvents = (sessions) => {
        return sessions.map(session => {
            return {
                title: session.title,
                daysOfWeek: session.daysOfWeek,
                startTime: session.startTime,
                endTime: session.endTime,
                extendedProps: { // Propiedades adicionales 
                    field: session.field,
                    coach: session.coach
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
            <div className='sessions-container' style={{ display: 'flex', flexDirection: 'column'}}>
                <Button variant="primary" className='modal-button mb-5 mt-5' onClick={() => {
                    setSelectedSession(null)
                    setShowModal(true)
                }}>
                    + Agregar Clase
                </Button>

                <SessionForm
                    selectedSession={selectedSession}
                    show={showModal}
                    onHide={() => setShowModal(false)}
                />
                <div style={{ display: 'flex' }}>
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
                            events={convertSessionsToEvents(SESSIONS)}
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
                <div className='mt-5 mb-5'>
                    <h2 className='membersList-title'>SOCIOS ANOTADOS</h2>
                    <div className='users-list-container'>
                        <UsersList option="members"></UsersList>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SessionsList