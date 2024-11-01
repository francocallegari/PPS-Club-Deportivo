import React from 'react';
import "./NewsDetail.css";
import { Modal, Button } from "react-bootstrap";

const NewsDetail = ({ news, onClose }) => {
    // Formatear la fecha en un formato legible si existe una fecha
    const formattedDate = news?.publicationDate 
        ? new Date(news.publicationDate).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          }) 
        : "";

    return (
        <div>
            <Modal
                show={!!news}
                onHide={onClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{news?.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="sport-detail-content">
                        <img src={news?.imageUrl} alt={news?.title} className="img-fluid mb-3" />
                        <span>"{news?.description}"</span>
                        <p><strong>Fecha del evento:</strong> {formattedDate}</p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn-cerrar" onClick={onClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NewsDetail;
