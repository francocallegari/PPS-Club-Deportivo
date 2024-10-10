// Slider.js (si no lo tienes, crea este componente)
import React, { useState } from "react";
import "./Slider.css"; // Aquí defines los estilos para el slider

const Slider = ({ data, activeSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(activeSlide || 0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slider-content">
        <img
          src={data[currentIndex].image}
          alt={data[currentIndex].alt}
          style={{ width: "100%", height: "auto", maxHeight: "500px" }}
        />
      </div>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
