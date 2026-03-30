'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    });

    Comment.belongsTo(models.Assignment, {
      foreignKey: 'assignmentId',
      as: 'assignment'
    });
  };

  return Comment;
};
