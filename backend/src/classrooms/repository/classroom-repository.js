// src/repository/classroom-repository.js
const { Classroom, User, Assignment, ClassroomStudent } = require('../../models');

class ClassroomRepository {
  async create(data) {
    return await Classroom.create(data);
  }

  async findByCode(code) {
    return await Classroom.findOne({ where: { code } });
  }

  async hasStudentJoined(classroomId, studentId) {
    return await ClassroomStudent.findOne({ where: { classroomId, studentId } });
  }

  async addStudentToClassroom(classroomId, studentId) {
    return await ClassroomStudent.create({ classroomId, studentId });
  }

  async removeStudentFromClassroom(classroomId, studentId) {
    return await ClassroomStudent.destroy({ where: { classroomId, studentId } });
  }

  async findById(id) {
    return await Classroom.findByPk(id);
  }

  async findAllByTeacherId(teacherId) {
    return await Classroom.findAll({
      where: { teacherId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'students',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: Assignment,
          as: 'assignments',
          attributes: ['id']
        }
      ]
    });
  }

  async findAllByStudentId(studentId) {
    return await User.findByPk(studentId, {
      include: {
        model: Classroom,
        as: 'joinedClassrooms',
        through: { attributes: [] },
        include: [
          { model: User, as: 'classTeacher', attributes: ['id', 'name'] },
          { model: User, as: 'students', attributes: ['id', 'name'], through: { attributes: [] } }
        ]
      }
    });
  }
}

module.exports = ClassroomRepository;
