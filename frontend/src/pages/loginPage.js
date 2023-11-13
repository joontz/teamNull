import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../components/header";
import Signup from "./signupPage";

function Login() {
  const box = {
    "border-radius": "5%",
    textAlign: "center",
    padding: "20px",
    border: "2px solid #ccc",
  };

  const title = {
    textAlign: "center",
    "font-size": "40px",
    "padding-top": "50px",
    "padding-bottom": "50px",
  };

  const input = {
    "text-align": "left",
    padding: "12px 20px",
    "font-size": "20px",
    border: "2px solid #ccc",
    "border-radius": "10px",
  };

  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "75vh",
  };

  const loginButton = {
    "background-color": "#0066cc",
    color: "white",
    padding: "10px 50px",
    "border-radius": "10px",
    "font-size": "20px",
  };

  const errorMessage = {
    color: "red",
    "font-weight": "bold",
  };

  const signupMessage = {
    "font-weight": "bold",
    "font-size": "20px",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("successfully logged in");
          navigate("/dashboard");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Incorrect email or password");
      });
  };
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div style={container}>
        <div style={box}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
                required
                style={input}
              />
            </div>
            <p></p>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                style={input}
              />
            </div>
            <p></p>
            <button type="submit" style={loginButton}>
              Login
            </button>
            <p></p>
            {error && <div style={errorMessage}>{error}</div>}
            <p></p>
          </form>
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
            style={signupMessage}>
            No account? Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
