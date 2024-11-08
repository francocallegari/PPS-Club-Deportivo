import React, { useState, useEffect } from "react";
import "./NewsCard.css";
import { Card, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const NewsCard = () => {
  const [noticias, setNoticias] = useState([]);
  const navigate = useNavigate(); // Inicializar useNavigate

  const fetchNews = async () => {
    try {
      const response = await fetch("https://localhost:7081/api/News/News", {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNoticias(data);
      } else {
        throw new Error("Error al obtener las noticias");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const groupedNoticias = chunkArray(noticias, 4);

  const handleShowDetail = (news) => {
    navigate(`/noticia/${news.id}`); // Navegar a la URL con el ID de la noticia
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
                    src={news.imageUrl}
                  />
                  <Card.Body>
                    <Card.Title className="card-title">{news.title}</Card.Title>
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
    </div>
  );
};

export default NewsCard;
