const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const loginController = {};

loginController.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  let foundPassword;
  try {
    const user = await User.findOne({ username });
    foundPassword = user.password;
    //Pass user first and last name to avatar
    res.locals.firstname = user.firstname;
    res.locals.lastname = user.lastname;
    res.locals.mode = user.mode;
  } catch (error) {
    next({ message: 'Invalid username' , log: 'Invalid username: ' + JSON.stringify(error)});
  }
  try {
    //verify password
    await bcrypt.compare(password, foundPassword);
  } catch (error) {
    next({ message: 'Invalid password' , log: 'Invalid password ' + JSON.stringify(error)});
  }
  return next();
};

module.exports = loginController;
