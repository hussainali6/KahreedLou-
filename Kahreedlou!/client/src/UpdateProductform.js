import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProductForm() {
    const navigate = useNavigate();
    const { productId } = useParams();

    // Initialize the product and updatedProduct states with default values
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        company: '',
        stockAvailability: 0,
        starRating: 0,
        featured: false,
    });

    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    // Fetch the product data by productId and set it in the product state
    useEffect(() => {
        // Make a GET request to fetch the product by productId
        // Replace 'http://localhost:3017' with your actual API endpoint
        axios
            .get(`http://localhost:3017/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
                setUpdatedProduct(response.data); // Set updatedProduct with the fetched data
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [productId]);

    // Function to handle updating the product
    const handleUpdate = () => {
        // Make a PUT request to update the product
        axios
            .put(`http://localhost:3017/products/${productId}`, updatedProduct)
            .then(() => {
                // Handle success or redirection to a different page if needed
                console.log('Product updated successfully');
                alert('Product updated successfully!');
                navigate('/adminview');
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    // Function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        // Update the corresponding field in the updatedProduct state
        setUpdatedProduct({
            ...updatedProduct,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    return (
        <div>
            <h2>Edit Product</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedProduct.name || product.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={updatedProduct.description || product.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={updatedProduct.price || product.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Product Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={updatedProduct.category || product.category}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Product Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={updatedProduct.company || product.company}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="starRating">Product Star Rating</label>
                    <input
                        type="number"
                        id="starRating"
                        name="starRating"
                        value={updatedProduct.starRating || ''}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stockAvailability">Product Stock Availability</label>
                    <input
                        type="number"
                        id="stockAvailability"
                        name="stockAvailability"
                        value={updatedProduct.stockAvailability || ''}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="featured"
                            checked={updatedProduct.featured}
                            onChange={handleInputChange}
                        />
                        Featured
                    </label>
                </div>


                <button type="button" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
}

export default UpdateProductForm;
