// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    // This is where you can call your API and set the response in state.
    // You can use the fetch API or any other method you prefer.
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(error => console.error(error)); // Handle any fetch errors
  }, []); // The empty array [] means this effect runs once when the component mounts.


  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <div className="line"></div>
          <h1 className='header-text'>UMKC GTA Application Portal</h1>
      </div>
      <div>{apiResponse}</div>
    </div>
  );
}

export default App;
