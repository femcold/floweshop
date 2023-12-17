// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerAccount: String,
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
  salesOrderNumber: String,
  currency: String,
  orderType: String,
  deliveryDate: Date,
  deliveryMethod: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
