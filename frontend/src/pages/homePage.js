import React, { useState, useEffect } from "react"
import "../App.css"
import Header from "../components/header"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [apiResponse, setApiResponse] = useState("")

  const navigate = useNavigate()

  function signInClick() {
    navigate("/login")
  }

  useEffect(() => {
    // This is where you can call your API and set the response in state.
    // You can use the fetch API or any other method you prefer.
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setApiResponse(res))
      .catch((error) => console.error(error)) // Handle any fetch errors
  }, []) // The empty array [] means this effect runs once when the component mounts.



  return (
    <div>
      <div className="container">
        <Header />
        <button type="submit" onClick={signInClick}>
          Sign in
        </button>
      </div>
    </div>
  )
}
