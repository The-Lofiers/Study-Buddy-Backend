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