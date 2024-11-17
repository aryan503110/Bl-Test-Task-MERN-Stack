import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Login.css'


function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate=useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const Res = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
        console.log(Res)
         if(Res.data.success){
            navigate('/')
         }
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-link">
          Not registered? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
