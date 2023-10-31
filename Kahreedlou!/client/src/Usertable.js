import React from 'react';
import '../src/styles/usertable.css';
import axios from 'axios'; // Import Axios
import { useState } from 'react';

function UserTable({ users }) { // Receive 'users' and 'setUsers' as props


  const [user, setUser] = useState('');

  const handleDeleteUser = async (userId) => {
    
      // Make a DELETE request to delete the user
      axios.delete(`http://localhost:3017/users/${userId}`)
        .then(() => {
        // Remove the deleted product from the state
        setUser(users.filter((user) => user._id !== userId));
      })  .catch((error) => {
        console.error('Error deleting product:', error);
      });

  };

  return (
    <>
      <br />
      <div className="container text-center">
        <table className="table table-bordered user-table" style={{ backgroundColor: 'red', color: 'white', border: '10px solid white' }}>
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
                  <button className='btn btn-light'>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
