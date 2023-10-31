import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCartContext } from './context/Cartcontext';
import '../src/styles/payment.css';
import { useNavigate } from 'react-router-dom';

const Paymentform = () => {
    const navigate = useNavigate();
    const { totalPrice, shipping_fee } = useCartContext();
    const discountPercentage = 10;
    const discountedTotalPrice =
        totalPrice - (totalPrice * discountPercentage) / 100;
    const calculatedTotalOrderAmount = discountedTotalPrice + shipping_fee;
    const stripe = useStripe();
    const elements = useElements();

    const [cardholderName, setCardholderName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            const { paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: cardholderName, // Add the cardholder name
                },
            });

            const response = await fetch('http://localhost:3017/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: calculatedTotalOrderAmount, // Replace with your desired amount in dollars
                    payment_method_id: paymentMethod.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to confirm payment on the server.');
            }

            const { clientSecret } = await response.json();

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
                setup_future_usage: 'off_session', // Specify as needed
                return_url: 'http://localhost:3000/success', // Your success URL
            });

            if (error) {
                throw new Error(`Payment failed: ${error.message}`);
            }

            setSuccess(`Payment successful! PaymentIntent ID: ${paymentIntent.id}`);
            alert('Payment successful!');
            navigate('/thanks');
            setError(null);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body payment-form" style={{ backgroundColor: 'lightslategray' }}>
                            <h2 className="card-title text-white">Checkout</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="cardholder-name" className="form-label text-white">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        id="cardholder-name"
                                        className="form-control"
                                        value={cardholderName}
                                        onChange={(e) => setCardholderName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="card-details" className="form-label text-white">
                                        Card details
                                    </label>
                                    <CardElement
                                        id="card-details"
                                        className="form-control"
                                        style={{
                                            base: {
                                                fontSize: '16px',
                                                color: 'white',
                                                '::placeholder': {
                                                    color: 'white',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                {/* Continue with the rest of your form */}
                                <button
                                    type="submit"
                                    className="btn btn-danger" // Change button color to red
                                    disabled={!stripe || loading}
                                >
                                    {loading ? 'Processing...' : 'Pay'}
                                </button>
                            </form>
                            {error && <div className="text-danger mt-3">{error}</div>}
                            {success && <div className="text-success mt-3">{success}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paymentform;
