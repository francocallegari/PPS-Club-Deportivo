import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "./Cuotas.css";
import PaymentMethod from "../paymentMethod/PaymentMethod";

const Cuotas = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMonto, setSelectedMonto] = useState(null);

  const cuotas = [
    {
      id: 1,
      estado: "Pagada",
      fecha: "2024-09-10",
      monto: "$1000",
      metodoPago: "Tarjeta de Crédito",
    },
    {
      id: 2,
      estado: "Pendiente",
      fecha: "2024-10-10",
      monto: "$1000",
      vencimiento: "2024-10-30",
    },
    {
      id: 3,
      estado: "Pendiente",
      fecha: "2024-11-10",
      monto: "$1000",
      vencimiento: "2024-11-30",
    },
    {
      id: 4,
      estado: "Pendiente",
      fecha: "2024-12-10",
      monto: "$1000",
      vencimiento: "2024-12-30",
    },
    {
      id: 5,
      estado: "Pagada",
      fecha: "2024-08-10",
      monto: "$1000",
      metodoPago: "Transferencia bancaria",
    },
    {
      id: 6,
      estado: "Pagada",
      fecha: "2024-07-10",
      monto: "$1000",
      metodoPago: "Tarjeta de Crédito",
    },
  ];

  const pagadas = cuotas.filter((cuota) => cuota.estado === "Pagada");
  const pendientes = cuotas.filter((cuota) => cuota.estado === "Pendiente");

  const handlePayClick = (monto) => {
    setSelectedMonto(monto);
    setShowPaymentModal(true);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setSelectedMonto(null);
  };

  return (
    <div className="cuotas-container">
      <div className="column">
        <h4 className="subtitle">Cuotas Pagadas</h4>
        {pagadas.length > 0 ? (
          pagadas.map((cuota) => (
            <Card key={cuota.id} className="mb-3 cuota-card paid">
              <div className="card-content">
                <div className="icon-container">
                  <FaCheckCircle className="icono-grande" />
                </div>
                <div className="info-container">
                  <Card.Body>
                    <Card.Title>Cuota del {cuota.fecha}</Card.Title>
                    <Card.Text>Monto: {cuota.monto}</Card.Text>
                    <Card.Text>Metodo Pago: {cuota.metodoPago}</Card.Text>
                    <Button className="boton-pagar" variant="success" disabled>
                      Pagada
                    </Button>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No tienes cuotas pagadas.</p>
        )}
      </div>

      {/* Cuotas Pendientes */}
      <div className="column">
        <h4 className="subtitle">Cuotas Pendientes</h4>
        {pendientes.map((cuota) => (
          <Card key={cuota.id} className="mb-3 cuota-card pending">
            <div className="card-content">
              <div className="icon-container">
                <FaExclamationTriangle className="icono-grande" />
              </div>
              <div className="info-container">
                <Card.Body>
                  <Card.Title>Cuota del {cuota.fecha}</Card.Title>
                  <Card.Text>Monto: {cuota.monto}</Card.Text>
                  <Card.Text>
                    Fecha de vencimiento {cuota.vencimiento}
                  </Card.Text>
                  <Button
                    className="boton-pagar"
                    variant="primary"
                    onClick={() => handlePayClick(cuota.monto)}
                  >
                    Pagar
                  </Button>
                </Card.Body>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="modal-content">
            <h2 className="title-modal">Realizar Pago</h2>
            <PaymentMethod monto={selectedMonto} />
            <div className="modal-footer">
              <Button
                className="boton-modal"
                variant="secondary"
                onClick={closeModal}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cuotas;
