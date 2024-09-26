import React from "react";
import { Link } from "react-router-dom";
import "./NewsCard.css";

const NewsCard = ({ title, image, excerpt, link }) => {
  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-image" />
      <div className="news-content">
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <Link to={`/noticia/${link}`} className="btn-read-more">
          CONTINUAR LEYENDO
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
