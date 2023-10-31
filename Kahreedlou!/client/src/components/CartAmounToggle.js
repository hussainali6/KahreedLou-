import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CartAmounToggle = ({ amount, setDecrease, setIncrease }) => {
    return (
        <>
            <button onClick={() => { setDecrease() }}>
                <FaMinus />
            </button>
            <button>{amount}</button>
            <button onClick={() => { setIncrease() }}>
                <FaPlus />
            </button>
        </>
    );
};

export default CartAmounToggle;
