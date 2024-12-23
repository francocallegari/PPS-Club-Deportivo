import { useState, useEffect, useContext, useCallback } from "react";
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

  const fetchCuotas = useCallback(async () => {
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
  }, [memberId, token]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status === "approved") {
      const feeId = localStorage.getItem("pendingFeeId");
      if (feeId) {
        const confirmPayment = async () => {
          try {
            const response = await fetch(`https://localhost:7081/api/MemberShipFee/${feeId}`, {
              method: "PUT",
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.ok) {
              console.log("Pago confirmado para la cuota:", feeId);
              localStorage.removeItem("pendingFeeId");
              fetchCuotas(); // Actualizar cuotas después de confirmar el pago
            } else {
              throw new Error("Error al confirmar el pago de la cuota");
            }
          } catch (error) {
            console.error("Error al confirmar el pago:", error);
          }
        };

        confirmPayment();
      }
    }

    fetchCuotas();
  }, [memberId, token, fetchCuotas]);

  const formattedFees = (fees, condition) => {
    return fees
      .filter((fee) => fee.status === condition)
      .sort((a, b) => new Date(a.membershipFee.expirationDate) - new Date(b.membershipFee.expirationDate))
      .map((fee) => {
        const cuotaDate = new Date(fee.membershipFee.expirationDate);
        const monthName = cuotaDate.toLocaleString("es-ES", { month: "long" });

        return {
          id: fee.id,
          monthName: monthName,
          memberId: fee.memberId,
          feeId: fee.feeId,
          expirationDate: cuotaDate.toLocaleDateString("es-ES"),
          status: fee.status,
          paymentDate: fee.paymentDate,
          feePrice: fee.feePrice,
        };
      });
  };

  const pagadas = cuotas.length > 0 ? formattedFees(cuotas, 0) : [];
  const pendientes = cuotas.length > 0 ? formattedFees(cuotas, 1) : [];

  const handlePayClick = (cuota) => {
    setSelectedMonto(cuota.feePrice);
    setShowPaymentModal(true);
    localStorage.setItem("pendingFeeId", cuota.id);
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
                    <Card.Title>Cuota de {cuota.monthName}</Card.Title>
                    <Card.Text>Monto: {cuota.feePrice}</Card.Text>
                    <Card.Text>Fecha de Pago: {cuota.paymentDate}</Card.Text>
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

      <div className="column">
        <h4 className="subtitle">Cuotas Pendientes</h4>
        {pendientes.length > 0 ? (
          pendientes.map((cuota) => (
            <Card key={cuota.id} className="mb-3 cuota-card pending">
              <div className="card-content">
                <div className="icon-container">
                  <FaExclamationTriangle className="icono-grande" />
                </div>
                <div className="info-container">
                  <Card.Body>
                    <Card.Title>Cuota de {cuota.monthName}</Card.Title>
                    <Card.Text>Monto: ${cuota.feePrice}</Card.Text>
                    <Card.Text>
                      Fecha de vencimiento {cuota.expirationDate}
                    </Card.Text>
                    <Button
                      className="boton-pagar"
                      variant="primary"
                      onClick={() => handlePayClick(cuota)}
                    >
                      Pagar
                    </Button>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No tiene cuotas pendientes</p>
        )}
      </div>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="modal-content">
            <h2 className="title-modal">Realizar Pago</h2>
            <PaymentMethod monto={selectedMonto} redirectionPage="cuotas" />
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
