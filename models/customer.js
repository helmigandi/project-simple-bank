'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Account);
    }
    get getBirthDate() {
      // make birthDate: YYYY-MM-DD
      const dateData = this.birthDate;
      const birthday = [
        dateData.getFullYear(),
        ('0' + (dateData.getMonth() + 1)).slice(-2),
        ('0' + dateData.getDate()).slice(-2)
      ].join('-');
      return birthday;
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