const { Assignment } = require('../../models');

const createAssignment = async (data) => {
  return Assignment.create(data);
};

const getAssignmentsByClassroom = async (classroomId) => {
  return Assignment.findAll({
    where: { classroomId },
    order: [['dueDate', 'ASC']],
  });
};
const getAssignmentById = async (id) => {
  return Assignment.findByPk(id);
};

module.exports = {
  createAssignment,
  getAssignmentsByClassroom,
  getAssignmentById,
};
