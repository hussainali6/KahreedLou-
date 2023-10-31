import React, { useState, useEffect } from 'react';
import { useCartContext } from './context/Cartcontext';
import axios from 'axios';
import Footer from './components/footer';
const Paypal = () => {
  const { totalPrice, shipping_fee } = useCartContext();
  const discountPercentage = 10;
  const discountedTotalPrice = totalPrice - (totalPrice * discountPercentage) / 100;

  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [price, setPrice] = useState(
    (discountedTotalPrice + shipping_fee).toFixed(2)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
  
    const appId = '0eca189daea94735abe8765d66bf672c';
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${appId}&base=USD`;

    axios
      .get(apiUrl)
      .then((response) => {
        const rates = response.data.rates;
        const selectedRate = rates[currency] || 1;
        setExchangeRate(selectedRate);
      })
      .catch((error) => {
        console.error('Error fetching exchange rate:', error);
      });
  }, [currency]);

  useEffect(() => {
    const calculatedTotalOrderAmount = (
      discountedTotalPrice +
      shipping_fee
    ).toFixed(2);
    setPrice((calculatedTotalOrderAmount * exchangeRate).toFixed(2));
  }, [discountedTotalPrice, shipping_fee, exchangeRate]);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post('/create-payment', {
        price: parseFloat(price),
        currency,
      });

      const { paymentLink } = response.data;
      window.location.href = paymentLink;
    } catch (error) {
      console.error(error);
      setError('Failed to create PayPal payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', background: 'lightgray' }}>
        <h1>Welcome To PayPal</h1>
        <div style={{ marginBottom: '20px' }}>
          <label>Price ({currency}): </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={price}
            disabled
            onChange={(e) => setPrice(parseFloat(e.target.value).toFixed(2))}
            style={{ width: '80px', textAlign: 'right', marginLeft: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Currency: </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{ marginLeft: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            {/* Add more currency options as needed */}
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handlePayment} disabled={isLoading} style={{ backgroundColor:'gray', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>
          {isLoading ? 'Processing...' : 'Pay with PayPal'}
        </button>
      </div>
    </div>
    <Footer />
 </>  
  );
};

export default Paypal;
