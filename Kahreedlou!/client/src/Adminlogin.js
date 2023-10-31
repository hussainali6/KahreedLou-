import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3017/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Admin login successful
        alert('Admin login successful');
        navigate('/admin');
        // You can navigate to the admin dashboard or perform other actions here
      } else {
        // Admin login failed
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h1 style={{color:'gray'}}>Enter The Admin credentials</h1>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
        </div>
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '10px', background: 'gray', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          Login
        </button>
      </div>
    </div>

  );
}

export default AdminLogin;
