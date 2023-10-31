import React from 'react';
import Display from './displaylist';

const ListView = ({ products }) => { // Add curly braces around "products"
    return (
        <>  <div className='container text-center'>
            {products.map((curElem) => {
                return <Display key={curElem.id} {...curElem} />;
            })}
            </div>
        </>
    );
}

export default ListView;
