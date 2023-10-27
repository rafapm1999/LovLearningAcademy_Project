const ObjectId = require("bson").ObjectId;
const Courses = require("../Model/courseModel");
const Login = require("../Model/loginModel");

const getAllCourses = async (req, res) => {
  try {
    const data = await Courses.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};
const getCourse = async (req, res) => {
  try {
    const data = await Courses.findById(req.params.id);
    res.status(200).json({ status: "Has llegado aqui", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "no ha salido bien",
      data: null,
      error: error.message,
    });
  }
};

const postCourse = async (req, res) => {
  try {
    const { title, info, level, quantityHours } = req.body;

    const newCourse = new Courses({
      title,
      info,
      image: req.body.image, // Accede al archivo cargado a través de req.file
      level,
      quantityHours,
    });

    const course = await newCourse.save();

    res.status(201).json({
      status: "succeeded",
      data: course,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
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
    res.status(200).json({ status: "Has llegado status 200 de patchCourse", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "no ha salido bien patchCourse",
      data: null,
      error: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const data = await Courses.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Has llegado status 200 de deleteCourse", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "no ha salido bien deleteCourse",
      data: null,
      error: error.message,
    });
  }
};


module.exports = { getAllCourses, getCourse, postCourse, patchCourse, deleteCourse };
