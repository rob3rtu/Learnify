"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Forums", "classId", {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: "Classes",
        },
        key: "id",
      },
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Forums", "classId", {
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: "Classes",
        },
        key: "id",
      },
    });
  },
};
