const { DataTypes } = require('sequelize');
// memakai database koneksi untuk mendefinisikan model
const dbConnection = require('../../config/database');

const User = dbConnection.define('articles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = User;
