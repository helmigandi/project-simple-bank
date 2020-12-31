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
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.addHook('beforeCreate', 'defaultValueForBirthDate', (instance, options) => {
    if (!instance.birthDate) {
      instance.birthDate = '2000-01-01';
    }
  });
  return Customer;
};