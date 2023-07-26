const ObjectId = require("bson").ObjectId;
const Courses = require("../Model/courseModel");

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




















  /* Courses.findById(req.params.courseID)
    .exec()
    .then((data) => {
      res.status(200).json({
        status: "Has llegado aqui",
        data,
        error: null,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "NO ha salido",
        data: null,
        error: err.message,
      })
    }) */
};

module.exports = { getAllCourses, getCourse };
