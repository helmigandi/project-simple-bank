'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Account);
    }
  };
  Customer.init({
    identityNumber: DataTypes.STRING,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    accountNumber: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};