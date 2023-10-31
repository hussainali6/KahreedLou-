

const CartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, selectedColor, amount, product,images} = action.payload;
        let existingProduct = state.cart.find((curElement) => curElement.id === id + selectedColor);

        if (existingProduct) {
            let updatedCart = state.cart.map((curElement) => {
                if (curElement.id === id + selectedColor) {
                    let newAmount = curElement.amount + amount;
                    if (newAmount >= curElement.max) {
                        newAmount = curElement.max;
                    }
                    return {
                        ...curElement,
                        amount: newAmount,
                    };
                } else {
                    return curElement; // Return the unmodified element
                }
            });

            return {
                ...state,
                cart: updatedCart,
            };
        } else {
            const cartProduct = {
                id: id + selectedColor,
                name: product.name,
                selectedColor,
                amount,
                images:product.images[0],
                price: product.price,
                max: product.stock,
            };

            return {
                ...state,
                cart: [...state.cart, cartProduct]
            };
        }
    }

    if (action.type === "REMOVE_CART") {
        const updatecart = state.cart.filter((curElement) => curElement.id !== action.payload);
        return {
            ...state,
            cart: updatecart
        };
    }

    if (action.type === "CLEAR_CART") {

        return {
            ...state,
            cart: [],
        }

    }
    if (action.type === "SET_TOTAL_PRICE") {
        return {
            ...state,
            totalPrice: action.payload,
        };
    }


    return state;
};

export default CartReducer;
