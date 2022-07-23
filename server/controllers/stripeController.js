require('dotenv').config();

//const cors = require('cors');
//app.use(express.json());
// app.use(
//   cors({
//     origin: 'http://localhost:7924',
//   })
// );

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const stripeController = async (req, res, next) => {
  // console.log('reached stripe controller');
  const { startDate, endDate, totalDue, hostUsername, clientUsername, location, priceInCents, quantity } = req.body.checkoutInfo;

  /*
checkoutInfo==> {
[1]   startDate: 'Sat Jul 23 2022',
[1]   endDate: 'Mon Jul 25 2022',
[1]   totalDue: 20000,
[1]   hostUsername: 'ff',
[1]   clientUsername: 'missparker',
[1]   location: '250 Richmond Street E, Toronto'
[1] }
*/

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
      success_url: `http://localhost:8080/success`,
      cancel_url: 'http://www.google.com/',

      // success_url: `${process.env.CLIENT_URL}/success.html`,
      // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });

    console.log('session==>', session);
    res.locals.link = { url: session.url };
    return next();
    //res.json({ url: session.url });
  } catch (e) {
    console.log('stripe controller error==>', e);
    //res.status(500).json({ error: e.message });
  }
};
// try {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     mode: 'payment',
//     line_items: parking.map(park => {
//       const storePark = parkDummy.get(park.id);
//       return {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: storePark.parkingName,
//           },
//           unit_amount: storePark.priceInCents,
//         },
//         quantity: park.day,
//       };
//     }),
//     // success_url: `http://localhost:8080/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//     success_url: `http://localhost:8080/`,
//     cancel_url: 'http://www.google.com/',
//   });
//   res.locals.url = { url: session.url };
//   return next();
// } catch (error) {
//   res.status(500).json({ error: error.message });
// }
//};

module.exports = stripeController;
