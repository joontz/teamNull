import React, { useState, useEffect } from "react"
import "../App.css"
import Header from "../components/header"

function Login() {
  const box = {
    "border-radius": "5%",
    textAlign: "center", 
    padding: "20px", 
    border: "1px solid #ccc",

  }
  
  const input = {
    "text-align": "center",
  }

  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "75vh", 
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Email:", email)
    console.log("Password:", password)

  }

  return (
    <div>
      <Header />
      <div style={container}>
        <div style={box}>
          <h2>Admin Login</h2>
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
