// konfigurasi untuk redis yang digunakan cache
const redis = require('redis');

const rediClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

module.exports = rediClient;
