import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import CartAmounToggle from './CartAmounToggle';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../context/Cartcontext';

const AddToCart = ({ product, discountedPrice }) => {
  const { addToCart } = useCartContext();
  const { id, colors, stockAvailability } = product;

  // Initialize selectedColor with a default color if needed
  const [selectedColor, setSelectedColor] = useState(colors[0] || null);

  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    // Log to check if this function is called
    console.log('Decrease button clicked');

    if (amount > 1) {
      setAmount(amount - 1);
    } else {
      setAmount(1);
    }
  }

  const setIncrease = () => {
    // Check if the user is trying to add more products than available in stock
    const maxQuantityToAdd = stockAvailability - amount;

    // Check if the user is trying to add more products than available in stock
    if (maxQuantityToAdd > 0) {
      setAmount(amount + 1);
    }
  }

  return (
    <>
      <p className='text-center' style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        Colors:
        {colors.map((curColor, index) => (
          <button
            key={curColor}
            style={{
              backgroundColor: curColor,
              borderRadius: '50%',
            }}
            className={`btn ${selectedColor === curColor ? 'active' : ''}`}
            onClick={() => setSelectedColor(curColor)}
          >
            {selectedColor === curColor && <FaCheck />}
          </button>
        )
        )}
      </p>


      <CartAmounToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      <br />
      <br />
      <NavLink to='/cart' style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button className='btn btn-dark' onClick={() => addToCart(id, selectedColor, amount, product, discountedPrice)}>
          Add To Cart
        </button>
      </NavLink>

    </>
  );
};

export default AddToCart;
