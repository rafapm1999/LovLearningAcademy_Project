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
/* const wantTheCourse = async (req, res) => {
  try {
    const data = await Login.findById(req.user._id);
    res.status(200).json({ status: "Estas Logeado", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "No estas Logeado",
      data: null,
      error: error.message,
    });
  } */
  
/* }; */

module.exports = { getAllCourses, getCourse, /* wantTheCourse */ };
