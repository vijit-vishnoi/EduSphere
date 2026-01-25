'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      Submission.belongsTo(models.Assignment, {
        foreignKey: 'assignmentId',
        as: 'assignment'
      });

      Submission.belongsTo(models.User, {
        foreignKey: 'studentId',
        as: 'student'
      });
    }
  }

  Submission.init({
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Submission',
  });

  return Submission;
};
