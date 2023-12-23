"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.Post);
      models.Comment.belongsTo(models.User);
    }
  }
  Comment.init(
    {
      postId: DataTypes.UUID,
      userId: DataTypes.UUID,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
