// src/services/classroom-service.js
const { User } = require('../../models');
const nanoid = async () => (await import('nanoid')).nanoid;
const ClassroomRepository = require('../repository/classroom-repository');

class ClassroomService {
  constructor() {
    this.repo = new ClassroomRepository();
  }

  async createClassroom({ name, description, allowJoinWithCode, teacherId }) {
    const teacher = await User.findByPk(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      throw new Error('Only teachers can create classrooms');
    }

    const code = (await nanoid())(6);

    return await this.repo.create({
      name,
      description,
      allowJoinWithCode,
      code,
      teacherId
    });
  }

  async joinClassroom({ studentId, code }) {
    const classroom = await this.repo.findByCode(code);
    if (!classroom) throw new Error('Invalid classroom code');

    if (!classroom.allowJoinWithCode)
      throw new Error('Joining with code is disabled');

    const exists = await this.repo.hasStudentJoined(classroom.id, studentId);
    if (exists) throw new Error('Already joined');

    await this.repo.addStudentToClassroom(classroom.id, studentId);

    return classroom;
  }

  async leaveClassroom({ classroomId, studentId }) {
    const classroom = await this.repo.findById(classroomId);
    if (!classroom) throw new Error('Classroom not found');

    const removed = await this.repo.removeStudentFromClassroom(classroomId, studentId);
    if (!removed) throw new Error('Not enrolled');

    return { message: 'Left classroom successfully' };
  }
}

module.exports = ClassroomService;
