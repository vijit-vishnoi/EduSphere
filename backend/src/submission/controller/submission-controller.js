const SubmissionService = require('../service/submission-serivce');
const submissionService = new SubmissionService();

const submitAssignment = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { assignmentId, content } = req.body;

    const fileUrl = req.file
      ? `/uploads/submissions/${req.file.filename}`
      : null;

    const submission = await submissionService.submitAssignment({
      assignmentId,
      studentId,
      content,
      fileUrl,
    });

    return res.status(201).json({ submission });
  } catch (err) {
    console.error("Submission error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMySubmission = async (req, res) => {
  try {
    const studentId = req.user.id;
    const assignmentId = req.params.assignmentId;

    const submission = await submissionService.getMySubmission({ assignmentId, studentId });

    if (!submission) {
      return res.status(404).json({ message: 'No submission found' });
    }

    res.status(200).json({ submission });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllSubmissionsForAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const teacherId = req.user.id;

    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can view all submissions' });
    }

    const submissions = await submissionService.getSubmissionsForAssignment(assignmentId, teacherId);
    res.status(200).json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(400).json({ error: err.message });
  }
};


const gradeSubmission = async (req, res) => {
  try {
    console.log("📥 GRADE REQUEST HIT");
    console.log("👉 Params:", req.params);
    console.log("👉 Body:", req.body);
    console.log("👉 Teacher ID:", req.user.id);
    const teacherId = req.user.id;
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;

    const updated = await submissionService.gradeSubmission({
      submissionId,
      teacherId,
      grade,
      feedback,
    });

    return res.status(200).json({
      message: 'Submission graded successfully',
      submission: updated,
    });
  } catch (err) {
    console.error('Grade error:', err);
    return res.status(400).json({ error: err.message });
  }
};


module.exports = {
  submitAssignment,
  getMySubmission,
  getAllSubmissionsForAssignment,
  gradeSubmission
};
