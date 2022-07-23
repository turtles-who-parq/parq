const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');

const signupController = {};

signupController.signUp = async (req, res, next) => {
  try {
    // check if username already exists
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(409).send({ message: 'User with given username already exists' });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    await new User({
      ...req.body,
      password: hashPassword,
      mode: 'light'
    }).save();
    //Pass user first and last name to avatar
    res.locals.firstname = req.body.firstname;
    res.locals.lastname = req.body.lastname;
    res.locals.mode = 'light';

    return next();
  } catch (error) {
    res.status(500).send({ messsage: 'error on signupController' });
  }
};

module.exports = signupController;
