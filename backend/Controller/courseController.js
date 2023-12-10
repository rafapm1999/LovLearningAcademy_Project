const ObjectId = require("bson").ObjectId;
const Courses = require("../Model/courseModel");
const Login = require("../Model/loginModel");
const fs = require("node:fs")



const getAllCourses = async (req, res) => {
  try {
    const data = await Courses.find();
    res.status(200).json({ status: "ok", data, error: null });
  } catch (error) {
    res.status(400).json({
      status: "ko",
      data: null,
      error: error.message,
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const data = await Courses.find({
      slug: req.params.slug,
    });
    res.status(200).json({ status: "ok", data, error: null });
  } catch (error) {
    res.status(400).json({
      status: "ko",
      data: null,
      error: error.message,
    });
  }
};

const postCourse = async (req, res) => {
  try {
    const { title, slug, shortDescription, info, level, quantityHours } = req.body;

    const newCourse = new Courses({
      title,
      slug,
      shortDescription,
      info,
      image: req.body.image, // Accede al archivo cargado a través de req.file
      level,
      quantityHours,
    });

    const course = await newCourse.save();

    res.status(201).json({
      status: "ok",
      data: course,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "ko",
      data: null,
      error: error.message,
    });
  }
};

const patchCourse = async (req, res) => {
  try {
    const data = await Courses.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true });
    res.status(200).json({ status: "ok", data, error: null });
  } catch (error) {
    res.status(400).json({
      status: "ko",
      data: null,
      error: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const data = await Courses.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ok", data, error: null });
  } catch (error) {
    res.status(400).json({
      status: "ko",
      data: null,
      error: error.message,
    });
  }
};

const saveImage = (req, res) => {
  function saveCourseImage(file) {
    const newPath = `../frontend/public/uploads/${file.originalname}`
    fs.renameSync(file.path, newPath)
    return newPath;
  }
  try {
    console.log(req.file);
    saveCourseImage(req.file)
  } catch (error) {
    res.status(400).json({
      status: "ko",
      data: null,
      error: error.message,
    });
  }
};



module.exports = { getAllCourses, getCourse, postCourse, patchCourse, deleteCourse, saveImage };
