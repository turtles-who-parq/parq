const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');

const signupController = {};

signupController.signUp = async (req, res, next) => {
  try {
    // check if username already exists
    const user = await User.findOne({ username: req.body.username });
    console.log('user:', user);
    if (user)
      return res
        .status(409)
        .send({ message: 'User with given username already exists' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = await new User({
      ...req.body,
      password: hashPassword,
    }).save();
    console.log(newUser);
    return next();
  } catch (error) {
    res.status(500).send({ messsage: 'error on signupController' });
  }
};

module.exports = signupController;
