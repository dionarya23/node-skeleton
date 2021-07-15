const { StatusCodes } = require('http-status-codes');
// memanggil error handler jika proses pada controller mengalami kendala
const ApiError = require('../helpers/ApiError');

// memanggil repository user;
const UserRespository = require('../repositories/user.repository');

// memanggil password service, jwt services, dan email service
const { EncryptPassword, ComparePassword } = require('../services/password');
const { generateToken } = require('../services/jsonwebtoken');
const emailService = require('../services/emailSender');
/**
 * mendefinisikan router handle dengan
 * async await untuk menghindari callback hell
 * yang nantinya bisa dipakai router
*/
module.exports = {
 // contoh untuk user melakukan register
  async register(req) {
    try {
      const { email, password } = req.body;
        // memanggil repository untuk mengambil user berdasarkan email;
      const isEmailExist = await UserRespository.findUserByEmail(email);
      if (isEmailExist){
        return { 
          status: StatusCodes.BAD_REQUEST,
          message: 'email already exists'    
        }
      }
      const hashPassword = EncryptPassword(password);
      const newUser = await UserRespository.insert({ email, password: hashPassword });
      const messageToEmail = {
         from: process.env.MAIL_FROM,
         to: email,
         subject: "Verifikas Anda",
         body: "Akun anda berhasil dibuat"
      };

      await emailService(messageToEmail)
      const token = generateToken(newUser);
      return {
        status: StatusCodes.OK,
        message: 'success register user',
        data: {
          user: newUser,
          token
        }
      }
    } catch (err) {
      console.log('error at register controller user :', err);
      throw new ApiError('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  async login(req) {
    try {
      const { email, password } = req.body;
        // memanggil repository untuk mengambil user berdasarkan email;
      const userExist = await UserRespository.findUserByEmail(email);
      if (!userExist){
        return { 
          status: StatusCodes.NOT_FOUND,
          message: 'email not found'    
        }
      }

      if (!ComparePassword(password, userExist.password)) {
        return { 
          status: StatusCodes.BAD_REQUEST,
          message: 'password invalid'    
        }
      }
  
      const token = generateToken(userExist);
      return {
        status: StatusCodes.OK,
        message: 'success login user',
        data: {
          user: userExist,
          token
        }
      }
    } catch (err) {
      console.log('error at login controller user :', err);
      throw new ApiError('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};
