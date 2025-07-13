const { Submission, User } = require('../../models');

class SubmissionRepository {
  constructor() {
    this.Submission = Submission;
    this.User = User;
  }

  async create(data) {
    return await this.Submission.create(data);
  }

  async findByAssignmentAndStudent(assignmentId, studentId) {
    return await this.Submission.findOne({
      where: { assignmentId, studentId }
    });
  }

  async findByAssignmentId(assignmentId) {
    return await this.Submission.findAll({
      where: { assignmentId },
      include: [
        {
          model: this.User,
          as: 'student',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['submittedAt', 'DESC']]
    });
  }
  async findById(id) {
  return await Submission.findByPk(id);
}
async updateGrade(id, data) {
    return await Submission.update(data, { where: { id } });
  }

}

module.exports = SubmissionRepository;
