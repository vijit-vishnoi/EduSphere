const { Comment, User } = require('../../models');

class CommentService {
  async createComment({ content, userId, assignmentId }) {
    return await Comment.create({ content, userId, assignmentId });
  }

async getCommentsForAssignment(assignmentId, limit, offset) {
    const options = {
      where: { assignmentId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email', 'role']
        }
      ],
      order: [['createdAt', 'ASC']]
    };

    if (limit !== null && offset !== null) {
      options.limit = limit;
      options.offset = offset;
    }

    return await Comment.findAll(options);
  }

  async countCommentsForAssignment(assignmentId) {
    return await Comment.count({ where: { assignmentId } });
  }
}

module.exports = new CommentService(); 
