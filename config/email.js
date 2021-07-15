// konfigurasi untuk email service
const nodemailer = require('nodemailer');

const config = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
};

const email = nodemailer.createTransport(config);

// export konfigurasi email
module.exports = email;
