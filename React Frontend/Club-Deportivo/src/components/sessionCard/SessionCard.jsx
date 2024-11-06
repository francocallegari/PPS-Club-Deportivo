import React, { useContext, useState, useEffect } from 'react'
import './SessionCard.css'
import { Button } from 'react-bootstrap'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext'

const SessionCard = ({ startTime, endTime, field, coach, sport, daysOfWeek, onEdit }) => {
    const { user } = useContext(AuthenticationContext)
    const [coachSport, setCoachSport] = useState(null)

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
                const data = await response.json();
                setCoachSport(data)
            } else {
                throw new Error("Error al obtener el deporte del entrenador");
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    useEffect(() => {
        if(user !== null && user.role === "Coach"){
            fetchCoachSport()
        }
    }, [user])

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
        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
        const duration = (end - start) / (1000 * 60); // duración en minutos

        const session = {
            startTime: startTime,
            duration: duration,
            field: field,
            daysOfWeek: daysOfWeek,
            title: sport,
            coach: coach
        }

        onEdit(session)
    }

    return (
        <div className="session-card">
            <h3 className='title'>{sport}</h3>
            <hr></hr>
            <p className='card-info'><strong>Días:</strong> {convertToDays(daysOfWeek)}</p>
            <p className='card-info'><strong>Hora de Inicio:</strong> {startTime}</p>
            <p className='card-info'><strong>Hora de Finalización:</strong> {endTime}</p>
            <p className='card-info'><strong>Cancha:</strong> {field}</p>
            <p className='card-info'><strong>Entrenador:</strong> {coach}</p>
            {user.role === "Coach" && coachSport && coachSport.name == sport && (
                <div className='buttons-div'>  {/*Estos botones se mostrarian solo para los entrenadores */}
                    <Button variant='danger'>Eliminar</Button>
                    <Button variant='warning' onClick={sessionToEdit}>Editar</Button>
                </div>
            )}
        </div>
    )
}

export default SessionCard