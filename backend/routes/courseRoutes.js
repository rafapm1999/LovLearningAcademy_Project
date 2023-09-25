const verifyToken = require("../middlewares/auth")
const courseController = require("../Controller/courseController");

const router = require("express").Router();

router.get("/all-courses", courseController.getAllCourses);
router.get("/:id", courseController.getCourse)
router.post("/create-course", verifyToken, courseController.postCourse)
router.patch("/edit/:id", verifyToken, courseController.patchCourse)
router.delete("/delete/:id", verifyToken, courseController.deleteCourse)
module.exports = router;