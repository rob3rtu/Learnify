"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.Post, {
        foreignKey: "postId",
      });
      models.Like.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Like.init(
    {
      postId: DataTypes.UUID,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
