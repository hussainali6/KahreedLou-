import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../src/styles/profile.css';
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (authToken) {
      // Fetch user data using the authToken
      fetch('http://localhost:3017/user-data', {
        method: 'GET',
        headers: {
          'Authorization': authToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setUser(data);

          // Send the user's name to the /api/get-ordersname route
          const userName = data.name;
          fetch('http://localhost:3017/api/get-ordersname', {
            method: 'GET',
            headers: {
              'Authorization': authToken,
              'name': userName, // Use 'name' header
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch order data');
              }
              return response.json();
            })
            .then((orderData) => {
              setOrders(orderData); // Update orders state
            })
            .catch((error) => {
              console.error('Error fetching order data:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [authToken]);

  const handleLogout = async () => {
    try {
      const gettoken = localStorage.getItem('authToken');
      if (gettoken) {
        const response = await axios.get('/logout');
        if (response.status === 200) {
          window.alert('User logged out successfully!');
          localStorage.removeItem('authToken');
          navigate('/login');
          // Clear user-related state
          setUser({});
          setOrders([]);
        }
      } else {
        window.alert('Please log in first');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // You can display an error message to the user here
    }
  }

  return (

    <>
      <div className="user-card text-center mt-5" style={{backgroundColor:'lightgray'}}>
        <div className="user-info">
          <p>

            <span className="info-value" style={{ fontWeight: 'bold', fontSize: '20px' }}>{user.name}</span>
          </p>
          <p>
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </p>
        </div>
        <div className="user-image">

          <img
            src={`http://localhost:3017/images/${user.avatar}`}
            alt="User Image"
            style={{
              width: '150px',     // Adjust the width as needed
              height: '150px',    // Adjust the height as needed
              borderRadius: '50%', // Add border-radius to make it circular
            }}
          />



        </div>
        <div className="user-logout">
          <button className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
<br/>
      <div className="container order-history" style={{backgroundColor:'silver'}}>
        <h3>Order History:</h3>
        <div className="orders-container">
          {orders.map((order, index) => (
            <div className="order" key={index}>
              <p><strong>Order Number:</strong> {index + 1}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>City:</strong> {order.city}</p>
              <p><strong>State:</strong> {order.state}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
              <p><strong>Total Order Amount:</strong> {order.totalOrderAmount}</p>
              <p><strong>Product Details:</strong> {order.productDetails}</p>
              <p><strong>Payment Option:</strong> {order.selectedPaymentOption}</p>
            </div>
          ))}
        </div>
      </div>





    </>

  );
};

export default Profile;
