const { DataTypes } = require('sequelize');
// memakai database koneksi untuk mendefinisikan model
const dbConnection = require('../../config/database');

const User = dbConnection.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = User;
