"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      models.Teacher.belongsTo(models.User, {
        foreignKey: "userId",
      });
      models.Teacher.belongsToMany(models.Class, { through: "ClassTeachers" });
    }
  }
  Teacher.init(
    {
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );
  return Teacher;
};
