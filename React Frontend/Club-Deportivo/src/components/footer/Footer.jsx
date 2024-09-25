import React from 'react'
import { Container, Image } from 'react-bootstrap'
import logo from '../../images/attachment_125990042.png'
import './Footer.css'

const Footer = () => {
  return (
    <div className='div-footer'>
        <div className='footer-child'>
            <Image height={"60px"} src={logo}></Image>
        </div>
        <div className='footer-child'>
            SOCIOS
            <ul>
                <li>Atención al Socio</li>
                <li>Solicitud de Baja</li>
                <li>Beneficios del Club</li>
            </ul>
        </div>
        <div className='footer-child'>
            REDES SOCIALES
            <ul>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer