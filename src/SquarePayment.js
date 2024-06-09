// src/SquarePayment.js
const { Client, Environment } = require('square');
const { v4: uuidv4 } = require('uuid');

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production
});

const paymentsApi = client.paymentsApi;

async function createPayment(nonce, amount) {
  try {
    const response = await paymentsApi.createPayment({
      sourceId: nonce,
      idempotencyKey: uuidv4(), // Generate a unique key for each transaction
      amountMoney: {
        amount: amount, // The amount in cents
        currency: 'USD'
      }
    });
    console.log('Payment Successful:', response.result);
    return response.result;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}

module.exports = createPayment;
