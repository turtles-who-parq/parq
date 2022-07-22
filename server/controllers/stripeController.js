require('dotenv').config();
const { Location } = require('../models/userModel');

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const stripeController = async (req, res, next) => {
  const parkDummy = new Map([
    [1, { price: 1500, day: 1 }],
    [2, { price: 2000, day: 3 }],
  ]);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: parkDummy,
      success_url: 'http://localhost:8080/',
      cancel_url: 'http://www.google.com/',
    });
    res.locals.session = session;
    return next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = stripeController;
