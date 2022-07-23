require('dotenv').config();
const { Location } = require('../models/userModel');

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const stripeController = async (req, res, next) => {
  const parking = { priceInCents: 1507, day: 1, parkingName: 'Park#n' };

  const parkDummy = new Map([
    [1, { priceInCents: 1500, day: 1, parkingName: 'Park1' }],
    [2, { priceInCents: 2000, day: 3, parkingName: 'Park2' }],
  ]);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: parking.map(park => {
        const storePark = parkDummy.get(park.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storePark.parkingName,
            },
            unit_amount: storePark.priceInCents,
          },
          quantity: park.day,
        };
      }),
      success_url: `http://localhost:8080/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'http://www.google.com/',
    });
    res.locals.session = session;
    return next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = stripeController;
