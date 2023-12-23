"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Classes", "id", {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
      unique: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Classes", "id", {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
    });
  },
};
