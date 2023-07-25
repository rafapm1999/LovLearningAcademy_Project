const courseController = require("../Controller/courseController");

const router = require("express").Router();

router.get("/all-courses", courseController.getAllCourses);

module.exports = router;