import React from "react";
import "./Dashboard.css";
import { Card, Button, Carousel } from "react-bootstrap";
import CarouselImages from "../carousel/Carousel";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const noticias = [
    {
      title: "Campeonato de Fútbol",
      description: "El equipo local ganó el campeonato de fútbol.",
      image: "https://images.pexels.com/photos/25754070/pexels-photo-25754070/free-photo-of-campo-jugando-deporte-sonriente.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Nueva Pileta Olímpica",
      description: "Se inaugura la nueva pileta olímpica del club.",
      image: "https://images.pexels.com/photos/9022668/pexels-photo-9022668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Colonia de Verano",
      description: "¡No te pierdas las actividades de verano!",
      image: "https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Fiesta de Fin de Año",
      description: "Celebra con nosotros en la gran fiesta de fin de año del club.",
      image: "https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      title: "Final del Campeonato de Básquet femenino",
      description: "¡Asiste a la final del campeonato y apoya a nuestro equipo local!",
      image: "https://infobrisas-s2.cdn.net.ar/st2i1700/2022/09/infobrisas/images/07/05/70561_3e27792375314af5a905ac322361fafa8d806bbec8ab9ba5235e121c05e3154a/sm.jpg",
    },
    {
      title: "Torneo de Tenis",
      description: "Inscríbete en el próximo torneo de tenis del club.",
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Evento running",
      description: "Participa en nuestra carrera solidaria y ayuda a quienes más lo necesitan.",
      image: "https://images.pexels.com/photos/18408960/pexels-photo-18408960/free-photo-of-gente-calle-hombres-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Taller de Yoga y Meditación",
      description: "Relájate y mejora tu bienestar participando en nuestro taller de yoga y meditación.",
      image: "https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
  ];

  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const groupedNoticias = chunkArray(noticias, 4);

  const navigate = useNavigate();

  const handleRegisterNavigation = (e) => {
    e.preventDefault();
    navigate("/register")
  }

  return (
    <div className="dashboard-container mb-5">
      <div>
        <CarouselImages />
      </div>
      <div>
        <h1 className="ultimas-noticias">Últimas noticias</h1>
        <Carousel interval={null} controls={true} indicators={false}>
          {groupedNoticias.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="news-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {group.map((news, newsIndex) => (
                  <Card key={newsIndex} style={{ width: "16rem", margin: "20px" }} className="news-card">
                    <Card.Img className="img-card" variant="top" src={news.image} />
                    <Card.Body>
                      <Card.Title className="card-title">{news.title}</Card.Title>
                      <Card.Text>{news.description}</Card.Text>
                    </Card.Body>
                    <Button className="btn-ver-mas">
                      Ver más <i className="fas fa-arrow-right"></i>
                    </Button>
                  </Card>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="div-button mt-5">
        <Button variant="dark" className="becomeMember-button" onClick={handleRegisterNavigation}>
          ASOCIARME AL CLUB
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
