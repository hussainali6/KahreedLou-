/* eslint-disable react/prop-types */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./Checkoutform";

const PUBLIC_KEY =
  "pk_test_51NtxUTHQuUJqY1oB1lH6oj4vrMrIAdN8WNupRXioa9Bw3V9or4Wk1CP1kyVVC4l1fiL4rzJiEvtpBvtr0eeEko4a00vgf6BTr9";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

// eslint-disable-next-line react/prop-types
export default function StripeContainer({

}) {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm
      />
    </Elements>
  );
}
