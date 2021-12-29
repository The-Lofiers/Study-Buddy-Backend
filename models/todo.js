'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // one to many relationship, class can have many todos
      toDo.belongsTo(models.Class,
        {
          // if class is deleted, delete all todos associated with class
          onDelete: "CASCADE",
          foreignKey: {
            name: 'class_ID',
            allowNull: false
          }
        });
    }
  };
  toDo.init({
    class_ID: {
      type: DataTypes.INTEGER,
      // references class to id
      references: {
        model: 'Class',
        key: 'id',
      }
    },
    todo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'toDo',
  });
  return toDo;
};