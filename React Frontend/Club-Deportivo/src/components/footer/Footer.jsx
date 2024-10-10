import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-section left">
          <div className="contact-info">
            <h5>CONTACTANOS</h5>
            <div>
              <i className="bi bi-telephone-fill"></i> +54 26741812342
            </div>
            <div>
              <i className="bi bi-envelope-fill"></i> SportClub@gmail.com
            </div>
            <div>
              <i className="bi bi-geo-alt-fill"></i> Corrientes 3467, Rosario
            </div>
          </div>
        </div>

        <div className="socios center">
          <div className="footer-socios">
            <h5>SOCIOS</h5>
            <ul>
              <li>
                <i className="bi bi-person"></i> Atención al socio
              </li>
              <li>
                <i className="bi bi-x"></i> Solicitud de baja
              </li>
              <li>
                <i className="bi bi-gift"></i> Beneficios del club
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-section">
          <h5>REDES SOCIALES</h5>
          <div>
            <i className="bi bi-instagram"></i> INSTAGRAM
          </div>
          <div>
            <i className="bi bi-facebook"></i> FACEBOOK
          </div>
          <div>
            <i className="bi bi-twitter"></i> TWITTER
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
