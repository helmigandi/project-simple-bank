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
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: 500000,
          msg: 'Minimum balance for new Accout: Rp 500.000'
        },
        defaultValue(value) {
          if (!value) {
            this.balance = 500000;
          }
        },
        isNumber(value) {
          // only accept number
          const checkNumber = new Number(value)
          if (isNaN(checkNumber)) {
            throw new Error('Balance must be number');
          }
        }
      }
    },
    accountNumber: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  Account.addHook('beforeCreate', 'addAccountNumber', (instance, options) => {
    instance.accountNumber = Math.random()
      .toString()
      .slice(2, 12);
  });
  Account.addHook('beforeValidate', 'updateBalance', (instance, options) => {
    if (instance.balance < 0) {
      throw new Error('Insufficient balance');
    }
  });
  return Account;
};