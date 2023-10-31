import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/styles/signup.css';
import Footer from './components/footer';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
    avatar: null, // Store the selected file
  });
  const [emailError, setEmailError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    if (name === 'email') {
      setEmailError(validateEmail(value) ? '' : 'Please enter a valid email address.');
    }
  };

  const handleImageUpload = (e) => {
    const avatar = e.target.files[0];
    setUser({ ...user, avatar });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword, avatar } = user;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('cpassword', cpassword);
    formData.append('avatar', avatar);

    try {
      const response = await axios.post('http://localhost:3017/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify form data
        },
      });

      if (response.status === 200) {
        window.alert('Registration Successful!!');
        navigate('/login');
      } else {
        setRegistrationError('Registration unsuccessful. Email might already be registered.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationError('Registration failed. Please try again later.');
    }
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <div className="row">
          <div className="col-md-6">
            <h2 style={{ color: 'white' }}>Signup</h2>
            <form onSubmit={postData}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" name="name" required value={user.name} onChange={handleInputs} />
              </div>
              <br />
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" name="email" required value={user.email} onChange={handleInputs} />
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>
              <br />
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Phone" name="phone" required value={user.phone} onChange={handleInputs} />
              </div>
              <br />
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" name="password" required value={user.password} onChange={handleInputs} />
              </div>
              <br />
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Confirm Password" name="cpassword" required value={user.cpassword} onChange={handleInputs} />
              </div>
              <br />
              <div className="form-group">
                <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
              </div>
              <br />
              <button type="submit" className="btn btn-dark">Sign Up</button>
              {registrationError && <p className="text-danger">{registrationError}</p>}
            </form>
          </div>
          <div className="col-md-6">
            <img src="https://cancer50challenge.co.uk/wp-content/uploads/2021/07/signupnow.png" alt="Registration Image" className="img-fluid" />
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Signup;
