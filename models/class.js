"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.UsersClasses, {
        foreignKey: "classes_ID",
        onDelete: "CASCADE",
      });
    }
  }
  Class.init(
    {
      className: DataTypes.STRING,
      classes_ID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "class",
    }
  );
  return Class;
};
