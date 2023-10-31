import React from 'react'
import { useProductContext } from '../context/ProductContext';
import { NavLink } from 'react-router-dom';
import Product from './Product';

const Feature = () => {
    const { isLoading, featureProducts } = useProductContext();
    console.log(featureProducts);
    if (isLoading) {
        return <div>......Loading</div>
    }

    return (
        <>
        <h5 style={{textAlign:'center',color:'grey',fontSize:'30px',fontWeight:'bold'}}>Feature Products</h5>
        <br/>
            <div className='container text-center d-flex justify-content-around'>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {featureProducts.map((curElem) => {
                        return <Product key={curElem.id} {...curElem} />
                    })
                    }
                </div>
            </div>
            <br/>
            <br/>
            <br/>
           <NavLink to='/products' style={{textDecoration:'none'}}> <p style={{textAlign:'center',fontWeight:'bold',color:'gray'}}>View All Products</p></NavLink>
        </>
    )
}
export default Feature;

