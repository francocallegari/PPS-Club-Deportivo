import React, { useEffect, useState } from 'react';
import "./NewsDetail.css";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await fetch(`https://localhost:7081/api/News/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setNews(data);
                } else {
                    throw new Error("Error al obtener los detalles de la noticia");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchNewsDetail();
    }, [id]);

    const formattedDate = news?.publicationDate 
        ? new Date(news.publicationDate).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          }) 
        : "";

    return (
        <div className="news-detail-page">
            {news ? (
                <>
                    <p className="publication-date">{formattedDate}</p>
                    <h1 className="news-title">{news.title}</h1>
                    <img src={news.imageUrl} alt={news.title} className="news-image" />
                    <p className="news-description">{news.description}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default NewsDetail;
