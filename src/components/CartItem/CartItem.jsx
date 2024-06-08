import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  padding-top: 20px;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .information {
    margin-bottom: 10px;
  }

  .buttons {
    margin-top: 10px;
  }

  img {
    max-width: 100px;
    height: 100px;
    object-fit: contain;
    margin-left: 20px;
    align-self: center;
  }
`;

const CartItem = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.imageUrl} alt={item.name} />
    </Wrapper>
  );
};

export default CartItem;
