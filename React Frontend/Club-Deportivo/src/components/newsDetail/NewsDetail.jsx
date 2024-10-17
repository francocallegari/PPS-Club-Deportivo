import React from 'react';
import "./NewsDetail.css";
import { Modal, Button } from "react-bootstrap";

const NewsDetail = ({ news, onClose }) => {
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
                        <img src={news?.image} alt={news?.title} className="img-fluid mb-3" />
                        <span>"{news?.description}"</span>
                        <p>{news?.detailedDescription}</p>
                        <p><strong>Fecha del evento:</strong> {news?.eventDate}</p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn-cerrar" onClick={onClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NewsDetail
