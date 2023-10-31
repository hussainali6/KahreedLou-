import React from 'react';
import { useCartContext } from './context/Cartcontext';
import CartItem from './components/CartItem';
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaCreditCard } from 'react-icons/fa';
import Footer from './components/footer';
import '../src/styles/num.css';
const Cart = () => {
  const navigate = useNavigate();

  function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  function handleCheckoutClick() {
    if (isAuthenticated()) {
      navigate('/checkout');
    } else {
      alert('Login is required to proceed to checkout.');
    }
  }

  const { cart, ClearCart, totalPrice, shipping_fee } = useCartContext();
  const discountPercentage = 10;
  const discountedTotalPrice = totalPrice - (totalPrice * discountPercentage) / 100;
  const totalOrderAmount = discountedTotalPrice + shipping_fee;

  return (
    <>
      <br />

      {cart.map((curElem) => (
        <CartItem
          key={curElem.id}
          id={curElem.id}
          name={curElem.name}
          selectedColor={curElem.selectedColor}
          amount={curElem.amount}
          images={curElem.images}
          price={curElem.price}
          discountedPrice={curElem.discountedPrice}
        />
      ))}


      <div className="container cart-summary text-center">
        <h2>Order Summary</h2>
        <p>Total Price: ${totalPrice}</p>
        <p>Discount: ${totalPrice * (discountPercentage / 100)}</p>
        <p>Discounted Price: ${discountedTotalPrice}</p>
        <p>Shipping Fee: ${shipping_fee}</p>
        <p style={{fontWeight:'bold'}}>Total Order Amount: ${totalOrderAmount}</p>
      </div>

      <div className="container center-icons d-flex justify-content-between" >
       <button> <span className="icon" onClick={ClearCart}><FaTrash />Clear cart</span></button>
        <button><NavLink to='/products' style={{textDecoration:'none'}}>  <span className="icon"><FaShoppingCart />Continue Shopping</span></NavLink></button>
        <button><span className="icon" onClick={handleCheckoutClick}><FaCreditCard />Checkout</span></button>
      </div>
      <br />

      <Footer />

    </>
  );
};

export default Cart;
