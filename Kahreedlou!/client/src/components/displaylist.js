import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/product.css";

const Display = (curElem) => {
    const { id, name, images, price, category } = curElem;

    return (
    <>    
            <br/>
            <div className="container">
                <div className="card product-card" style={{backgroundColor:'lightgray'}}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={images[0]} className="card-img" alt="Product" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="btn btn-dark">{name}</h5>
                                <br />
                                <h5 className="btn btn-dark">Price: ${price}</h5>
                                <br />
                                <h5 className="btn btn-dark">Category: {category}</h5>
                                <br/>
                                <NavLink to={`/singleproduct/${id}`}>  <button className='btn btn-dark'>view details</button></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
    );
}

export default Display;
