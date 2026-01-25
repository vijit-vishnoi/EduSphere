const { Assignment, Classroom } = require('../../models');
const assignmentService = require('../services/assignment-service');

const createAssignment = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const assignment = await assignmentService.createAssignment(req.body, teacherId);

    return res.status(201).json({ assignment });
  } catch (err) {
    console.error('Error creating assignment:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAssignmentsByClassroom = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;

    const assignments = await assignmentService.getAssignmentsByClassroom(classroomId);

    return res.status(200).json({ assignments });
  } catch (err) {
    console.error('Error fetching assignments:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const getAssignmentById = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    const assignment = await assignmentService.getAssignmentById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json({ assignment });
  } catch (err) {
    console.error("Error fetching assignment:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};




module.exports = { createAssignment, getAssignmentsByClassroom,getAssignmentById };
