// src/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const createPayment = require('./SquarePayment');
const createStripeCustomer = require('./StripeSync');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/process-payment', async (req, res) => {
  const { nonce, email, amount } = req.body;

  try {
    await createPayment(nonce, parseFloat(amount) * 100); // Convert amount to cents
    await createStripeCustomer(email);
    res.send('Payment and customer creation successful');
  } catch (error) {
    res.status(500).send('Payment processing failed');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
