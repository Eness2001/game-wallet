import React, { useEffect, useState } from "react";
import axios from "axios";
import braintree from "braintree-web";
import "./Checkout.css";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // useCart import edilmesi

const Checkout = () => {
  const [clientToken, setClientToken] = useState(null);
  const [btInstance, setBtInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cartItems, getTotalPrice, setCartItems } = useCart(); // useCart'tan gerekli verilerin alınması
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:5002/game-wallet-fd4b9/us-central1/generateClientToken"
      )
      .then((response) => {
        setClientToken(response.data);
        return braintree.client.create({
          authorization: response.data,
        });
      })
      .then((clientInstance) => {
        return braintree.hostedFields.create({
          client: clientInstance,
          styles: {
            input: {
              "font-size": "14px",
              border: "none",
              width: "100%",
            },
            "input.invalid": {
              color: "red",
            },
            "input.valid": {
              color: "green",
            },
          },
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "4111 1111 1111 1111",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "123",
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: "10/2024",
            },
          },
        });
      })
      .then((hostedFieldsInstance) => {
        setBtInstance(hostedFieldsInstance);
      })
      .catch((error) => {
        console.error("Braintree yükleme hatası:", error);
      });
  }, []);

  const handlePurchase = () => {
    setLoading(true);
    btInstance.tokenize((err, payload) => {
      if (err) {
        console.error("Kart bilgileri doğrulama hatası:", err);
        setLoading(false);
        return;
      }

      const amount = getTotalPrice(cartItems).toFixed(2);

      axios
        .post(
          "http://127.0.0.1:5002/game-wallet-fd4b9/us-central1/createTransaction",
          {
            paymentMethodNonce: payload.nonce,
            amount: amount,
          }
        )
        .then((response) => {
          console.log("Ödeme başarılı:", response.data);
          setCartItems([]);
          navigate("/account");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ödeme hatası:", error);
          setLoading(false);
        });
    });
  };

  return (
    <div className="checkout-container">
      <div className="demo-container">
        <div className="cart-summary">
          <h2>Sepetiniz</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="cart-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Adet: {item.amount}</p>
                    <p>Fiyat: ${item.amount * item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3>Toplam Tutar: ${getTotalPrice(cartItems).toFixed(2)}</h3>
        </div>
      </div>
      <div className="form-container">
        {clientToken ? (
          <div>
            <h1>KART BİLGİLERİ</h1>
            <div className="input-container">
              <label>Kart Numarası</label>
              <div id="card-number" className="hosted-field"></div>
            </div>
            <div className="input-container">
              <label>CVV</label>
              <div id="cvv" className="hosted-field"></div>
            </div>
            <div className="input-container">
              <label>Expiration Date</label>
              <div id="expiration-date" className="hosted-field"></div>
            </div>
            <button onClick={handlePurchase} disabled={loading}>
              {loading ? "İşlem yapılıyor..." : "Onayla"}
            </button>
          </div>
        ) : (
          <div className="loading">
            <ReactLoading
              type="balls"
              color="grey"
              height={"20%"}
              width={"20%"}
              delay={8}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
