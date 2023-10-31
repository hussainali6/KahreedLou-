import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/styles/adminview.css';
import { NavLink } from 'react-router-dom';


const AdminView = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    // Initialize with empty values for each field
    name: '',
    description: '',
    price: 0,
    category: '',
    company: '',
    stockAvailability: 0,
    starRating: 0,
    colors: [],
  });
  

  useEffect(() => {
    // Make a GET request to your backend API to fetch the products
    axios.get('http://localhost:3017/products') // Replace with your actual API endpoint
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = (productId) => {
    // Make a DELETE request to delete the product
    axios.delete(`http://localhost:3017/products/${productId}`) // Replace with your actual API endpoint
      .then(() => {
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  
  

  return (
    <>
    
    <div style={{ textAlign: 'center',marginLeft:'-200px' }}>
      <h2 style={{color:'gray'}}>Available Products</h2>
      <br/>
      <table className="product-table" style={{backgroundColor:'gray',color:'white'}}>
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Category</th>
      <th>Company</th>
      <th>Stock</th>
      <th>Star Rating</th>
      <th>Colors</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </td>
        <td>{product.name}</td>
        <td className="description-cell">{product.description}</td>
        <td>${product.price}</td>
        <td>{product.category}</td>
        <td>{product.company}</td>
        <td>{product.stockAvailability}</td>
        <td>{product.starRating}</td>
        <td>{product.colors.join(', ')}</td>
        <td>
          <NavLink to={`/update/${product.id}`}>
            <button className='btn btn-light'>Update</button>
          </NavLink>
          <br />
          <br />
          <button className='btn btn-light' onClick={() => handleDelete(product.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      
    </div>
</>

  );
};

export default AdminView;
