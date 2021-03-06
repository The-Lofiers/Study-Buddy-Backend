"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToDo.belongsTo(models.class, {
        foreignKey: "class_ID",
        onDelete: "CASCADE",
      });
    }
  }
  ToDo.init(
    {
      todo: DataTypes.STRING,
      class_ID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ToDo",
    }
  );
  return ToDo;
};
