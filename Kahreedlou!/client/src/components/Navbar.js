import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaComment, FaUser, FaSignInAlt } from 'react-icons/fa';
import '../styles/Nav.css';

const NavBar = () => {
  const history = useNavigate();

  const handleLoginButtonClick = () => {
    // Check if the user is already logged in (has a JWT token in local storage)
    const isUserLoggedIn = !!localStorage.getItem('authToken');

    if (isUserLoggedIn) {
      // Check if the user is online
      if (navigator.onLine) {
        alert("Please log out first.");
      }
    } else {
      // If the user is not logged in, navigate to the login page
      history('/login');
    }
  };
  const handleUserIconClick = () => {
    // Check if the user is already logged in
    const isUserLoggedIn = !!localStorage.getItem('authToken');

    if (!isUserLoggedIn) {
      alert("Please login first.");
    }
  };


  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <a className="navbar-brand" href="#">
            KahreedLou!
          </a>
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <a className="nav-link" href="#">Home</a>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/products' style={{ textDecoration: 'none' }}>
              <a className="nav-link" href="#">Products</a>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/contact' style={{ textDecoration: 'none' }}>
              <a className="nav-link" href="#">Contact-Us</a>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/about' style={{ textDecoration: 'none' }}>
              <a className="nav-link" href="#">About-Us</a>
            </NavLink>
          </li>
        </ul>
        <div className="navbar-icons">
          <NavLink to='/chat' style={{ color: 'black' }}>
            <i><FaComment /></i>
          </NavLink>
          <span className="icon-space"></span>
          <NavLink to='/profile' style={{ color: 'black' }}>
            <i><FaUser onClick={handleUserIconClick} /></i>
          </NavLink>
          <span className="icon-space"></span>
          <NavLink to='/cart' style={{ color: 'black' }}>
            <i><FaShoppingCart /></i>
          </NavLink>
          <span className="icon-space"></span>
          <button onClick={handleLoginButtonClick} className='btn btn-dark'>
            login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
