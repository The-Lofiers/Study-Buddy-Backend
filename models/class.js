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
    todo_ID: DataTypes.INTEGER,
    notes_ID: DataTypes.INTEGER,
    grades_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};