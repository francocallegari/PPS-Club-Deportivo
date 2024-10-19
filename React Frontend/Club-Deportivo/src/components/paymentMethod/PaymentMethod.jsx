import { React, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./PaymentMethod.css";
import { Button } from "react-bootstrap";

const PaymentMethod = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, { 
    locale: "es-AR",
  });

  const createPreference = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://localhost:7081/Payment/create-preference",
        {
          title: "Pago membresía",
          quantity: 1,
          price: 100,
          currencyId: "ARS",
          successUrl: "http://google.com/",
          failureUrl: "http://google.com/",
          pendingUrl: "http://google.com/",
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
          <Button variant="primary" onClick={handlePay} disabled={loading}>
            {loading ? "Cargando..." : "Pagar"}
          </Button>
          {error && <p className="error">{error}</p>}
          {preferenceId && (
            <Wallet
              initialization={{ preferenceId: preferenceId }} // Inicializa el Wallet con el ID de la preferencia
              customization={{ texts: { valueProp: "smart_option" } }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
