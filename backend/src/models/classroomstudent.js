'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassroomStudent extends Model {
    
    static associate(models) {
    }
  }
  ClassroomStudent.init({
    studentId: DataTypes.INTEGER,
    classroomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClassroomStudent',
  });
  return ClassroomStudent;
};