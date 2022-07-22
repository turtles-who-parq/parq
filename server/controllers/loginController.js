const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const loginController = {};

loginController.loginUser = async (req, res, next) => {
  console.log('Reqest ==> ', req.body);
  const { username, password } = req.body;
  let foundPassword;
  console.log('Username ==> ', username);
  //verify username
  try {
    const user = await User.findOne({ username });
    foundPassword = user.data.password;
    //Pass user first and last name to avatar
    res.locals.firstname = user.data.firstname;
    res.locals.lastname = user.data.lastname;
    console.log('Query response ==> ', user);
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

// loginController.createToken = (req, res, next) => {
//   const { username } = req.body;
//   const token = username.generateAuthToken();
//   console.log("Checking Token:", token)
//   User.updateOne({ username }, { token }, (err, docs) => {
//     if (err) return next(err);
//     res.locals.data = token;
//     console.log("res.locals.data:", res.locals.data)
//     return next();
//   });
// };

// loginController.isLoggedIn = (req, res, next) => {
//     const {username} = req.body
//     User.findOne({username})
// };

module.exports = loginController;
