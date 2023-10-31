import axios from "axios";
import { useEffect } from "react";
import React, { createContext, useContext, useReducer } from "react";
import Reducer from "../reducer/Reducer"; // Check if this path is correct

const AppContext = createContext();
const API = "http://localhost:3017/products";

const initialState = {
    isLoading: false,
    isError: false, // Corrected typo
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState); // Check the Reducer import

    const getProducts = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const res = await axios.get(url);
            const products = res.data;
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) {
            dispatch({ type: "API_ERROR" });
        }
    };

    const getSingleProducts = async (url) => {
        dispatch({ type: "SET_SINGLE_LOADING" });
        try {
            const res = await axios.get(url);
            const singleProduct = res.data;
            console.log(singleProduct);
            dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
        } catch (error) {
            dispatch({ type: "SET_SINGLE_ERROR" }); // Corrected action type
        }
    };

    useEffect(() => {
        getProducts(API);
    }, []);

    return (
        <AppContext.Provider value={{ ...state, getSingleProducts }}>
            {children}
        </AppContext.Provider>
    );
};

const useProductContext = () => {
    return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
