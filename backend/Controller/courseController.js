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
    //1. Obtenemos los datos del cliente que nos hacen falta
    const { title, info, image, level, quantityHours } = req.body;
    //2. Creamos el curso (Información que tendra nuestra base de datos)
    const newCourse = new Courses({
      title,
      info,
      image,
      level,
      quantityHours
    });
    //3. Guardamos en la base de datos al nuevo curso
    const course = await newCourse.save();

    //Enviamos respuesta de que todo se ha realizado correctamente
    res.status(201).json({
      status: "succeeded",
      data: "User create!",
      error: null,
    });
  } catch (error) {
    
  }
};

const patchCourse = async (req, res) => {
  try {
    const data = await Courses.findById(req.params.id);
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
