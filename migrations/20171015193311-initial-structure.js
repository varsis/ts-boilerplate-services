'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Foo', {
      sequentialId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },
      bar: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sequentialId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Foo');
  }
};
