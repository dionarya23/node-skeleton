/**
 * service ini digunakan untuk
 * generate dan descrypt token jwt
 */
const jwt = require('jsonwebtoken');

module.exports = {
  generateToken(data) { return jwt.sign({ data }, process.env.JWTSECRET, {}) },
  descryptToken(token) { return jwt.verify(token, process.env.JWTSECRET)},
};