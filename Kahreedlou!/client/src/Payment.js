import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Paymentform from './Paymentform'; 

const stripePromise = loadStripe('pk_test_51NtxUTHQuUJqY1oB1lH6oj4vrMrIAdN8WNupRXioa9Bw3V9or4Wk1CP1kyVVC4l1fiL4rzJiEvtpBvtr0eeEko4a00vgf6BTr9'); // Replace with your Stripe Publishable Key

function Payment() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <Paymentform />
      </Elements>
    </div>
  );
}

export default Payment;
