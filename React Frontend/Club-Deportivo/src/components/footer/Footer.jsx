import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

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
              <li onClick={() => navigate("/register")}>
                <i className="bi bi-person-plus-fill"></i> Asociarte
              </li>
              <li onClick={() => navigate("/club")}>
                <i className="bi bi-building"></i> El club
              </li>
              <li onClick={() => navigate("/sports")}>
                <i className="bi bi-trophy"></i> Nuestros deportes
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
