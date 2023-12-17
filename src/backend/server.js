const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/OrderingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Customer Schema
const Customer = mongoose.model('Customer', {
  account: String,
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
});

// Order Schema
const Order = mongoose.model('Order', {
  customerAccount: String,
  salesOrderNumber: String,
  currency: { type: String, default: 'Naira' },
  orderType: { type: String, enum: ['Sales Order', 'Return Order'] },
  deliveryDate: Date,
  deliveryMethod: { type: String, enum: ['Uber', 'Bike', 'PickUp'] },
  // Add other fields as needed
});

// Create account endpoint
app.post('/api/create-account', async (req, res) => {
  try {
    // Generate Customer Account Number
    const customerAccountNumber = generateCustomerAccountNumber();

    const formData = req.body;

    // Save the account data in the database
    const newAccount = new Customer({
      account: customerAccountNumber,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    });

    await newAccount.save();

    // Return the generated Customer Account Number
    res.status(200).json({ customerAccountNumber });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Insert sample customer data endpoint
app.post('/api/insert-sample-customer', async (req, res) => {
  try {
    const sampleCustomerData = [
      {
        account: 'account1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
        address: '123 Main St, Cityville',
      },
      {
        account: 'account3',
        name: 'Dejavu Jones',
        email: 'dj.joe@example.com',
        phoneNumber: '123-456-7890',
        address: '512 Iyana St, Lagos',
      },
      // Add more sample data as needed
    ];

    await Customer.insertMany(sampleCustomerData);
    res.status(201).send('Sample data inserted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Filtered accounts endpoint
app.get('/api/filtered-accounts', async (req, res) => {
  try {
    const { query } = req.query;

    const filteredAccounts = await Customer.find({
      $or: [
        { account: { $regex: new RegExp(query, 'i') } },
        { name: { $regex: new RegExp(query, 'i') } },
        { email: { $regex: new RegExp(query, 'i') } },
        { phoneNumber: { $regex: new RegExp(query, 'i') } },
        { address: { $regex: new RegExp(query, 'i') } },
        // Add more fields for searching as needed
      ],
    });

    res.status(200).send(filteredAccounts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const formData = req.body;

    // Generate Sales Order Number
    const salesOrderNumber = generateSalesOrderNumber();

    // Use server's current date/time as the Delivery Date
    const deliveryDate = new Date();

    // Save the order data in the database
    const order = new Order({
      customerAccount: formData.customerAccount,
      salesOrderNumber,
      currency: formData.currency || 'Naira', // Default to Naira if not provided
      orderType: formData.orderType,
      deliveryDate,
      deliveryMethod: formData.deliveryMethod,
      // Add other fields as needed
    });

    await order.save();

    // Return the generated Sales Order Number and Delivery Date
    res.status(200).json({ salesOrderNumber, deliveryDate });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateSalesOrderNumber() {
  const prefix = 'SO';
  const randomNumbers = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}${randomNumbers}`;
}

function generateCustomerAccountNumber() {
  const prefix = 'CA';
  const randomNumbers = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNumbers}`;
}


// Create account endpoint
app.get('/api/generate-customer-account-number', async (req, res) => {
  try {
    // Generate Customer Account Number
    const customerAccountNumber = generateCustomerAccountNumber();
    res.status(200).json({ customerAccountNumber });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/generate-sales-order-number', async (req, res) => {
  try {
    // Generate Sales Order Number
    const salesOrderNumber = generateSalesOrderNumber();
    res.status(200).json({ salesOrderNumber });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});