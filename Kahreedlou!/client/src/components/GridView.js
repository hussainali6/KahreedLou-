import React from 'react';
import Product from './Product';

const GridView = ({ products }) => {
  return (
    <div className="container text-center">
      <div className="d-flex justify-content-around">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((curElem) => (
            <div key={curElem.id} className="col">
              <Product {...curElem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridView;
