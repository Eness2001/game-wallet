// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Home";
import Checkout from "./pages/Checkout/Checkout";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";
import Protected from "./components/Protected";
import ProtectedCheckout from "./components/ProtectedCheckout";

const AppContent = () => {
  const { user } = UserAuth();

  return (
    <>
      {user && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <ProtectedCheckout>
                <Checkout />
              </ProtectedCheckout>
            }
          />
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <AppContent />
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
