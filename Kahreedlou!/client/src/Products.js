import React from 'react';
import Sort from './components/sort';
import Filtersection from './components/filtersection';
import Productlist from './components/productlist';
import Footer from './components/footer';

const Products = () => {
  return (
   <>
   <br/>
   <Sort />
   <Filtersection />
   <Productlist />
   <br/>
   <Footer />
   </>
  )
};



export default Products;
