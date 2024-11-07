import React, { useContext, useState, useEffect } from 'react'
import './SessionCard.css'
import { Button, Modal } from 'react-bootstrap'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext'

const SessionCard = ({ session, onEdit, onDelete }) => {
    const { user } = useContext(AuthenticationContext)

    const days = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
    ]

    const convertToDays = (daysOfWeek) => {
        const daysConverted = daysOfWeek.map(day => days[day])
        return daysConverted.join(", ")
    }

    const sessionToEdit = () => {
        const start = new Date(`1970-01-01T${session.startTime}`);
        const end = new Date(`1970-01-01T${session.endTime}`);
        const duration = (end - start) / (1000 * 60); // duración en minutos

        const sessionData = {
            sessionId: session.id,
            startTime: session.startTime,
            duration: duration,
            field: session.extendedProps.field,
            daysOfWeek: session.daysOfWeek,
            title: session.title,
            coach: session.extendedProps.coach
        }

        onEdit(sessionData)
    }

    const handleDeleteSession = async () => {
        onDelete(session.id)
    }

    return (
        <>
            <div className="session-card">
                <h3 className='title'>{session.title}</h3>
                <hr></hr>
                <p className='card-info'><strong>Días:</strong> {convertToDays(session.daysOfWeek)}</p>
                <p className='card-info'><strong>Hora de Inicio:</strong> {session.startTime}</p>
                <p className='card-info'><strong>Hora de Finalización:</strong> {session.endTime}</p>
                <p className='card-info'><strong>Cancha:</strong> {session.extendedProps.field.name}</p>
                <p className='card-info'><strong>Entrenador:</strong> {session.extendedProps.coach.name}</p>
                {user.role === "Coach" && session.extendedProps.coach.sport.name == session.title && (
                    <div className='buttons-div'>  {/*Estos botones se mostrarian solo para los entrenadores */}
                        <Button variant='danger' onClick={handleDeleteSession}>Eliminar</Button>
                        <Button variant='warning' onClick={sessionToEdit}>Editar</Button>
                    </div>
                )}
            </div>
        </>
    )
}

export default SessionCard