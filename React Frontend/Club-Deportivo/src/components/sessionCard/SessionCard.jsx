import React from 'react'
import './SessionCard.css'
import { Button } from 'react-bootstrap'

const SessionCard = ({ startTime, endTime, field, coach, sport, daysOfWeek }) => {
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
      
    return (
        <div className="session-card">
            <h3 className='title'>{sport}</h3>
            <hr></hr>
            <p><strong>Días:</strong> {convertToDays(daysOfWeek)}</p>
            <p><strong>Hora de Inicio:</strong> {startTime}</p>
            <p><strong>Hora de Finalización:</strong> {endTime}</p>
            <p><strong>Cancha:</strong> {field}</p>
            <p><strong>Entrenador:</strong> {coach}</p>
            <div className='buttons-div'>  {/*Estos botones se mostrarian solo para los entrenadores */}
                <Button variant='danger'>Eliminar</Button>
                <Button variant='warning'>Editar</Button>
            </div>
        </div>
    )
}

export default SessionCard