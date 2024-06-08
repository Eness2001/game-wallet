import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { IoWalletOutline } from "react-icons/io5";

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user]);
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <h2>Game Wallet</h2>
          <IoWalletOutline size={50}/>
        </div>
        <div className="login-bottom">
          <h1>Game Wallet</h1>
          <GoogleButton
            className="custom-google-button"
            onClick={handleGoogleSignIn}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
