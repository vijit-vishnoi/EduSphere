const express = require("express");
const router = express.Router();
const controller = require("../submission/controller/submission-controller");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post(
  "/",
  protect,
  authorizeRoles("student"),
  upload.single("file"),
  controller.submitAssignment
);

router.get(
  "/:assignmentId/mine",
  protect,
  authorizeRoles("student"),
  controller.getMySubmission
);

module.exports = router;
