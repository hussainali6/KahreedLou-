import React, { useState, useEffect } from "react";
import { useCartContext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import "../checkoutform.css";

const CheckoutForm = () => {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [totalOrderAmount, setTotalOrderAmount] = useState("");
  const [productDetails, setProductDetails] = useState(""); // Initialize with an empty string
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const customerInfo = {
      name,
      email,
      city,
      state,
      shippingAddress,
      totalOrderAmount: calculatedTotalOrderAmount,
      productDetails,
      currentDate,
      selectedPaymentOption,
    };

    try {
      const response = await fetch("/api/store-user-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerInfo),
      });

      if (response.status === 201) {
        console.log("Order placed successfully");
      } else {
        console.error("Error placing order");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Redirect based on the selected payment option
    if (selectedPaymentOption === "Stripe") {
      history("/payment"); // Replace with the actual route for Stripe payment
    } else if (selectedPaymentOption === "PayPal") {
      history("/paypal"); // Replace with the actual route for PayPal payment
    } else if (selectedPaymentOption === "cashOnDelivery") {
      history("/thanks"); // Replace with the actual route for Cash on Delivery payment
    }
  };

  const { cart, totalPrice, shipping_fee } = useCartContext();
  const extractedData = cart.map(({ id, name, amount, image }) => ({
    id,
    name,
    quantity: amount,
    image,
  }));

  const discountPercentage = 10;
  const discountedTotalPrice =
    totalPrice - (totalPrice * discountPercentage) / 100;
  const calculatedTotalOrderAmount = discountedTotalPrice + shipping_fee;

  useEffect(() => {
    // Automatically load product details from the cart when the component mounts
    const productInfo = extractedData.map(
      (product) => `Name: ${product.name}, Quantity: ${product.quantity}`
    );
    setProductDetails(productInfo.join("\n"));
  }, [extractedData]); // Run this effect when extractedData changes

  return (
    <>
    <br/>
    <div className="container" style={{backgroundColor:'lightgray',padding:'20px'}}>
      <h2>Checkout Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Date</label>
              <input type="text" className="form-control" id="currentDate"
                value={currentDate}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input type="text" className="form-control" id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="shippingAddress" className="form-label">Shipping Address</label>
              <textarea className="form-control" id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                rows="4" required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="totalOrderAmount" className="form-label">Total Order Amount</label>
              <input type="number" className="form-control" id="totalOrderAmount"
                value={calculatedTotalOrderAmount}
                onChange={(e) => setTotalOrderAmount(e.target.value)}
                required />
            </div>
            <div className="mb-3">
              <label htmlFor="productDetails" className="form-label">Product Details</label>
              <textarea className="form-control" id="productDetails"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                rows="4" required></textarea>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label d-block">Payment Options</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="paymentOptionStripe"
              value="Stripe"
              checked={selectedPaymentOption === 'Stripe'}
              onChange={() => setSelectedPaymentOption('Stripe')}
              name="paymentOption"
              required
            />
            <label className="form-check-label" htmlFor="paymentOptionStripe">
              Stripe
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="paymentOptionPayPal"
              value="PayPal"
              checked={selectedPaymentOption === 'PayPal'}
              onChange={() => setSelectedPaymentOption('PayPal')}
              name="paymentOption"
              required
            />
            <label className="form-check-label" htmlFor="paymentOptionPayPal">
              PayPal
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="paymentOptionCashOnDelivery"
              value="CashOnDelivery"
              checked={selectedPaymentOption === 'CashOnDelivery'}
              onChange={() => setSelectedPaymentOption('CashOnDelivery')}
              name="paymentOption"
              required
            />
            <label className="form-check-label" htmlFor="paymentOptionCashOnDelivery">
              Cash On Delivery
            </label>
          </div>
        </div>
          
        <button type="submit" className="btn btn-dark">Proceed To Pay</button>
      </form>
    </div>
    <br/>
    <Footer />
</>
  );
};

export default CheckoutForm;
