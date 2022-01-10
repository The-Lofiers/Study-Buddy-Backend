'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.User, {
        foreignKey: 'user_ID',
      });
      Class.hasMany(models.ToDo, {
        foreignKey: 'toDo_ID',
        onDelete: 'CASCADE',
      });
      Class.hasOne(models.GradeCalc, {
        foreignKey: 'grade_ID',
        onDelete: 'CASCADE',
      });
      Class.hasMany(models.Notes, {
        foreignKey: 'notes_ID',
        onDelete: 'CASCADE',
      });
    }
  };
  Class.init({
    className: DataTypes.STRING,
    todo_ID: DataTypes.INTEGER,
    notes_ID: DataTypes.INTEGER,
    grade_ID: DataTypes.INTEGER,
    user_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'class',
  });
  return Class;
};