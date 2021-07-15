/**
 * service ini digunakan untuk
 * menyimpan data pada redis cache
 */
const { promisify } = require('util');
const redisClient = require('../config/redis');

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.setex).bind(redisClient);

module.exports = {
  // set cache menggunakan redis selama 60 menit dengan key yang sudah ditentukan
  async setCache(key, data) {
    const payload = JSON.stringify(data);
    const result = await setAsync(key, 3600, payload);
    return result;
  },

  // mendapatkan data berdasarkan key yang sebelum nya sudah di cache
  async getCache(key) {
    const result = await getAsync(key);
    return result;
  },
};
