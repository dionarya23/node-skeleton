const { StatusCodes } = require('http-status-codes');

/**
 * error handler pada controller mengalami error
 * status response akan mengirim
 * internal server error atau status 500
 * */
const errorHandler = (res) => (err) => {
  // eslint-disable-next-line no-console
  console.error(err.message);
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  return res
    .status(statusCode)
    .json({ status: statusCode, message: err.message })
    .end();
};

/**
 * dikarenakan semua router handler memakai Promise
 * disini mengambil hasil yang
 * direturn oleh router handler pada controller
 */
module.exports = (fn) => (req, res) => {
  fn(req, res)
    .then((result) => res.status(result.status).json(result).end())
    .catch(errorHandler(res));
};
