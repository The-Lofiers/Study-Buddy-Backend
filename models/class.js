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
      Class.belongsTo(models.userClass,
        {
          // if user is deleted, delete all userClasses associated with user
          onDelete: "CASCADE",
          foreignKey: {
            name: 'class_ID',
            allowNull: false
          }
        });
      Class.hasOne(models.gradeCalculator,
        {
          // if class is deleted, delete all gradeCalculators associated with class
          onDelete: "CASCADE",
          foreignKey: {
            name: 'grade_ID',
            allowNull: false

          }
        });
      Class.hasMany(models.toDo,
        {
          // if class is deleted, delete all toDos associated with class
          onDelete: "CASCADE",
          foreignKey: {
            name: 'todo_ID',
            allowNull: false
          }
        });
      Class.hasMany(models.notes,
        {
          // if class is deleted, delete all notes associated with class
          onDelete: "CASCADE",
          foreignKey: {
            name: 'notes_ID',
            allowNull: false
          }
        });
    }
  };
  Class.init({
    class_ID: {
      type: DataTypes.INTEGER,
      // references user to id
      references: {
        model: 'userClass',
        key: 'id',
      }
    },
    className: DataTypes.STRING,
    todo_ID: {
      type: DataTypes.INTEGER,
      // references todo to id
      references: {
        model: 'toDo',
        key: 'id',
      }
    },
    notes_ID: {
      type: DataTypes.INTEGER,
      // references notes to id
      references: {
        model: 'notes',
        key: 'id',
      }
    },
    grade_ID: {
      type: DataTypes.INTEGER,
      // references gradeCalculator to id
      references: {
        model: 'gradeCalculator',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};