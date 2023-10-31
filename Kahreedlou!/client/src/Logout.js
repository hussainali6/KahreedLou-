import React, { useState } from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const [message, setMessage] = useState('');

  const handleLogout = async () => {

    try {
      let settoken;
      let gettoken;

      const response = await fetch('http://localhost:3017/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
      });
      const data = await response.json();

      if (response.ok) {
          const { token } = data;
           settoken = localStorage.getItem('authToken',token);
           gettoken = localStorage.getItem('authToken'); 
          
      } else {
          console.log('Token not found');
      }

      // Check if the user is authenticated (e.g., by checking the presence of a JWT token)
       // Adjust this based on your authentication mechanism

      if (gettoken) {
        // User is authenticated, perform logout logic
        // Send a request to the server-side logout route
        const response = await axios.get('/logout');

        if (response.status === 200) {
          // Successfully logged out
          setMessage('User logged out successfully');
          window.alert('user logged out successfully!');
          // Implement further logout-related actions here
        }
      } else {
        // User is not authenticated
        setMessage('Please log in first');
        window.alert('please login first');
      }
    } catch (error) {
      // Handle errors
      console.error('Logout error:', error);
      setMessage('An error occurred during logout');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>{message}</p>
    </div>
  );
  };

export default LogoutButton;
