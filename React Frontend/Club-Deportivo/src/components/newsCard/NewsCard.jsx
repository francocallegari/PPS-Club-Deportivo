import React, { useState, useEffect } from "react";
import "./NewsCard.css";
import NewsDetail from "../newsDetail/NewsDetail";
import { Card, Button, Carousel } from "react-bootstrap";

const NewsCard = () => {
  const [noticias, setNoticias] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  // Función para obtener noticias del backend
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
        setNoticias(data); // Actualiza el estado de noticias con los datos obtenidos
      } else {
        throw new Error("Error al obtener las noticias");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchNews(); // Llama a la función cuando el componente se monta
  }, []);

  // Función para agrupar las noticias en lotes de 4 (si quieres mostrar 4 por slide)
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

      {selectedNews && <NewsDetail news={selectedNews} onClose={handleCloseDetail} />}
    </div>
  );
};

export default NewsCard;
