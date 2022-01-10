'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GradeCalc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GradeCalc.belongsTo(models.Class, {
        foreignKey: 'class_ID',
      });
    }
  };
  GradeCalc.init({
    assignment: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    inputGrade: DataTypes.INTEGER,
    average: DataTypes.INTEGER,
    class_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GradeCalc',
  });
  return GradeCalc;
};