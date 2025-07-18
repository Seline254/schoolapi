const express = require("express");
const router = express.Router();
const assignmentController = require("../controller/assignmentController");
const { auth, authorizeRoles } = require("../middleware/auth");


router.get("/",auth,assignmentController.getAllAssignments);
router.get("/:id",auth,assignmentController.getAssignmentById);
router.post("/",auth,authorizeRoles('teacher'),assignmentController.addAssignment);
router.put("/:id",auth,assignmentController.updateAssignment);
router.delete("/:id",auth,authorizeRoles("teacher"),assignmentController.deleteAssignment);
module.exports = router;
