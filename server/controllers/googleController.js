require('dotenv').config();
const axios = require('axios');

const googleRequestController = {};

googleRequestController.mapLocation = (req, res, next) => {

  const { address } = req.body;
  console.log('location is:', address);
  // const location = "202 Grand Bld Brentwood NY 11717";
  axios
    .get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params: {
        address: address,
        key: process.env.GOOGLE_API_KEY,
      },
    })
    .then(response => {
      console.log('googleRequestController.mapLocation results ==> ', response);
      res.locals.coordinates = response.data.results[0].geometry.location;
      return next();
    })
    .catch(err => next({
      log: 'googleRequestController.mapLocation: ERROR: Error getting coordinates data from file',
      message: `Error occurred in googleRequestController.mapLocation: ${err}`
    }));
};

module.exports = googleRequestController;
