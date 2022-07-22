const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const loginController = {};

loginController.loginUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    //verify username
    console.log('username==>', username);
    const user = await User.findOne({ username });
    console.log('user==>', user);
    if (!user) return res.status(401).send({ message: 'Invalid username or password' });
    //verify password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: 'Invalid username or password' });
    //Pass user first and last name to avatar
    res.locals.firstname = user.firstname;
    res.locals.lastname = user.lastname;

    return next();
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
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
