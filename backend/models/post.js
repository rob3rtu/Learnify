"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.hasMany(models.Comment);
      models.Post.hasMany(models.Like);
      models.Post.hasMany(models.Comment);
    }
  }
  Post.init(
    {
      classId: DataTypes.UUID,
      userId: DataTypes.UUID,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      resourceType: DataTypes.ENUM("link", "document"),
      resourceUrl: DataTypes.STRING,
      classSection: DataTypes.ENUM(
        "materials",
        "courses",
        "seminars",
        "laboratory"
      ),
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
