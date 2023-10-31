import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const paymentOptions = [
    {
      id: 'payment',
      name: 'Stripe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      logo: 'https://sedberkdesign.com/wp-content/uploads/2020/06/kisspng-paypal-logo-brand-font-payment-paypal-logo-icon-paypal-icon-logo-png-and-vecto-5b7f273e45e8a9.9067728615350597742864.png',
    },
    {
      id: 'cashOnDelivery',
      name: 'Cash On Delivery',
      logo: 'https://4.imimg.com/data4/RC/YR/MY-8877598/cash-on-delivery-services-500x500.jpg',
    },
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Center vertically within the viewport
  };

  const paymentOptionsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px', // Add spacing between payment options
  };

  const paymentOptionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Add spacing between radio buttons and logos
  };

  const logoStyle = {
    width: '30px',
    height: '30px',
  };

  return (
    <div style={containerStyle}>
      <h2>Payment Options</h2>
      <div style={paymentOptionsStyle}>
        {paymentOptions.map((option) => (
          <div key={option.id} style={paymentOptionStyle}>
            {option.id === 'cashOnDelivery' ? (
              <NavLink to="/thanks">
                <input
                  type="radio"
                  id={option.id}
                  name="paymentOption"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => handleOptionChange(option.id)}
                />
              </NavLink>
            ) : (
              <input
                type="radio"
                id={option.id}
                name="paymentOption"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionChange(option.id)}
              />
            )}
            {option.logo && (
              <img
                src={option.logo}
                alt={option.name}
                style={logoStyle}
              />
            )}
            <label htmlFor={option.id}>{option.name}</label>
          </div>
        ))}
      </div>
      {selectedOption && selectedOption !== 'cashOnDelivery' && (
        <NavLink to={`/${selectedOption}`}>
          <Button className="btn btn-primary">
            Continue with {selectedOption}
          </Button>
        </NavLink>
      )}
    </div>
  );
};

export default PaymentOptions;
