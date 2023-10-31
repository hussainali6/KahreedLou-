import React, { useState } from 'react';
import './App.css';
import '../src/styles/AddProduct.css';
import { useNavigate } from 'react-router-dom';
const AddProducts = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        image: '',
        company: '',
        starRating: '',
        stockAvailability: '',
        colors: [],
        featured: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setProduct({ ...product, [name]: newValue });
    };

    const handleColorChange = (e) => {
        const { name, checked } = e.target;
        const updatedColors = [...product.colors];

        if (checked) {
            updatedColors.push(name); 
        } else {
            const index = updatedColors.indexOf(name);
            if (index !== -1) {
                updatedColors.splice(index, 1);
            }
        }
        setProduct({ ...product, colors: updatedColors });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3017/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.status === 201) {
                alert('Product added successfully!');
                navigate('/admin');
                setProduct({
                    name: '',
                    description: '',
                    category: '',
                    price: '',
                    image: '',
                    company: '',
                    starRating: '',
                    stockAvailability: '',
                    colors: [],
                    featured: false,
                });
            } else {
                alert('Failed to add the product.');
            }
        } catch (error) {
            console.error('Error while adding the product:', error);
            alert('An error occurred while adding the product.');
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="description">Product Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="category">Product Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="price">Product Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={product.company}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="starRating">Product Star Rating</label>
                        <input
                            type="number"
                            id="starRating"
                            name="starRating"
                            value={product.starRating}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="stockAvailability">Stock Availability</label>
                        <input
                            type="number"
                            id="stockAvailability"
                            name="stockAvailability"
                            value={product.stockAvailability}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Colors</label>
                        <div className="color-checkboxes">
                            <label>
                                <input
                                    type="checkbox"
                                    name="Red"
                                    checked={product.colors.includes('Red')}
                                    onChange={handleColorChange}
                                />
                                Red
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Blue"
                                    checked={product.colors.includes('Blue')}
                                    onChange={handleColorChange}
                                />
                                Blue
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="White"
                                    checked={product.colors.includes('White')}
                                    onChange={handleColorChange}
                                />
                                White
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="featured"
                            checked={product.featured}
                            onChange={handleInputChange}
                        />
                        Featured
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product Image URLs (comma-separated)</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={product.image}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
                <br />
                <button type="submit" className='btn btn-dark'>Add Product</button>
            </form>
        </div>
    );
};

export default AddProducts;
