'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VinnylMusics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      singer: {
        type: Sequelize.STRING
      },
      released_year: {
        type: Sequelize.INTEGER
      },
      cover_url: {
        type: Sequelize.STRING
      },
      restriction_age: {
        type: Sequelize.INTEGER
      },
      price_perday: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VinnylMusics');
  }
};