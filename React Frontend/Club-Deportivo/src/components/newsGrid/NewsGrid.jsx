import React from "react";
import NewsCard from "../newsCard/NewsCard";
import "./NewsGrid.css";

const NewsGrid = () => {
  // Datos estáticos de ejemplo
  const news = [
    {
      id: 1,
      title: "Asamblea General Ordinaria",
      image:
        "https://img.freepik.com/foto-gratis/herramientas-deportivas_53876-138077.jpg",
      excerpt:
        "El próximo Miércoles 29 de Marzo a las 19:00 horas tendrá lugar...",
      link: "/noticias/asamblea-general",
    },
    {
      id: 2,
      title: "Nos Renovamos",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh5NG6nKCwA-JCdrvsD8jQ0UU9geWBiOvVWQ&s",
      excerpt: "Renovamos nuestra página web con nuevo diseño...",
      link: "/noticias/nos-renovamos",
    },
    {
      id: 3,
      title: "Beneficios para Socios",
      image:
        "https://st.depositphotos.com/1063346/1340/i/450/depositphotos_13409056-stock-photo-assorted-sports-equipment-on-black.jpg",
      excerpt: "Conoce los beneficios exclusivos para nuestros socios...",
      link: "/noticias/beneficios-socios",
    },
    {
      id: 4,
      title: "Acá va una noticia",
      image:
        "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSAHmDSOdLA5YgFlEkMmgdweIf3jyGI0EGKqU5U7TpO70GFAY48v1N51eMRpY6mbG-VzfPvgObhOwB8lX4",
      excerpt: "Conoce los beneficios exclusivos para nuestros socios...",
      link: "/noticias/beneficios-socios",
    },
  ];

  return (
    <div>
      <h2 className="news-title">NOTICIAS</h2>
      <div className="news-grid">
        {news.map((article) => (
          <NewsCard
            key={article.id}
            title={article.title}
            image={article.image}
            excerpt={article.excerpt}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
