"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      models.Class.hasOne(models.Forum, { foreignKey: "classId" });
      models.Class.belongstoMany(models.Teacher, { through: "ClassTeachers" });
      models.Class.hasMeny(models.Post);
    }
  }
  Class.init(
    {
      longName: DataTypes.STRING,
      shortName: DataTypes.STRING,
      year: DataTypes.INTEGER,
      semester: DataTypes.INTEGER,
      domain: DataTypes.ENUM("info", "mate", "cti"),
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
