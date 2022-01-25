"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersClasses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      UsersClasses.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  UsersClasses.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersClasses",
    }
  );
  return UsersClasses;
};
