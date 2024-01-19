const ObjectId = require("bson").ObjectId;
const Courses = require("../Model/courseModel");
const Login = require("../Model/loginModel");
const fs = require("node:fs")



const getAllCourses = async (req, res) => {
  try {
    //Para hacer consultas con paginacion => const data = await Courses.find().skip(0).limit(5);
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

const getAllCoursesTrue = async (req, res) => {
  try {
    //Para hacer consultas con paginacion => const data = await Courses.find().skip(0).limit(5);
    const data = await Courses.find({ visible: true });
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
    if (!data) {
      res.status(200).json({ status: "ko", data: null, error });
    } else {
      res.status(200).json({ status: "ok", data, error: null });
    }
  } catch (error) {
    res.status(400).json({
      status: "ko",
      data: null,
      error: error.message,
    });
  }
};

const getUserCourse = async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await Courses.findById(
      req.params.id,
    );
    if (!data) {
      res.status(200).json({ status: "ko", data: null, error });
    } else {
      res.status(200).json({ status: "ok", data, error: null });
    }
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
    const { title, slug, shortDescription, info, level, quantityHours, visible, subject } = req.body;

    const newCourse = new Courses({
      title,
      slug,
      shortDescription,
      info,
      image: req.body.image, // Accede al archivo cargado a través de req.file
      level,
      quantityHours,
      visible,
      subject
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

const getCourseEdit = async (req, res) => {
  try {
    const data = await Courses.find({
      _id: req.params.id,
    });
    if (!data) {
      res.status(200).json({ status: "ko", data: null, error });
    } else {
      res.status(200).json({ status: "ok", data, error: null });
    }
  } catch (error) {
    res.status(400).json({
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
    if (res.status === 200) {
      try {

      } catch (error) {

      }
    }
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



module.exports = { getAllCourses , getAllCoursesTrue, getCourse, getUserCourse, postCourse, getCourseEdit, patchCourse, deleteCourse, saveImage };
