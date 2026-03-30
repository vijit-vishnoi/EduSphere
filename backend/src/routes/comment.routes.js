const express = require('express');
const router = express.Router();
const commentController = require('../comments/controllers/comment-controllers');
const {protect} = require('../middleware/authMiddleware');

router.post('/', protect, commentController.createComment);

router.get('/:assignmentId', protect, commentController.getCommentsByAssignment);

module.exports = router;
