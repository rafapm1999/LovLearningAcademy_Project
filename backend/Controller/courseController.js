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
    }

module.exports = {getAllCourses}