import React from 'react'
import { Button, Container, Image, Row, Col } from 'react-bootstrap'
import img_deportes from '../../images/deportes.jpeg'
import img_noticias from '../../images/noticias.jpeg'
import img_actividades from '../../images/actividades.jpeg'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';
import CarouselImages from '../carousel/Carousel'

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSportsNavigation = (e) => {
    e.preventDefault();
    navigate('/Sports');
  }

  return (
    <div className='dashboard-container mb-5'>
      <div>
        <CarouselImages></CarouselImages>
      </div>
      <div className='div-secciones mt-5'>
        <button className='seccion-container' onClick={handleSportsNavigation}>
          <h2>Deportes</h2>
          <Image src={img_deportes} style={{ width: '100%', height: 'auto', borderRadius: '20px' }} fluid></Image>
          <p>Revisa los distintos deportes en los que podés participar</p>
        </button>
        <button className='seccion-container'>
          <h2>Noticias</h2>
          <Image src={img_noticias} style={{ width: '100%', height: 'auto', borderRadius: '20px' }} fluid></Image>
          <p>Revisa las noticias relacionadas al Club</p>
        </button>
        <button className='seccion-container'>
          <h2>Actividades</h2>
          <Image src={img_actividades} style={{ width: '100%', height: '200px', borderRadius: '20px' }} fluid></Image>
          <p>¡Revisa las actividades disponibles a las que podés anotarte!</p>
        </button>
      </div>
      <div className='div-button mt-5'>
        <Button variant='dark' className='becomeMember-button'>ASOCIARME AL CLUB</Button>
      </div>
    </div>
  )
}

export default Dashboard