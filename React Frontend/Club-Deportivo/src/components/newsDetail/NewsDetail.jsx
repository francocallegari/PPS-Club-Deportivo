import React from "react";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams(); // Obtiene el ID de la noticia desde la URL


  return (
    <div>
      <h2>Detalles de la Noticia {id}</h2>

    </div>
  );
};

export default NewsDetail;
