/**
 * service ini digunakan untuk memvalidasi data
 * yang masuk atau key pada body parser
 * apakah valid atau tidak
 */
const Joi = require('joi');

const validationSchemas = {
    registrationUser: Joi.object().keys({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required(),
    }),
    articlePOST: Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
    }),
}

module.exports = validationSchemas;