import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { gameItemsList } from "../../mocks";
import { FiFilter } from "react-icons/fi";
import { Drawer, LinearProgress, Grid, Badge } from "@mui/material";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import Cart from "../../components/Cart/Cart";
import CartItem from "../../components/CartItem/CartItem";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../context/CartContext";
import "./Home.css";

const Home = () => {
  const { user } = UserAuth();
  const { cartItems, handleAddToCart, handleRemoveFromCart, getTotalItems } =
    useCart();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const [cartOpren, setCartOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 100;
    left: 20px;
    top: 100px;
  `;

  const handleCloseCart = () => setCartOpen(false); // onClose işlevi

  const filterItems = (category) => {
    if (category === "all") {
      setFilteredItems(items);
      setIsAccordionOpen(false);
    } else {
      const filtered = items.filter((item) => item.category === category);
      setFilteredItems(filtered);
      setIsAccordionOpen(false);
    }
  };

  useEffect(() => {
    setItems(gameItemsList);
    setFilteredItems(gameItemsList);
  }, []);

  return (
    <>
      {user ? (
        <div>
          <Drawer
            style={{ marginTop: "50px" }}
            anchor="right"
            open={cartOpren}
            onClose={() => setCartOpen(false)}
          >
            <Cart
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              onClose={handleCloseCart}
            />
          </Drawer>
          <div className="filter-anchor">
            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge badgeContent={getTotalItems(cartItems)} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </StyledButton>
            <div className="accordion-container">
              <button className="toggle-button" onClick={toggleAccordion}>
                <FiFilter />
                <h3>Filtrele</h3>
              </button>
              <div className={`content ${isAccordionOpen ? "active" : ""}`}>
                <button onClick={() => filterItems("all")}>Hepsi</button>
                <button onClick={() => filterItems("Caracters")}>
                  Karakter
                </button>
                <button onClick={() => filterItems("GameMoney")}>
                  Oyun Parası
                </button>
                <button onClick={() => filterItems("GameItem")}>
                  Oyun İtemi
                </button>
              </div>
            </div>
          </div>

          <div className="items-container">
            {filteredItems.map((item) => (
              <div key={item.id} className="item-card">
                <img src={item.imageUrl} alt={item.name} />
                <h2>{item.name}</h2>
                <button onClick={() => handleAddToCart(item)}>
                  <h3>{item.price} $</h3>
                  <h3>Sepete Ekle</h3>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading ..</div>
      )}
    </>
  );
};

export default Home;
