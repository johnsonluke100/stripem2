// src/StripeSync.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Example: Create a customer in Stripe after a successful Square transaction
async function createStripeCustomer(email) {
  try {
    const customer = await stripe.customers.create({
      description: 'Customer for ' + email,
      email: email
    });
    console.log('Customer created in Stripe:', customer);
    return customer;
  } catch (error) {
    console.error('Error creating customer in Stripe:', error);
    throw error;
  }
}

module.exports = createStripeCustomer;
