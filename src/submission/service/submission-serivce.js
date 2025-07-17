const SubmissionRepository = require('../repository/submission-repository');
const { Assignment } = require('../../models');
const { Submission } = require('../../models');


class SubmissionService {
  constructor() {
    this.submissionRepository = new SubmissionRepository();
  }

  async submitAssignment({ assignmentId, studentId, content }) {
    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) throw new Error('Assignment not found');

    const alreadySubmitted = await this.submissionRepository.findByAssignmentAndStudent(
      assignmentId,
      studentId
    );
    if (alreadySubmitted) throw new Error('You have already submitted this assignment');

    const submission = await this.submissionRepository.create({
      assignmentId,
      studentId,
      content,
      submittedAt: new Date(),
    });

    return submission;
  }
   async getMySubmission({ assignmentId, studentId }) {
  const submission = await Submission.findOne({
    where: {
      assignmentId,
      studentId,
    },
    attributes: ['id', 'content', 'grade', 'feedback', 'createdAt'],
  });

  return submission;
}

  async getSubmissionsForAssignment(assignmentId, teacherId) {
    
  const assignment = await Assignment.findByPk(assignmentId);
  if (!assignment) throw new Error('Assignment not found');

  if (assignment.teacherId !== teacherId) {
    throw new Error('You are not authorized to view submissions for this assignment');
  }

  return await this.submissionRepository.findByAssignmentId(assignmentId);
}

    async gradeSubmission({ submissionId, teacherId, grade, feedback,assignmentId }) {
    try {
      const submission = await this.submissionRepository.findById(submissionId);
      const assignment = await Assignment.findByPk(assignmentId);
      if (!assignment) throw new Error('Assignment not found');

      if (!submission) throw new Error('Submission not found');
      if (assignment.teacherId !== teacherId) {
        throw new Error('You are not authorized to grade this submission');
      }

      return await this.submissionRepository.updateGrade(submissionId, {
        grade,
        feedback,
      });
    } catch (err) {
      console.error('Error grading submission:', err);
      throw err; 
    }
  }


}

module.exports = SubmissionService;
