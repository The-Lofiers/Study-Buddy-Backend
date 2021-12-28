'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gradeCalculator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongs to Class 
      gradeCalculator.belongsTo(models.Class,
        {
          // if class is deleted, delete all gradeCalculators associated with class
          onDelete: "CASCADE",
          foreignKey: {
            name: 'class_ID',
            allowNull: false
          }
        });
    }
  };
  gradeCalculator.init({
    assignment: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    inputGrade: DataTypes.INTEGER,
    average: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gradeCalculator',
  });
  return gradeCalculator;
};