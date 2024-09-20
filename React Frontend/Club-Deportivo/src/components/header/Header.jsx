import React from 'react'
import './Header.css'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import logo from "../../images/attachment_125990042.png"
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    const handleHomeNavigation = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <Navbar className='navbar-container' >
            <Nav.Item className='Nav-Seccion'>
                <Image 
                height={"60px"}
                src={logo}>

                </Image>
            </Nav.Item>
            <Nav.Item className='Nav-Seccion' onClick={handleHomeNavigation}>
                Inicio
            </Nav.Item>
            <Nav.Item className='Nav-Seccion'>
                Deportes
            </Nav.Item>
            <Nav.Item className='Nav-Seccion'>
                Actividades
            </Nav.Item>
            <Nav.Item className='Nav-Seccion'>
                Noticias
            </Nav.Item>
            <Nav.Item className='Nav-Seccion'>
                Iniciar Sesión
            </Nav.Item>
            <Nav.Item className='Nav-Seccion'>
                Cerrar Sesión
            </Nav.Item>
        </Navbar>
    )
}

export default Header