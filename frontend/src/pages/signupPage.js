import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/header';

function Signup() {
  const navigate = useNavigate();

  const box = {
    'border-radius': '5%',
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #ccc',
    'box-shadow':
      'rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px',
  };

  const input = {
    'text-align': 'left',
    padding: '12px 20px',
    'font-size': '20px',
    border: '2px solid #ccc',
    'border-radius': '10px',
  };

  const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  };

  const loginButton = {
    'background-color': '#0066cc',
    color: 'white',
    padding: '10px 50px',
    'border-radius': '10px',
    'font-size': '20px',
    border: 'none',
  };

  const errorMessage = {
    color: 'red',
    'font-weight': 'bold',
  };

  const adminText = {
    'font-size': '20px',
    justifyContent: 'center',
  };

  const checkBox = {
    width: '18px',
    height: '18px',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);
  const [showPinInput, setShowPinInput] = useState(false);

  const handlePinCheckboxChange = (event) => {
    setShowPinInput(event.target.checked);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
    else if (name === 'pin') setPin(value);
    setError(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    fetch('http://localhost:9000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        pin: pin,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('successfully created user');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('error creating user');
      });

    navigate('/login');
  };

  return (
    <div>
      <Header />
      <div style={container}>
        <div style={box}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                placeholder="Email Address"
                style={input}
              />
            </div>
            <p></p>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
                placeholder="Password"
                style={input}
              />
            </div>
            <p></p>
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm Password"
                style={input}
              />
            </div>
            <p></p>
            <div>
              <label style={adminText}>
                <input
                  type="checkbox"
                  onChange={handlePinCheckboxChange}
                  style={checkBox}
                />
                Admin?
              </label>
              <p></p>
            </div>
            {showPinInput && (
              <div>
                <input
                  type="text"
                  name="pin"
                  value={pin}
                  onChange={handleInputChange}
                  placeholder="Enter Admin PIN"
                  maxLength="4"
                  required
                  style={input}
                />
              </div>
            )}
            <p></p>
            <button type="submit" style={loginButton}>
              Sign Up
            </button>
            <p></p>
            {error && <div style={errorMessage}>{error}</div>}
            <p></p>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>
              Already have an account? Login here
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
