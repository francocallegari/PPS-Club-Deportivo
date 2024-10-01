import { React, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

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
        "https://localhost:7081/Payment/create-preference", // Cambiar el guion bajo por un guion
        {
          title: "Pago membresía",
          quantity: 1,
          price: 100,
          currencyId: "ARS", // Agregar currencyId si es necesario
          successUrl: "http://google.com/",
          failureUrl: "http://google.com/",
          pendingUrl: "http://google.com/",
        }
      );

      const { id } = response.data; // Obtén el ID de la respuesta
      setPreferenceId(id); // Almacena el ID de la preferencia
    } catch (error) {
      setError("Error al crear la preferencia");
      console.error(error);
    } finally {
      setLoading(false); // Asegúrate de detener el loading en cualquier caso
    }
  };

  const handlePay = async () => {
    await createPreference(); // Llama a la función para crear la preferencia
  };

  return (
    <div className="payment-method">
      <div className="card-product">
        <div className="card">
          <h3>Mercado Pago</h3>
          <p className="price">$$$</p>
          <button onClick={handlePay} disabled={loading}>
            {loading ? "Cargando..." : "Pagar"}
          </button>
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
