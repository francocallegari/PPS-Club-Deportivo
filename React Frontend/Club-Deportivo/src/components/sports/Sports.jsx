import React from "react";
import "./Sports.css";

const Sports = () => {
  const sportsList = [
    {
      id: 1,
      name: "Basquet - Masculino y Femenino",
      description: [
        "Lugar de entrenamiento: Estadio - Lunes, miércoles y viernes a partir de las 18:30 hs",
        "Cuota Deportiva: $24.000",
        "Contacto: 341 744-5763",
      ],
      image:
        "http://webipedia.es/wp-content/uploads/2020/11/06_PelotaEntrandoACanasta.jpg",
    },
    {
      id: 2,
      name: "Voley - Masculino y Femenino",
      description: [
        "Lugar de entrenamiento: Cancha de voley - Lunes a viernes a partir de las 18 hs",
        "Cuota Deportiva: $18.000",
        "Contacto: 341 143-5763",
      ],
      image:
        "https://1.bp.blogspot.com/-F0PamBjTPXY/UZtg4uUZG3I/AAAAAAAACRI/6QIdNWnUeuA/s1600/Annerys-Victoria-Vargas-Valdez-Volleyball-London-2012-Olympics.jpg",
    },
    {
      id: 3,
      name: "Tenis",
      description: [
        "Lugar de entrenamiento: Cancha de tenis - Lunes a viernes a partir de las 16:30 hs",
        "Cuota Deportiva: $28.000",
        "Contacto: 341 711-1363",
      ],
      image: "https://deportivoromeral.cl/images/ramas/tenis2.jpg",
    },
    {
      id: 4,
      name: "Futsal - Masculino y Femenino",
      description: [
        "Lugar de entrenamiento: Estadio - Lunes a Viernes a partir de las 17 hs",
        "Cuota Deportiva: $20.000",
        "Contacto: 341 273-6763",
      ],
      image:
        "https://www.timbo.sc.gov.br/wp-content/uploads/2018/11/futsal-divulgacao.jpg",
    },
    {
      id: 5,
      name: "Natación",
      description: [
        "Lugar de entrenamiento: Pileta cubierta - Lunes y Miércoles a partir de las 18 hs",
        "Cuota Deportiva: $22.000",
        "Contacto: 341 711-1763",
      ],
      image:
        "https://media.revistagq.com/photos/5d15d8da274222b14be3327b/16:9/w_2560%2Cc_limit/gentrit-sylejmani-JjUyjE-oEbM-unsplash.jpg",
    },
  ];

  return (
    <div className="sports-container">
      <h2 className="sports-title">Nuestros Deportes</h2>
      <div className="sports-grid">
        {sportsList.map((sport) => (
          <div key={sport.id} className="sport-card">
            <img src={sport.image} alt={sport.name} className="sport-image" />
            <h3 className="sport-name">{sport.name}</h3>
            <ul className="sport-description">
              {sport.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sports;
