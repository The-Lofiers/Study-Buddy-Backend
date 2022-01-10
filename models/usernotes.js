'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserNotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserNotes.init({
    notes_ID: DataTypes.INTEGER,
    url: DataTypes.STRING,
    docName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserNotes',
  });
  return UserNotes;
};