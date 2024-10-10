import React from "react";
import "./Club.css";

function ClubInfo() {
  return (
    <div className="club-container">
      <div className="club-info">
        <h1>Bienvenidos al Club All Stars</h1>
        <p>
          El Club All Stars es un centro deportivo de clase mundial, ofreciendo
          una amplia variedad de actividades deportivas para todas las edades.
          Nuestro objetivo es promover el deporte y la salud física, brindando
          instalaciones de primer nivel y un ambiente comunitario inclusivo.
        </p>
        <h2>Nuestra Historia</h2>
        <p>
          Fundado en el año 2000, el club ha crecido constantemente,
          convirtiéndose en un referente para deportistas aficionados y
          profesionales. Desde sus inicios, el Club All Stars ha apoyado el
          desarrollo de talentos deportivos en deportes como el fútbol,
          básquetbol, voleibol, y más.
        </p>
        <h2>Instalaciones</h2>
        <p>
          Contamos con canchas de fútbol, pistas de atletismo, gimnasios de
          última generación, piscinas olímpicas y más. Nos enorgullece ofrecer
          instalaciones accesibles para todos, incluyendo opciones para personas
          con discapacidades.
        </p>
        <h2>Valores del Club</h2>
        <ul>
          <li>Inclusión</li>
          <li>Trabajo en equipo</li>
          <li>Excelencia deportiva</li>
          <li>Salud y bienestar</li>
        </ul>
      </div>

      <div className="club-images">
        <img
          src="https://i.pinimg.com/736x/79/28/9c/79289c2eb48223096147762cfcec0684.jpg"
          alt="Instalaciones del club"
        />
        <img
          src="https://rosariocentral.com/wp-content/uploads/2021/04/570cf284263fa-300x195.jpg"
          alt="Deportistas en acción"
        />
        <img
          src="https://i.pinimg.com/564x/e6/db/e0/e6dbe0e4ea7559de60c89c02e389e98a.jpg"
          alt="Deportistas en acción"
        />
      </div>
    </div>
  );
}

export default ClubInfo;
