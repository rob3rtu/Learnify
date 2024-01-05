"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasOne(models.Teacher);
      models.User.hasMany(models.Message);
      models.User.hasMany(models.Like);
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "teacher", "student"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
