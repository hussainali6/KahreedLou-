import React from 'react';
import { useFilterContext } from '../context/FilterContext';
import GridView from './GridView';
import ListView from './ListView';


const Productlist = () => {
    const { Filter_Products, Grid_View } = useFilterContext();


    if (Grid_View === true) {
        return (
            <div >
                <GridView products={Filter_Products} />
            </div>
        );
    }
    if (Grid_View === false) {
        return (
            <div >
                <ListView products={Filter_Products} />
            </div>
        );
    }

};

export default Productlist;
