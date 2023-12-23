"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    static associate(models) {
      models.Forum.belongsTo(models.Class, {
        foreignKey: "classId",
      });
      models.Forum.hasMany(models.Message);
    }
  }
  Forum.init(
    {
      classId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Forum",
    }
  );
  return Forum;
};
