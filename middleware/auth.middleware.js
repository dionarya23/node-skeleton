// middleware untuk meproteksi api yang mengaharuskan user login
const { StatusCodes } = require('http-status-codes');
const { descryptToken } = require('../services/jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    // penggunaan descrypt token untuk mendapatkan info user yang sedang login
    req.user = descryptToken(req.header('Authorization').replace('Bearer ', ''));
    return next();
  } catch (err) {
    console.log('error auth middleware : ', err);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: 'invalid token',
    });
  }
};
