const express = require('express')
const router = express.Router()
const teacherController = require("../controller/teacherController")
const {auth,authorizeRoles} = require("../middleware/auth")

router.post("/",auth,authorizeRoles("admin"),teacherController.addTeacher)
router.get("/",auth,teacherController.getAllTeachers)
router.get("/:id",auth,teacherController.getSingleTeacher)
router.get("/classes/:id",auth,authorizeRoles("admin","teacher"),teacherController.getMyClasses)
router.delete("/:id",auth,authorizeRoles("admin"),teacherController.deleteTeacher)
router.put("/:id",auth,authorizeRoles("admin","teacher"),teacherController.updateSingleTeacher)
module.exports = router
