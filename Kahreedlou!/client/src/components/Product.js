import React from 'react';
import { Link } from 'react-router-dom';


const Product = ({ id, name, images, price, company }) => {

  const defaultImage = '/default-image.jpg';
  const imageUrl = images.length > 0 ? images[0] : defaultImage;
  const discountPercentage = 10;
  const discountedPrice = (price * (100 - discountPercentage)) / 100;

  const productCardStyle = {
    border: '1px solid white',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    transition: 'transform 0.2s ease-in-out',
    backgroundColor: 'lightgrey',
    width: '300px',
    margin: '20px', 
    height: '100%', 
    position: 'relative',
  };

  const productImageStyle = {
    maxWidth: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
  };

  const productTitleStyle = {
    color: 'black',
    fontSize: '1.2rem',
    margin: '0',
  };

  const productCategoryStyle = {
    fontSize: '0.9rem',
    color: '#555',
  };

  const productPriceStyle = {
    marginTop: '10px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
  };

  const originalPriceStyle = {
    textDecoration: 'line-through',
    marginRight: '10px',
    color: '#999',
  };

  const discountedPriceStyle = {
    color: 'black',
    fontWeight: 'bold',
  };

  const productButtonStyle = {
    backgroundColor: 'black',
    marginTop: '15px',
    color: 'white'
  };

  const discountLabelStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'black',
    color: 'white',
    borderRadius: '50%',
    padding: '5px',
    transition: 'opacity 0.2s ease-in-out',
  };

  return (
    <div style={productCardStyle}>
      <div style={discountLabelStyle}>-10%</div>
      <div>
        <img src={imageUrl} alt={name} style={productImageStyle} />
      </div>
      <div>
        <h5 style={productTitleStyle}>{name}</h5>
        <p style={productCategoryStyle}>Brand: {company}</p>
      </div>
      <div style={productPriceStyle}>
        <span style={originalPriceStyle}>${price}</span>
        <span style={discountedPriceStyle}>${discountedPrice.toFixed(2)}</span>
      </div>
      <Link to={`/singleproduct/${id}`} style={{ textDecoration: 'none' }}>
        <button className="btn btn-primary" style={productButtonStyle}>
          View Details
        </button>
      </Link>

    </div>
  );
};

export default Product;
