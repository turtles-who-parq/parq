require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const stripeController = async (req, res, next) => {
  // console.log('reached stripe controller');
  const { startDate, endDate, location, priceInCents, quantity } = req.body.checkoutInfo;

  const CLIENT_URL = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Parking spot at ${location} from ${startDate} to ${endDate}`,
            },
            unit_amount: priceInCents,
          },
          quantity,
        },
      ],
      // success_url: 'https://parqdotcom.azurewebsites.net/success',
      // cancel_url: 'http://parqdotcom.azurewebsites.net/',
      success_url: `http://${CLIENT_URL}/success`,
      cancel_url: `http://${CLIENT_URL}/`,
    });

    console.log('session==>', session);
    res.locals.link = { url: session.url };
    return next();
  } catch (e) {
    console.log('stripe controller error==>', e);
  }
};

module.exports = stripeController;
