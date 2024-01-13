const {verifyToken} = require("../middlewares/auth")
const courseController = require("../Controller/courseController");

const multer = require("multer");
const fs = require("node:fs")
const upload = multer({ dest: '../frontend/public/uploads/' });

const router = require("express").Router();

router.get("/all-courses", courseController.getAllCourses);
router.get("/:slug", courseController.getCourse);
router.get("/mycourses/:id", courseController.getUserCourse);
router.post("/create-course", verifyToken, courseController.postCourse);
router.post("/save-image", upload.single('file'), courseController.saveImage);
router.patch("/edit/:id", verifyToken, courseController.patchCourse);
router.delete("/delete/:id", verifyToken, courseController.deleteCourse);
module.exports = router;