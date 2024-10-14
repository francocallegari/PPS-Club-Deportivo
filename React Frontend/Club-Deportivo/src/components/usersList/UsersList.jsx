import React from 'react'
import { ListGroup } from 'react-bootstrap'
import './UsersList.css'

const UsersList = () => {
    const USERS = [
        {id: 1, name: 'pepe', usertype: 'member'},
        {id: 2, name: 'pepe', usertype: 'member'},
        {id: 3, name: 'pepe', usertype: 'member'},
        {id: 4, name: 'pepe', usertype: 'member'},
        {id: 5, name: 'pepe', usertype: 'member'},
        {id: 6, name: 'pepe', usertype: 'member'},
        {id: 7, name: 'pepe', usertype: 'member'},
        {id: 8, name: 'pepe', usertype: 'member'},
        {id: 9, name: 'pepe', usertype: 'member'},
        {id: 10, name: 'pepe', usertype: 'member'},
        {id: 11, name: 'pepe', usertype: 'member'},
        {id: 12, name: 'pepe', usertype: 'member'}
    ]
  return (
    <ListGroup as="ul" className='users-list'>
        {USERS.map((u) => (
            <ListGroup.Item key={u.id} className='list-item'>Nombre: {u.name} - Tipo de Usuario: {u.usertype}</ListGroup.Item>
        ))}
    </ListGroup>
  )
}

export default UsersList