'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GradeCalcs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assignment: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.INTEGER
      },
      inputGrade: {
        type: Sequelize.INTEGER
      },
      average: {
        type: Sequelize.INTEGER
      },
      class_ID: {
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
    await queryInterface.dropTable('GradeCalcs');
  }
};