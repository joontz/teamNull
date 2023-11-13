import React, { useState, useEffect } from "react";
import "../Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [apiResponse, setApiResponse] = useState("");

  const navigate = useNavigate();

  function signInClick() {
    navigate("/login");
  }

  function goToApply() {
    navigate("/apply");
  }

  function goToFaq() {
    navigate("/faq");
  }

  function goToSearch() {
    navigate("/search");
  }

  function goToContact() {
    navigate("/contact");
  }

  function goToHome() {
    navigate("/");
  }

  // useEffect(() => {
  //   // This is where you can call your API and set the response in state.
  //   // You can use the fetch API or any other method you prefer.
  //   fetch("http://localhost:9000/testAPI")
  //     .then((res) => res.text())
  //     .then((res) => setApiResponse(res))
  //     .catch((error) => console.error(error)) // Handle any fetch errors
  // }, []) // The empty array [] means this effect runs once when the component mounts.

  return (
    <div className="header">
      <div className="strips"></div>
      <h1 className="header-text">UMKC GTA Application Portal</h1>
      <div className="line"></div>
      <div className="link-line">
        <div className="link-container">
          <button className="link" onClick={goToHome}>
            {" "}
            Home{" "}
          </button>
          <button className="link" onClick={goToApply}>
            {" "}
            Apply{" "}
          </button>
          <button className="link" onClick={goToSearch}>
            {" "}
            Search Applications{" "}
          </button>
          <button className="link" onClick={goToFaq}>
            {" "}
            FAQ{" "}
          </button>
          <button className="link" onClick={goToContact}>
            {" "}
            Contact Us{" "}
          </button>
          <button className="link" type="submit" onClick={signInClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
