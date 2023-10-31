import React from 'react';
const EcommerceCarousel = () => {
  return (
    <>
      <header style={headerStyle}>
        <img
          src="https://img.freepik.com/free-vector/black-friday-sale-banner-with-golden-glitter_1017-22178.jpg?w=1380&t=st=1697802682~exp=1697803282~hmac=9eeab068e38a783a18b1e4eccb5f9d56295ef87ba6e6aaa92a956e159426d318"
          alt="Header"
          style={imageStyle}
        />
      </header>
    </>
  );
};
const headerStyle = {

  textAlign: 'center',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
};



export default EcommerceCarousel;
