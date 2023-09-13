// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  // Create a state variable to track the sidebar's visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Function to toggle the sidebar's visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <div className="line"></div>
          <h1 className='header-text'>UMKC GTA Application Portal</h1>
      </div>
    </div>
  );
}

export default App;
