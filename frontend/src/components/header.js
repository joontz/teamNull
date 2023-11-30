import React, { useState, useEffect } from "react";
import "../Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState("");
  const [admin, setIsAdmin] = useState("");

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

  function goToHome() {
    navigate("/");
  }

  useEffect(() => {
    const loginCheck = async () => {
      fetch("http://localhost:9000/checktoken", {
        method: "GET",
        credentials: "include",
      }).then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
        } else if (res.status === 401) {
          setLoggedIn(false);
        }
      });
    };

    const adminCheck = async () => {
      fetch("http://localhost:9000/checkadmin", {
        method: "GET",
        credentials: "include",
      }).then((res) => {
        if (res.status === 200) {
          setIsAdmin(true);
        } else if (res.status === 401) {
          setIsAdmin(false);
        }
      });
    };

    const fetchUser = async () => {
      await loginCheck();
      await adminCheck();
    };

    fetchUser();
  }, []);

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
          {!admin ? (
            <button className="link" onClick={goToApply}>
              {" "}
              Apply{" "}
            </button>
          ) : null}
          {admin ? (
            <button className="link" onClick={goToSearch}>
              {" "}
              Search Applications{" "}
            </button>
          ) : null}
          <button className="link" onClick={goToFaq}>
            {" "}
            FAQ{" "}
          </button>
          {!loggedIn ? (
            <button className="link" type="submit" onClick={signInClick}>
              Login
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
