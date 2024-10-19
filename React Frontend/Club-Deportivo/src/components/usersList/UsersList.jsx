import React, { useEffect, useState } from 'react'
import './UsersList.css'

const UsersList = ({ option }) => {
  const [response, setResponse] = useState([])

  useEffect(() => {
    const USERS = [
      { id: 1, name: "Manuel De Macedo", usertype: "admin" },
      { id: 2, name: "Franco Callegari", usertype: "admin" },
      { id: 3, name: "Facundo Gomez", usertype: "coach" },
      { id: 4, name: "Anabella Rustici", usertype: "coach" },
      { id: 5, name: "Aylen Guy", usertype: "director" },
      { id: 6, name: "Delfina Isaguirre", usertype: "director" },
      { id: 7, name: 'pepe', usertype: 'member' },
      { id: 8, name: 'pepe', usertype: 'member' },
      { id: 9, name: 'pepe', usertype: 'member' },
      { id: 10, name: 'pepe', usertype: 'member' },
      { id: 11, name: 'pepe', usertype: 'member' },
      { id: 12, name: 'pepe', usertype: 'member' }

    ];

    switch (option) {
      case "admins":
        const admins = USERS.filter((u) => u.usertype == "admin")
        setResponse(admins)
        break;
      case "members":
        const members = USERS.filter((u) => u.usertype == "member")
        setResponse(members)
        break;
      case "directors":
        const directors = USERS.filter((u) => u.usertype == "director")
        setResponse(directors)
        break;
      case "coaches":
        const coaches = USERS.filter((u) => u.usertype == "coach")
        setResponse(coaches)
        break;
      case "sportMembers":
        const sportMembers = USERS.filter((u) => u.usertype == "member")
        setResponse(sportMembers)
        break;
      default:
        setResponse(USERS)
    }
  }, [option])

  return (
    <div className='users-list'>
      {response.map((u) => (
        <p key={u.id} className='list-item'><i className="fas fa-user"></i>Nombre: {u.name}</p>
      ))}
    </div>
  )
}

export default UsersList