import React from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { UserAuth } from "../context/AuthContext";

const ProtectedCheckout = ({ children }) => {
  const { user } = UserAuth();
  const { cartItems } = useCart(); // Sepet bağlamını kullan

  if (!user || cartItems.length === 0) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedCheckout;
