import React, { useState } from "react";
import "./NewsCard.css";
import NewsDetail from "../newsDetail/NewsDetail";
import { Card, Button, Carousel } from "react-bootstrap";

const NewsCard = () => {

  const [selectedNews, setSelectedNews] = useState(null)

  const noticias = [
    {
      title: "Campeonato de Fútbol",
      description: "El equipo local ganó el campeonato de fútbol.",
      image: "https://images.pexels.com/photos/25754070/pexels-photo-25754070/free-photo-of-campo-jugando-deporte-sonriente.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      eventDate: "15 de septiembre de 2024",
      detailedDescription: "El campeonato de fútbol culminó con una emocionante final donde el equipo local se coronó campeón tras un partido reñido. La afición se reunió en el estadio para apoyar a los jugadores, quienes dieron lo mejor de sí en el campo. ¡Felicitaciones a todos los involucrados!",
    },
    {
      title: "Nueva Pileta Olímpica",
      description: "Se inaugura la nueva pileta olímpica del club.",
      image: "https://images.pexels.com/photos/9022668/pexels-photo-9022668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      eventDate: "1 de diciembre de 2024",
      detailedDescription: "La nueva pileta olímpica está diseñada para competiciones de alto nivel y estará abierta al público a partir del 2 de diciembre. Con una capacidad para albergar grandes eventos, este nuevo espacio promete ser un punto de encuentro para nadadores de todas las edades.",
    },
    {
      title: "Colonia de Verano",
      description: "¡No te pierdas las actividades de verano!",
      image: "https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      eventDate: "Inicio: 20 de diciembre de 2024",
      detailedDescription: "Durante la colonia de verano, se ofrecerán actividades recreativas, deportivas y talleres para niños de todas las edades. Desde juegos acuáticos hasta manualidades, cada día será una nueva aventura llena de diversión y aprendizaje.",
    },
    {
      title: "Fiesta de Fin de Año",
      description: "Celebra con nosotros en la gran fiesta de fin de año del club.",
      image: "https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      eventDate: "31 de diciembre de 2024",
      detailedDescription: "Únete a la fiesta de fin de año con música en vivo, juegos, comida y una cuenta regresiva especial para recibir el nuevo año. Habrá sorpresas y actividades para toda la familia, ¡no te lo puedes perder!",
    },
    {
      title: "Final del Campeonato de Básquet femenino",
      description: "¡Asiste a la final del campeonato y apoya a nuestro equipo local!",
      image: "https://infobrisas-s2.cdn.net.ar/st2i1700/2022/09/infobrisas/images/07/05/70561_3e27792375314af5a905ac322361fafa8d806bbec8ab9ba5235e121c05e3154a/sm.jpg",
      eventDate: "10 de noviembre de 2024",
      detailedDescription: "La final del campeonato enfrentará a los mejores equipos de la liga en un emocionante partido. Ven y muestra tu apoyo a nuestras talentosas jugadoras mientras luchan por el título en un juego que promete ser espectacular.",
    },
    {
      title: "Torneo de Tenis",
      description: "Inscríbete en el próximo torneo de tenis del club.",
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      eventDate: "5 de noviembre de 2024",
      detailedDescription: "El torneo de tenis está abierto para todas las categorías. Inscripciones hasta el 1 de noviembre. Es una gran oportunidad para competir y mejorar tus habilidades en la cancha. ¡No olvides llevar tu mejor juego!",
    },
    {
      title: "Evento running",
      description: "Participa en nuestra carrera solidaria y ayuda a quienes más lo necesitan.",
      image: "https://images.pexels.com/photos/18408960/pexels-photo-18408960/free-photo-of-gente-calle-hombres-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      eventDate: "20 de noviembre de 2024",
      detailedDescription: "La carrera solidaria recaudará fondos para ayudar a organizaciones benéficas. Todos los niveles son bienvenidos, así que trae a tus amigos y familiares para compartir una experiencia divertida y significativa.",
    },
    {
      title: "Taller de Yoga y Meditación",
      description: "Relájate y mejora tu bienestar participando en nuestro taller de yoga y meditación.",
      image: "https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      eventDate: "25 de noviembre de 2024",
      detailedDescription: "El taller incluye sesiones de yoga, meditación guiada y técnicas de relajación. Ideal para principiantes y para quienes buscan una pausa en su rutina diaria. Ven y descubre el poder de la paz interior.",
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

  const handleShowDetail = (newItem) => {
    setSelectedNews(newItem);
  };

  const handleCloseDetail = () => {
    setSelectedNews(null);
  };

  return (
    <div>
      <h1 className="ultimas-noticias">Últimas noticias</h1>
      <Carousel interval={null} controls={true} indicators={false}>
        {groupedNoticias.map((group, index) => (
          <Carousel.Item key={index}>
            <div
              className="news-container"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {group.map((news, newsIndex) => (
                <Card
                  key={newsIndex}
                  style={{ width: "16rem", margin: "20px" }}
                  className="news-card"
                >
                  <Card.Img
                    className="img-card"
                    variant="top"
                    src={news.image}
                  />
                  <Card.Body>
                    <Card.Title className="card-title">{news.title}</Card.Title>
                    <Card.Text>{news.description}</Card.Text>
                  </Card.Body>
                  <Button className="btn-ver-mas" onClick={() => handleShowDetail(news)}>
                    VER MÁS <i className="fas fa-arrow-right"></i>
                  </Button>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {selectedNews && <NewsDetail news={selectedNews} onClose={handleCloseDetail} />}
    </div>
  );
};

export default NewsCard;
