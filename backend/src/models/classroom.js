'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    static associate(models) {
      Classroom.belongsTo(models.User, {
        foreignKey: 'teacherId',
        as: 'classTeacher',
      });

      Classroom.belongsToMany(models.User, {
        through: models.ClassroomStudent,
        foreignKey: 'classroomId',
        otherKey: 'studentId',
        as: 'students',
      });

      Classroom.hasMany(models.Assignment, {
        foreignKey: 'classroomId',
        as: 'assignments',
      });
    }
  }

  Classroom.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,      
        allowNull: true,
      },

      allowJoinWithCode: {
        type: DataTypes.BOOLEAN,  
        defaultValue: true,
      },

      code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Classroom',
    }
  );

  return Classroom;
};
