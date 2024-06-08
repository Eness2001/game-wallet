import React from "react";
import "./navbar.css";
import { UserAuth } from "../../context/AuthContext";
import { IoWalletOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { user, logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      {user?.displayName && (
        <>
          <div className="profile-left">
            <div className="app-logo">
              <Link to="/" className="link-style">
                <IoWalletOutline size={50} />
              </Link>
            </div>
          </div>
          <div className="pofile-right">
            <img src={user.photoURL} alt="profile-img" />
            <button onClick={handleSignOut} className="logout-btn">
              <span>Logout</span>
              <IoLogOutOutline size={27} />
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
