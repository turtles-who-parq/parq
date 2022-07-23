const express = require('express');
const router = express.Router();

// controllers
const apiController = require('../controllers/apiController');
const cookieController = require('../controllers/cookieController');
const googleRequestController = require('../controllers/googleController');

// provide the GOOGLE_API_KEY to the frontend
router.get('/key', apiController.getKey, (req, res) => res.status(200).json(res.locals.key));

router.post('/coordinates', googleRequestController.mapLocation, (req, res) => {
  return res.status(200).json(res.locals.coordinates);
});

// get requests for a single location - When user clicks a marker on the map
router.get('/location', apiController.getLocation, (req, res) => {
  return res.status(200).json(res.locals.location);
});

router.get('/all-listings', apiController.getAllLocation, (req, res) => {
  return res.status(200).json(res.locals);
});
// get request for bookings
router.get('/booking', cookieController.verifyCookie, apiController.getBooking, (req, res) => {
  return res.status(200).json(res.locals.booking);
});

// get request for all locations

// router.post('/input', cookieController.verifyCookie, googleRequestController.mapLocation, (req, res) => {
//   return res.status(200).json(res.locals);
// });

// post requests for new location

router.post('/location', cookieController.verifyCookie, googleRequestController.mapLocation, apiController.createLocation, apiController.getAllLocation, (req, res) => {
  return res.status(200).json(res.locals.result);
});

// post rquests for new bookings

router.post('/booking', cookieController.verifyCookie, apiController.createBooking, (req, res) => {
  return res.status(200).json(res.locals.booking);
});

// post for filter bookings
// router.post("/price", apiController.getPriceLocation, (req,res,next)=> {
//   return res.status(200).json();
// });

// router.post("/test", cookieController.verifyCookie, (req, res) => {
//   return res.status(200).json("Logged in");
// });

module.exports = router;
