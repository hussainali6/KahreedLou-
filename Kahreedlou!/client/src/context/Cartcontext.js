import React, { createContext, useContext, useReducer, useEffect } from "react";
import CartReducer from "../reducer/CartReducer";

const getLocalCartItems = () => {
    const cartStorage = localStorage.getItem("Ostore");
    try {
        return cartStorage ? JSON.parse(cartStorage) : [];
    } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
        return [];
    }
};

const initialState = {
    cart: getLocalCartItems(),
    total_item: 0,
    total_amount: 0,
    shipping_fee: 500,
    totalPrice: 0, // Initial value for total price
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);

    const addToCart = (id, selectedColor, amount, product,images) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, selectedColor, amount, product,images } });
    };

    const RemoveItem = (id) => {
        dispatch({ type: "REMOVE_CART", payload: id });
    };

    const ClearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    }

    useEffect(() => {
        localStorage.setItem("Ostore", JSON.stringify(state.cart));

        // Calculate total price including shipping fee
        const totalPrice = state.cart.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);

        dispatch({ type: "SET_TOTAL_PRICE", payload: totalPrice });
    }, [state.cart, state.shipping_fee]);

    return (
        <CartContext.Provider value={{ ...state, addToCart, RemoveItem, ClearCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };
