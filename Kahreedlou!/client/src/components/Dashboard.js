import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/WelcomeAdmin.css';

function WelcomeAdmin() {
  return (
    <div className="welcome-admin-container">
      <div className="admin-icon">
        <FaUserCircle size={64} />
      </div>
      <div className="welcome-text">
        Welcome to KahreedLou! Dashboard
      </div>
    </div>
  );
}

export default WelcomeAdmin;
