import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
function UserDataFetcher() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3017/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data'); // Set the error state
            }
        }

        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            // Make a DELETE request to delete the user
            await axios.delete(`http://localhost:3017/users/${userId}`);

            // Remove the deleted user from the state
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user'); // Set the error state
        }
    };

    return (
        <>
              <h3 style={{color:'gray',}}>Registered Customers</h3>                  
            <div className="container text-center" style={{marginLeft:'-50px'}}>
                <table className="table table-bordered user-table" style={{ backgroundColor: 'gray', color: 'white', border: '10px solid white' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button className='btn btn-light' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                    <br />
                                    <br />
                                    <NavLink to={`/users/${user._id}`}>
                                        <button className='btn btn-light'>Update</button>
                                    </NavLink> {/* Add a key */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            </div>
        </>
    );
}

export default UserDataFetcher;
