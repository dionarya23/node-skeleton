// middleware untuk memvalidasi data yang masuk;
const { StatusCodes } = require('http-status-codes'); 
const Joi = require('joi');

module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    console.log('error', message);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ 
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      error: message 
    });
  }
};
