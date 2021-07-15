const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

// export koneksi yang dibuat untuk mendefinisikan model
module.exports = database;
