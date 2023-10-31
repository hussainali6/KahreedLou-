import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Thanks = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Add a delay before showing the message (e.g., 1.5 seconds)
    const messageTimeout = setTimeout(() => {
      setShowMessage(true);
    }, 1500);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(messageTimeout);
  }, []);

  return (
    <div className="container text-center mt-5">
      <div className="balloon-container">
        <div className={`balloon ${showMessage ? 'move-up' : ''}`} />
        {showMessage && (
          <div className="thanks-message">
            <h2>Thanks For Shopping!</h2>
            <p>Your product will be delivered soon.</p>
            <NavLink to="/products">
              <button className="btn btn-light">Explore More</button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline CSS styles using a template literal
const styles = `
  .balloon-container {
    position: relative;
    display: inline-block;
  }

  .balloon {
    width: 20px;
    height: 30px;
    background-color: blue;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: transform 0.5s ease-in-out;
  }

  .move-up {
    transform: translateX(-50%) translateY(-100%);
  }

  .thanks-message {
    background-color: lightgray;
    color: white;
    padding: 20px;
  }
`;

// Create a style element and append the CSS to the document's head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default Thanks;
