/**
 * service ini digunakan untuk
 * email sender
 */
const email = require('../config/email');

module.exports = async (message) => {
  try {
    const info = await email.sendMail(message);
    return info;
  } catch (err) {
    throw new Error('fail to send email');
  }
};
