import React from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import img_deportes from '../../images/deportes.jpeg'
import img_noticias from '../../images/noticias.jpeg'
import img_actividades from '../../images/actividades.jpeg'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSportsNavigation = (e) => {
    e.preventDefault();
    navigate('/Sports');
  }

  return (
    <div className='main-div'>
      <Container className='seccion-container' onClick={handleSportsNavigation}>
        <h2>Deportes</h2>
        <Image src={img_deportes} height='170px' style={{borderRadius:'20px'}}></Image>
        <p>Revisa los distintos deportes en los que podés participar</p>
      </Container>
      <Container className='seccion-container'>
        <h2>Noticias</h2>
        <Image src={img_noticias} height='170px' style={{borderRadius:'20px'}}></Image>
        <p>Revisa las noticias relacionadas al Club</p>
      </Container>
      <Container className='seccion-container'>
        <h2>Actividades</h2>
        <Image src={img_actividades} height='170px' width='320px' style={{borderRadius:'20px'}}></Image>
        <p>¡Revisa las actividades disponibles a las que podés anotarte!</p>
      </Container>
    </div>
  )
}

export default Dashboard