"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClassTeachers extends Model {
    static associate(models) {}
  }
  ClassTeachers.init(
    {
      classId: DataTypes.UUID,
      teacherId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "ClassTeachers",
    }
  );
  return ClassTeachers;
};
