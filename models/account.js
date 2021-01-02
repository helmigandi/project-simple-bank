'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.Customer);
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    accountNumber: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  Account.addHook('beforeCreate', 'addAccountNumber', (instance, options) => { 
    instance.accountNumber = Math.random()
      .toString()
      .slice(2,12);
  })
  return Account;
};