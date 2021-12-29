'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userClass.belongsTo(models.User,
        {
          // if user is deleted, delete all userClasses associated with user
          onDelete: "CASCADE",
          foreignKey: {
            name: 'user_ID',
            allowNull: false
          }
        });
      userClass.hasMany(models.Class,
        {
          // if class is deleted, delete all userClasses associated with class
          onDelete: "CASCADE",
          foreignKey: {
            name: 'class_ID',
            allowNull: false
          }
        });
    }
  };

  userClass.init({
    user_id: {
      type: DataTypes.INTEGER,
      // references user to id
      references: {
        model: 'User',
        key: 'id',
      }
    },

    class_id: {
      type: DataTypes.INTEGER,
      // references class to id
      references: {
        model: 'Class',
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'userClass',
  });
  return userClass;
};