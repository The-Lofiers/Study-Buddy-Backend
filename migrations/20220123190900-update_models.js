"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "classes_ID", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn("classes", "user_ID");

    await queryInterface.addColumn("classes", "classes_ID", {
      type: Sequelize.INTEGER,
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
