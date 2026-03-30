const commentService = require('../services/comment-service');

const createComment = async (req, res) => {
  try {
    const { content, assignmentId } = req.body;
    const userId = req.user.id; 

    if (!content || !assignmentId) {
      return res.status(400).json({ error: 'Missing content or assignmentId' });
    }

    const comment = await commentService.createComment({ content, userId, assignmentId });
    res.status(201).json(comment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCommentsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    const offset = (page - 1) * limit;

    const comments = await commentService.getCommentsForAssignment(assignmentId, limit, offset);
    const response = { currentPage: page };
    if (limit !== null) {
      const totalCount = await commentService.countCommentsForAssignment(assignmentId);
      response.totalPages = Math.ceil(totalCount / limit);
    } else {
      response.totalPages = null;
    }

    response.comments = comments;
    res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

module.exports = {
  createComment,
  getCommentsByAssignment
};
