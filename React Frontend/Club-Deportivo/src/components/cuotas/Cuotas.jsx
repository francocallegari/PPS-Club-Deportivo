import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "./Cuotas.css";
import PaymentMethod from "../paymentMethod/PaymentMethod";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";

const Cuotas = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMonto, setSelectedMonto] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const { user, token } = useContext(AuthenticationContext);

  const memberId = user?.id;

  useEffect(() => {
    const fetchCuotas = async () => {
      if (!memberId || !token) {
        console.error("Falta el ID de miembro o el token");
        return;
      }

      try {
        const response = await fetch(
          `https://localhost:7081/api/MemberShipFee/MemberFees/${memberId}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCuotas(data);
        } else {
          throw new Error("Error al obtener las cuotas");
        }
      } catch (error) {
        console.error("Error al obtener las cuotas:", error);
      }
    };

    fetchCuotas();
  }, [memberId, token]);

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

  useEffect(() => {
    // Captura los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const paymentId = params.get('payment_id');
    const collectionId = params.get('collection_id');
    const externalReference = params.get('external_reference');

    // Verifica si el estado es aprobado
    if (status === 'approved') {
      console.log("aprobado")

    } else if (status == "null"){
      console.log("no se pudo completar el pago")
    }
  }, [])

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
            <PaymentMethod monto={selectedMonto} redirectionPage="cuotas"/>
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
