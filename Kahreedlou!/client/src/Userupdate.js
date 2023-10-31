import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UserUpdate() {
    const navigate=useNavigate();
    const { userId } = useParams();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the user's data when the component mounts
        axios.get(`http://localhost:3017/users/${userId}`)
          .then((response) => {
            const { name, email, phone } = response.data;
            setUserData({ name, email, phone });
            setError(''); // Clear any previous errors
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            setError('Error fetching user data');
          });
      }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleUpdateUser = async () => {
        try {
            // Make a PUT request to update the user
            await axios.put(`http://localhost:3017/users/${userId}`, userData);

            setMessage('User updated successfully');
            navigate('/fetchusers');
            setError('');
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Error updating user');
            setMessage('');
        }
    };

    return (
        <div className="user-update-form container text-center">
    <h2 style={{color:'red'}}>Edit User</h2>
    <form>
        <div className="form-group">
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Phone:</label>
            <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="form-control"
            />
        </div>
        <br/>
        <button type="button" onClick={handleUpdateUser} className="btn btn-danger">
            Update User
        </button>
    </form>
    {message && <div className="alert alert-success">{message}</div>}
    {error && <div className="alert alert-danger">{error}</div>}
</div>

    );
}

export default UserUpdate;
