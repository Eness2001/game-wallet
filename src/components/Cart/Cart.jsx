import React from "react";
import CartItem from "../CartItem/CartItem";
import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";
const CompleteButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  margin: 0;
  &:hover {
    background-color: #d32f2f;
  }

  &:active {
    background-color: #b71c1c;
  }
`;

const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 320px;
  padding: 20px;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Cart = ({ cartItems, addToCart, removeFromCart, onClose }) => {
  const navigate = useNavigate();
  const calculateTotal = (items) => {
    return items.reduce((ack, item) => ack + item.amount * item.price, 0);
  };

  const handleCompleteCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };
  return (
    <Wrapper>
      <CloseButton onClick={() => onClose()}>Close Cart</CloseButton>{" "}
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in The Cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total : ${calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length > 0 && (
        <CompleteButton onClick={handleCompleteCheckout}>
          Sepeti Onayla
        </CompleteButton>
      )}
    </Wrapper>
  );
};

export default Cart;
