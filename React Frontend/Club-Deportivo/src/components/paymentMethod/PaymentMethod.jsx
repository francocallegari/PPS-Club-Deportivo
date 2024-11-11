import { React, useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./PaymentMethod.css";
import axios from "axios";
import { Button } from "react-bootstrap";

const PaymentMethod = ({ monto, redirectionPage }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, {
      locale: "es-AR",
    });
  }, []);

  const createPreference = async () => {
    setLoading(true);
    setError(null);

    if (monto === 0) {
      setError("Error. Monto no válido");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7081/Payment/create-preference",
        {
          title: "Pago membresía Club All Stars",
          quantity: 1,
          price: monto,
          currencyId: "ARS",
          successUrl: `http://localhost:5173/${redirectionPage}`,
          failureUrl: `http://localhost:5173/${redirectionPage}`,
          pendingUrl: `http://localhost:5173/${redirectionPage}`,
        }
      );

      const { id } = response.data;
      setPreferenceId(id);
    } catch (error) {
      setError("Error al inicializar MercadoPago");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    await createPreference();
  };

  return (
    <div className="payment-method">
      <div className="card-product">
        <div className="card">
          <h3>Pagar con Mercado Pago</h3>
          <p>Monto: ${monto}</p> 
          <Button variant="primary" onClick={handlePay} disabled={loading || monto === 0}>
            {loading ? "Cargando..." : "Pagar"}
          </Button>
          {error && <p className="error">{error}</p>}
          {preferenceId && (
            <Wallet
              initialization={{ preferenceId: preferenceId }}
              customization={{ texts: { valueProp: "smart_option" } }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
