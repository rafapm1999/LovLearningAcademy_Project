const courseController = require("../Controller/courseController");

const router = require("express").Router();

router.get("/all-courses", courseController.getAllCourses);
router.get("/:id", courseController.getCourse)

module.exports = router;