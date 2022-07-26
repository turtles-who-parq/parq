const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const cookieController = require('../controllers/cookieController');

router.post('/signup', signupController.signUp, cookieController.setCookie, (req, res) => {
  res.status(201).send({ message: 'User created successfully' });
});

router.post('/login', loginController.loginUser, cookieController.setCookie, (req, res) => {
  res.status(201).json(res.locals);
});

router.get('/auth', cookieController.verifyCookie, (req, res) => res.status(200).json(res.locals));

router.get('/logout', cookieController.logout, (req, res) => res.sendStatus(200));

module.exports = router;
