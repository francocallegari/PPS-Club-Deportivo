import { React, useState, useEffect } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./PaymentMethod.css";
import { Button } from "react-bootstrap";

const PaymentMethod = ({monto, redirectionPage}) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, {
      locale: "es-AR",
    });
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get("https://localhost:7081/api/MemberShipFee/CurrentRatePrice");
        setPrice(response.data); // Data retorna unicamente el precio
      } catch (error) {
        console.error("Error fetching price:", error);
        setError("Error fetching the current rate price.");
      }
    };
    fetchPrice();
  }, []);

  const createPreference = async () => {
    setLoading(true);
    setError(null);

    if (price === 0) {
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
          price: price,
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
          <p>Monto: ${price}</p>
          <Button variant="primary" onClick={handlePay} disabled={loading || price === 0}>
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
