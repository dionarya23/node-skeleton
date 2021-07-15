/**
 * service ini digunakan untuk generate password
 * dan compare plain password dan hash password
 */
const bcrypt = require('bcryptjs');

module.exports = {
  EncryptPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
  },
  ComparePassword(plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword);
  },
};
