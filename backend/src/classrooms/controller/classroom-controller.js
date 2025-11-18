// src/controllers/classroom-controller.js
const ClassroomService = require('../services/classroom-service');
const classroomService = new ClassroomService();
const { User, Classroom, Assignment } = require('../../models');

// -----------------------------------------
// CREATE CLASSROOM
// -----------------------------------------
exports.createClassroom = async (req, res) => {
  try {
    if (req.user.role !== 'teacher')
      return res.status(403).json({ error: 'Only teachers can create classrooms' });

    const { name, description, allowJoinWithCode } = req.body;

    const classroom = await classroomService.createClassroom({
      name,
      description,
      allowJoinWithCode,
      teacherId: req.user.id
    });

    res.status(201).json({ message: 'Classroom created', classroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------
// JOIN CLASSROOM
// -----------------------------------------
exports.joinClassroom = async (req, res) => {
  try {
    const classroom = await classroomService.joinClassroom({
      code: req.body.code,
      studentId: req.user.id
    });

    res.status(200).json({ message: 'Joined classroom', classroom });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// -----------------------------------------
// GET MY CLASSROOMS
// -----------------------------------------
exports.getMyClassrooms = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let classrooms = [];

    // TEACHER VIEW
    if (role === 'teacher') {
      const teacherClasses = await Classroom.findAll({
        where: { teacherId: userId },
        order: [['createdAt', 'DESC']],
        include: [
          { model: User, as: 'students', attributes: ['id'], through: { attributes: [] } },
          { model: Assignment, as: 'assignments', attributes: ['id'] }
        ]
      });

      classrooms = teacherClasses.map(cls => ({
        id: cls.id,
        name: cls.name,
        code: cls.code,
        description: cls.description,
        studentCount: cls.students.length,
        assignmentsCount: cls.assignments.length,
        createdAt: cls.createdAt
      }));
    }

    // STUDENT VIEW
    if (role === 'student') {
      const student = await User.findByPk(userId, {
        include: {
          model: Classroom,
          as: 'joinedClassrooms',
          through: { attributes: [] },
          include: [
            { model: User, as: 'classTeacher', attributes: ['id', 'name'] },
            { model: User, as: 'students', attributes: ['id'], through: { attributes: [] } }
          ]
        }
      });

      classrooms = student.joinedClassrooms.map(cls => ({
        id: cls.id,
        name: cls.name,
        code: cls.code,
        description: cls.description,
        teacherName: cls.classTeacher?.name,
        studentCount: cls.students.length
      }));
    }

    res.status(200).json({ classrooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// -----------------------------------------
// GET CLASSROOM DETAILS
// -----------------------------------------
exports.getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findByPk(req.params.id, {
      include: [
        { model: User, as: 'classTeacher', attributes: ['id', 'name'] },
        { model: User, as: 'students', attributes: ['id', 'name'], through: { attributes: [] } }
      ]
    });

    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

    res.json({ classroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------
// REMOVE STUDENT
// -----------------------------------------
exports.removeStudentFromClassroom = async (req, res) => {
  try {
    if (req.user.role !== 'teacher')
      return res.status(403).json({ error: 'Only teachers can remove students' });

    const classroom = await Classroom.findOne({
      where: { id: req.params.id, teacherId: req.user.id }
    });

    if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

    await classroom.removeStudent(req.params.studentId);

    res.json({ message: 'Student removed' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// -----------------------------------------
// LEAVE CLASSROOM
// -----------------------------------------
exports.leaveClassroom = async (req, res) => {
  try {
    const result = await classroomService.leaveClassroom({
      classroomId: req.body.classroomId,
      studentId: req.user.id
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
