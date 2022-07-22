require('dotenv').config();
const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const { username } = req.body;
  const token = generateAuthToken(username);
  res.cookie('token', token, {
    httpOnly: true,
  });
  return next();
};

cookieController.verifyCookie = (req, res, next) => {
  const token = req.cookies.token;
  console.log('token:', token);
  if (!token) {
    console.log('no token found!');
    return next({message: 'no token found!'});
  }
  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
    if (err) {
      return next({
        log: 'error in verify login',
        status: 403,
        message: err,
      });
    }
    console.log('decoded==>', decoded);
    res.locals.username = decoded.username;
    return next();
  });
};

//clear cookie on logout:
cookieController.logout = (req, res, next) => {
  res.clearCookie('token');
  return next();
};

function generateAuthToken(username) {
  const token = jwt.sign({ username: username }, process.env.JWTPRIVATEKEY, {
    expiresIn: '1d',
  });
  return token;
}

module.exports = cookieController;
