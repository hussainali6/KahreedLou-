import React from 'react';

const FilterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":

            return {
                ...state,
                Filter_Products: [...action.payload],
                All_Products: [...action.payload],
            };
        case "SET_GRID_VIEW":
            return {
                ...state,
                Grid_View: true,
            };
        case "SET_LIST_VIEW":
            return {
                ...state,
                Grid_View: false,
            };
        case "GET_SORT_VALUE":
            return {
                ...state,
                Sorting_Value: action.payload
            };
        case "SORTING_PRODUCTS":
            let NewSortedProducts;
            const { Filter_Products, Sorting_Value } = state;
            let TempSortProducts = [...Filter_Products];
            const ProductsSorting = (a, b) => {
                if (Sorting_Value === "lowest") {
                    return a.price - b.price;
                }
                if (Sorting_Value === "highest") {
                    return b.price - a.price;
                }
                if (Sorting_Value === "az") {
                    return a.name.localeCompare(b.name);
                }
                if (Sorting_Value === "za") {
                    return b.name.localeCompare(a.name);
                }
            };
            NewSortedProducts = TempSortProducts.sort(ProductsSorting);
            return {
                ...state,
                Filter_Products: NewSortedProducts,
            };
        case "UPDATE_FILTER_VALUE":
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            }

        case "FILTER_PRODUCTS":
            let { All_Products } = state;
            let TempFilterProduct = [...All_Products];
            const { text, category, company } = state.filters;
            if (text) {
                TempFilterProduct = TempFilterProduct.filter((CurElem) => {
                    return CurElem.name.toLowerCase().includes(text);
                });
            }
            if (category !== "ALL") {
                TempFilterProduct = TempFilterProduct.filter((CurElem) => {
                    return CurElem.category === category;
                });
            }
            if (company !== "ALL") {
                TempFilterProduct = TempFilterProduct.filter((CurElem) => {
                    return CurElem.company.toLowerCase() === company.toLowerCase();
                });
            }


            return {
                ...state,
                Filter_Products: TempFilterProduct,
            }
        case "CLEAR_FILTER":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    category: "ALL",
                    company: "ALL",
                }
            };

        default:
            return state;
    }
};

export default FilterReducer;
