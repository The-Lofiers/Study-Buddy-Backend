'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // one to many relationship, class can have many notes
      notes.belongsTo(models.Class,
        {
          // if class is deleted, delete all notes associated with class
          // WONT DELETE FROM GOOGLE DRIVE ONLY DB !
          onDelete: "CASCADE",
          foreignKey: {
            name: 'class_ID',
            allowNull: false
          }
        });
    }
  };
  notes.init({
    class_ID: {
      type: DataTypes.INTEGER,
      // references class to id
      references: {
        model: 'Class',
        key: 'id',
      }
    },
    notes_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};