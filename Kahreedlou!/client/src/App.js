import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import Products from "./Products";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import ErrorPage from "./ErrorPage";
import NavBar from "./components/Navbar";
import Checkout from "./checkout";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./Admin";
import Adminlogin from "./Adminlogin";
import AddProducts from "./AddProducts";
import AdminView from "./AdminView";
import UpdateProductForm from "./UpdateProductform";
import Viewcustomer from "./viewcustomer";
import UserDataFetcher from "./fetchusers";
import UserUpdate from "./Userupdate";
import Adminchat from "./AdminChat";
import Payment from "./Payment";
import Thanks from "./thanks";
import Paypal from "./Paypal";
import Success from "./Success";
import PaymentOptions from "./PaymentOptions";
import Orders from "./Orders";
import Email from "./Email";
import OurTeam from "./components/OurTeam";
import Profile from "./UserProfile";
import CheckoutFrim from "./checkingform";
const App = () => {
 

  return (
    
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/adminview" element={<AdminView />} />
        <Route path="/update/:productId" element={<UpdateProductForm />} />
        <Route path="/users/:userId" element={<UserUpdate />} />
        <Route path="/viewcustomers" element={<Viewcustomer />} />
        <Route path="/fetchusers" element={<UserDataFetcher />} />
        <Route path="/chat" element={<Adminchat />} />
        <Route path="/paypal" element={<Paypal />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/options" element={<PaymentOptions />} />
        <Route path="/email" element={<Email />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/frim" element={<CheckoutFrim />} />
      </Routes>
    </Router>
  );
};

export default App;
