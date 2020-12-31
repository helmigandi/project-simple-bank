'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Accounts', 'CustomerId', {
      type: Sequelize.INTEGER,
      references: {
        model: {tableName: 'Customers' },
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Accounts', 'CustomerId');
  }
};
