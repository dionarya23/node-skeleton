const express = require('express');

/**
 * load express router dalam satu file
 * sehingga tidak perlu mendefinisikan lagi
 * disetiap file router
*/
module.exports = () => {
  const router = express.Router();
  return router;
};