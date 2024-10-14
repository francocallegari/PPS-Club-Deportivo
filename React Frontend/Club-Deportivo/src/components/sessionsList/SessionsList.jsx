import React, { useRef, useState, useEffect } from 'react'
import SessionCard from '../sessionCard/SessionCard'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import './SessionsList.css'
import SessionForm from '../sessionForm/SessionForm'
import { Button } from 'react-bootstrap'
import UsersList from '../usersList/UsersList'

const SessionsList = () => {
    const sessionRefs = useRef({})
    const [highlightedSessionId, setHighlightedSessionId] = useState(null)
    const [previousHighlightedSessionId, setPreviousHighlightedSessionId] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [selectedSession, setSelectedSession] = useState(null)

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
            title: 'Fútbol',
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

    useEffect(() => {
        if (highlightedSessionId !== null) {
            const highlightedSessionRef = sessionRefs.current[highlightedSessionId];
            if (highlightedSessionRef) {
                highlightedSessionRef.classList.add('highlighted');
            }
            // Desmarca el evento anterior
            if (previousHighlightedSessionId !== null) {
                const previousHighlightedSessionRef = sessionRefs.current[previousHighlightedSessionId];
                if (previousHighlightedSessionRef) {
                    previousHighlightedSessionRef.classList.remove('highlighted');
                }
            }
        }
    }, [highlightedSessionId, previousHighlightedSessionId])

    const handleEventClick = (clickInfo) => {
        const sessionId = clickInfo.event.id;

        // Desplaza hacia el evento elegido
        if (sessionRefs.current[sessionId]) {
            sessionRefs.current[sessionId].scrollIntoView({ behavior: 'smooth' });
            if (sessionId === highlightedSessionId){
                return
            }
            setPreviousHighlightedSessionId(highlightedSessionId) // Actualiza el id del evento anterior 
            setHighlightedSessionId(sessionId); // Marca el evento como seleccionado
        }
    }

    const handleEdit = (session) => {
        setSelectedSession(session);  // Actualiza la clase que se quiere editar
        setShowModal(true)
    }

    return (
        <div>
            <h2 className="activities-title">CLASES</h2>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
                <Button variant="primary" className='modal-button mb-5 mt-5' onClick={() => {
                    setSelectedSession(null)
                    setShowModal(true)
                }}>
                    + Nueva Clase
                </Button>

                <SessionForm
                    selectedSession={selectedSession}
                    show={showModal}
                    onHide={() => setShowModal(false)}
                />
                <div className="calendar">
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
                        locale='es'
                        contentHeight="auto"
                        events={SESSIONS}
                        eventClick={handleEventClick}
                    />
                </div>
                <div className="activities-grid">
                    {SESSIONS.map((s) => (
                        <div
                            key={s.id}
                            ref={el => sessionRefs.current[s.id] = el}
                            className={s.id === highlightedSessionId ? 'highlighted' : ''}
                        >
                            <SessionCard
                                id={s.id}
                                startTime={s.startTime}
                                endTime={s.endTime}
                                daysOfWeek={s.daysOfWeek}
                                field={s.field}
                                coach={s.coach}
                                sport={s.title}
                                onEdit={handleEdit}
                            />
                        </div>
                    ))}
                </div>
                <div className='mt-5'>
                    <h2 className='membersList-title'>SOCIOS ANOTADOS</h2>
                    <div className='users-list-container'>
                        <UsersList></UsersList>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SessionsList