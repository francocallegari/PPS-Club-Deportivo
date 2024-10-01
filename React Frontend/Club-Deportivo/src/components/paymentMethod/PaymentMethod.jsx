import { React, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const PaymentMethod = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  initMercadoPago("YOUR_PUBLIC_KEY", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: "Pago membresia",
          quantity: 1,
          price: 100,
        }
      );

      const { id } = response.data;
      setLoading(false);
      return id;
    } catch (error) {
      setLoading(false);
      setError("Error al crear la preferencia");
      console.log(error);
    }
  };

  const handlePay = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
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
