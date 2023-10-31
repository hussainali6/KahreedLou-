import { useContext, createContext, useReducer, useEffect } from "react";
import { useProductContext } from "./ProductContext";
import FilterReducer from "../reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
    Filter_Products: [],
    All_Products: [],
    Grid_View: true,
    Sorting_Value: "lowest",
    filters: {
        text: "",
        categoty: "ALL",
        company: "ALL",
    }
};

export const FilterContextProvider = ({ children }) => {

    const { products } = useProductContext();
    const [state, dispatch] = useReducer(FilterReducer, initialState);

    const SetGridView = () => {
        dispatch({ type: "SET_GRID_VIEW" });
    };
    const SetListView = () => {
        dispatch({ type: "SET_LIST_VIEW" });
    };
    const Sorting = (event) => {
        let UserValue = event.target.value;
        dispatch({ type: "GET_SORT_VALUE", payload: UserValue });
    }
    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        return dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } });
    }
    const clearfilter = () => {
        dispatch({ type: "CLEAR_FILTER" });

    }

    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" });
        dispatch({ type: "SORTING_PRODUCTS", payload: products });
    }, [products, state.Sorting_Value, state.filters]);

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }, [products])
    return (
        <FilterContext.Provider value={{ ...state, SetGridView, SetListView, Sorting, updateFilterValue,clearfilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};
