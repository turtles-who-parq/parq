require('dotenv').config();
const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  const { username } = req.body;
  const { firstname, lastname, mode } = res.locals;
  const token = generateAuthToken({ username, firstname, lastname, mode });
  res.cookie('token', token, {
    httpOnly: true,
  });
  return next();
};

cookieController.verifyCookie = (req, res, next) => {
  const token = req.cookies.token;
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
    res.locals.username = decoded.username;
    res.locals.firstname = decoded.firstname;
    res.locals.lastname = decoded.lastname;
    res.locals.mode = decoded.mode;
    return next();
  });
};

//clear cookie on logout:
cookieController.logout = (req, res, next) => {
  res.clearCookie('token');
  return next();
};

function generateAuthToken(user) {
  const token = jwt.sign(user, process.env.JWTPRIVATEKEY, {
    expiresIn: '1d',
  });
  return token;
}

module.exports = cookieController;
