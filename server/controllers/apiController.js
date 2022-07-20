const { Location, Booking } = require('../models/userModel');

const apiController = {};
 
// "Create location" controller - Used for adding a listing
apiController.createLocation = async (req, res, next) => {
  // When host adds listing, create new location in the db
  try {
    const hostName = res.locals.username;
    const { address, price, options, size } = req.body;
    const coordinates = res.locals.data;
    console.log(coordinates);
    //get coords for api
    await Location.create({
      hostName,
      address,
      price,
      options,
      size,
      coordinates,
    }).then(() => {
      return next();
    });
  } catch (err) {
    return next({
      log: `apiController.createLocation: Error: ${err}`,
      message: {
        err: 'Error occured in apiController.createLocation',
      },
    });
  }
};

// "Get location data" controller (singular)
// based on address, return location data
apiController.getLocation = (req, res, next) => {
  //get address entered by user from request
  const { address } = req.body; // Actual location in res TBD
  Location.findOne({ address }, (err, docs) => {
    if (err) {
      return next({
        log: `apiController.getLocation error :${err}`,
        message: {
          err: 'Error occured in getLocation',
        },
      });
    }
    res.locals.location = docs;
    console.log(docs);
    return next();
  });
};

//"get all locations" controller
apiController.getAllLocation = (req, res, next) => {
  //get all locations
  Location.find({}, (err, listings) => {
    if (err) {
      return next({
        log: `apiController.getAllLocation error :${err}`,
        message: {
          err: 'Error occured in getAllLocation',
        },
      });
    }
    res.locals.result = {
      lng: res.locals.data.lng,
      lat: res.locals.data.lat,
      listings,
    };
    // res.locals.location = docs;
    return next();
  });
};
// const bookingSchema = new Schema({
//   clientUsername: { type: String, required: true },
//   hostUsername: { type: String, required: true },
//   bookingDate: { type: String, required: true },
//   location: { type: String, required: true },
// });
// "Create booking" controller
apiController.createBooking = (req, res, next) => {
  //get input from user request (TBD)
  const username = res.locals.username;
  const { hostUsername, bookingDate, length, location } = req.body;
  console.log('username:', username);
  console.log('req', req.body);
  Booking.create(
    {
      clientUsername: username,
      hostUsername: hostUsername,
      bookingDate: bookingDate,
      length: length,
      location,
    },
    (err, docs) => {
      if (err) {
        return next({
          log: `apiController.getLocation error :${err}`,
          message: {
            err: 'Error occured in getLocation',
          },
        });
      }
      res.locals.booking = docs;
      return next();
    }
  );
};

// "Get booking" controller
apiController.getBooking = async (req, res, next) => {
  // find booking that was stored in database
  const { username } = req.body;
  await Booking.findOne({ clientUsername: username }).then((result) => {
    if (result) {
      console.log('Booking found in database!');
      res.locals.booking = result;
      return next();
    } else {
      console.log('Booking not found in database');
      return next({
        log: 'apiController.getBooking error',
        message: {
          err: 'Error occured finding booking location',
        },
      });
    }
  });
};

module.exports = apiController;
