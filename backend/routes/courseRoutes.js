/* const verifyToken = require("../middlewares/auth") */
const courseController = require("../Controller/courseController");

const router = require("express").Router();

router.get("/all-courses", courseController.getAllCourses);
router.get("/:id", courseController.getCourse)
/* router.post("/getCourse", verifyToken, courseController.wantTheCourse) */
module.exports = router;