
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  currentDate: {
    type: Date,
    default: Date.now,
  },
  name: String,
  email:String,
  city: String,
  state: String,
  shippingAddress: String,
  totalOrderAmount: Number,
  productDetails:String,
  selectedPaymentOption:String,
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
