const assignmentRepo = require('../repository/assignment-repository');

const createAssignment = async (body, teacherId) => {
  const data = {
    title: body.title,
    description: body.description,
    dueDate: body.dueDate,
    classroomId: body.classroomId,
    teacherId,
    points: body.points,
    allowLateSubmissions: body.allowLateSubmissions,
    requireTextSubmission: body.requireTextSubmission,
    requireFileUpload: body.requireFileUpload,
  };

  return assignmentRepo.createAssignment(data);
};

const getAssignmentsByClassroom = async (classroomId) => {
  return assignmentRepo.getAssignmentsByClassroom(classroomId);
};
const getAssignmentById = async (assignmentId) => {
  return assignmentRepo.getAssignmentById(assignmentId);
};

module.exports = {
  createAssignment,
  getAssignmentsByClassroom,
  getAssignmentById
};
