import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";
import './Navbar.css'


function Navbar() {
  const user = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout")
      .then((res) => {
        if (res.data === "success") navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="navbar-header">
        <div>
          <h3>Blog App</h3>
        </div>
        <div>
          <Link to="/" className="link">
            Home
          </Link>
          {user.email ? (
            <Link to="/create" className="link">
              Create
            </Link>
          ) : (
            <></>
          )}
        </div>
        {user.email ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h5>
              <Link to="/register" className="link">
                Register/Login
              </Link>
            </h5>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
