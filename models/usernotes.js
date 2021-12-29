'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usernotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // one to one relationship, notes can have one usernotes
      usernotes.belongsTo(models.notes,
        {
          // if notes is deleted, delete all usernotes associated with notes
          onDelete: "CASCADE",
          foreignKey: {
            name: 'notes_ID',
            allowNull: false
          }
        });
    }
  };
  usernotes.init({
    notes_ID: {
      type: DataTypes.INTEGER,
      // references notes to id
      references: {
        model: 'notes',
        key: 'id',
      }
    },
    url: DataTypes.STRING,
    docName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usernotes',
  });
  return usernotes;
};