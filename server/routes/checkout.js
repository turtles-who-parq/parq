const express = require('express');
const router = express.Router();

const stripeController = require('../controllers/stripeController');

router.post('/', stripeController, (req, res) => {
  res.status(200).json({
    message: 'THIS IS STRIPE ROUTEEEEEEEEEEEE',
  });
});

module.exports = router;
