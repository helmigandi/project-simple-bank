'use strict';
const { promiseImpl } = require('ejs');
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
    identityNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Identity Number must be filled'
        },
        len: {
          args: [16, 20],
          msg: 'Identity Number minimum 16 characters and maximum 20 characters'
        },
        isDuplicate(value) {
          return Customer.findOne({ where: { identityNumber: value } })
            .then((customerData) => {
              if (customerData && this.id !== customerData.id) throw new Error('Duplicate Identity Number');
            });
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Full name must be filled'
        }
      }
    }, 
    address: DataTypes.STRING,
    birthDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Birth Date must be filled'
        }
      }
    },
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