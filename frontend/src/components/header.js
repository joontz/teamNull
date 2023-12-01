import React, { useState, useEffect } from 'react';
import '../Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState('');
  const [admin, setIsAdmin] = useState('');

  const navigate = useNavigate();

  function signInClick() {
    navigate('/login');
  }

  function goToApply() {
    navigate('/apply');
  }

  function goToFaq() {
    navigate('/faq');
  }

  function goToSearch() {
    navigate('/search');
  }

  function goToDashboard() {
    navigate('/dashboard');
  }
  function goToHome() {
    navigate('/');
  }

  function logOut() {
    fetch('http://localhost:9000/logout', {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      if (res.status === 200) {
        setLoggedIn(false);
        navigate('/');
        alert('successfully logged out');
      } else {
        setLoggedIn(true);
      }
    });
  }

  useEffect(() => {
    const loginCheck = async () => {
      fetch('http://localhost:9000/checktoken', {
        method: 'GET',
        credentials: 'include',
      }).then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
        } else if (res.status === 401) {
          setLoggedIn(false);
        }
      });
    };

    const adminCheck = async () => {
      fetch('http://localhost:9000/checkadmin', {
        method: 'GET',
        credentials: 'include',
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
  }, [loggedIn]);

  return (
    <div className="header">
      <div className="strips"></div>
      <h1 className="header-text">UMKC GTA Application Portal</h1>
      <div className="line"></div>
      <div className="link-line">
        <div className="link-container">
          <button className="link" onClick={goToHome}>
            {' '}
            <text className="text">Home</text>{' '}
          </button>
          {!admin ? (
            <button className="link" onClick={goToApply}>
              {' '}
              <text className="text">Apply</text>{' '}
            </button>
          ) : null}
          {admin ? (
            <button className="link" onClick={goToSearch}>
              <text className="text">Search Applications</text>{' '}
            </button>
          ) : null}
          {admin ? (
            <button className="link" onClick={goToDashboard}>
              {' '}
              <text className="text">Dashboard</text>{' '}
            </button>
          ) : null}
          {!admin ? (
            <button className="link" onClick={goToFaq}>
              {' '}
              <text className="text">FAQ</text>{' '}
            </button>
          ) : null}
          {!loggedIn ? (
            <button className="link" type="submit" onClick={signInClick}>
              <text className="text">Login</text>{' '}
            </button>
          ) : (
            <button className="link" onClick={logOut}>
              {' '}
              <text className="text">Log Out</text>{' '}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
