/* const verifyToken = require("../middlewares/auth") */
const uploadFile = require("../middlewares/uploadFile")
const courseController = require("../Controller/courseController");

const router = require("express").Router();

router.get("/all-courses", courseController.getAllCourses);
router.get("/:id", courseController.getCourse)
router.post("/create-course", courseController.postCourse)
router.patch("/edit/:id", courseController.patchCourse)
router.delete("/delete/:id", courseController.deleteCourse)
module.exports = router;