//Importamos bcrypt para encriptar la contraseña antes de ser guardada en la base de datos
const bcrypt = require("bcrypt");
//Importamos el esquema de validación
const Login = require("../Model/loginModel");
//Importamos fecha
const { getRegisterAt, generateToken } = require("../lib/utils");

//POST => /auth/signup

const signup = async (req, res) => {
  try {
    //1. Obtenemos los datos del cliente que nos hacen falta
    const { name, lastName, email, password } = req.body;
    //2. Encriptamos la contraseña recibida
    const passwordHash = await bcrypt.hash(password, 10);
    //3. Obtenemos la fecha de registro
    const registerAt = getRegisterAt();
    const role = "user";
    const courses = [];
    //4. Creamos el usuario (Información que tendra nuestra base de datos)
    const newUser = new Login({
      name,
      lastName,
      email,
      password: passwordHash,
      role,
      registerAt,
      courses
    });
    //5. Guardamos en la base de datos al nuevo ususario
    const user = await newUser.save();
    //6. Generamos el token de seguridad incluyendo datos del usuario
    const payload = { id: user._id, email: user.email, role: user.role };
    //Generamos un token con los datos del payload
    const token = generateToken(payload, false);

    //Enviamos respuesta de que todo se ha realizado correctamente
    res.status(201).json({
      status: "succeeded",
      data: "User create!",
      error: null,
    });
  } catch (error) {
    //Si el error.code es 11000, enviamos un error de usuario duplicado (ya existe en la base de datos)
    if (error.code === 11000) {
      res.status(409).json({
        status: "failed",
        data: null,
        error:
          "The email is already registered. Please, try with another email.",
      });
    } else {
      //Si es otro error enviamos un mensaje general con error.message
      res.status(400).json({
        status: "failed",
        data: null,
        error: error.message,
      });
    }
  }
};

//POST => /auth/login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({ email });
    !user &&
      res.status(400).json({
        status: "failed",
        data: null,
        error: "Wrong email or password. Try again.",
      });
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword &&
      res.status(400).json({
        status: "failed",
        data: null,
        error: "Wrong email or password",
      });
    //Si la contraseña es correcta, generar el token
    const payload = { id: user._id, email: user.email, role: user.role };
    //Generamos un token con los datos del payload
    const token = generateToken(payload, false);

    res.status(200).json({
      status: "succeded",
      data: {
        user,
        token,
      },
      error: null,
    });
  } catch (error) {
    /* res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    }); */
  }
};
//PATCH 
const update = async (req, res) => {
  try {
    const data = await Login.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ status: "update course", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "no ha salido bien",
      data: null,
      error: error.message,
    });
  }
};
//GET
const getuser = async (req, res) => {
  try {
    const data = await Login.findById(
      req.params.id
    );
    res.status(200).json({ status: "getuser realizado", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "no ha salido bien",
      data: null,
      error: error.message,
    });
  }
};
//GET
const alluser = async (req, res) => {
  try {
    const data = await Login.find();
    res.status(200).json({ status: "alluser realizado", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "no ha salido bien",
      data: null,
      error: error.message,
    });
  }
};
//DELETE => Borrar cursos de users concretos

const deleteusercourse = async (req, res) => {
  try {
    // Obtén el ID del usuario de la solicitud
    const userId = req.params.userID; // Asumiendo que el parámetro se llama 'userId'
    const courseId = req.params.courseID; // Asumiendo que el parámetro se llama 'courseId'

    // Busca al usuario por ID
    const user = await Login.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "Usuario no encontrado",
        data: null,
        error: "El usuario no existe",
      });
    }

    // Encuentra el índice del curso que deseas eliminar en la lista de cursos del usuario
    const courseIndex = user.courses.map((course) => {
      return course._id;
    }).indexOf(courseId);

    if (courseIndex === -1) {
      return res.status(404).json({
        status: "Curso no encontrado",
        data: null,
        error: "El curso no existe en la lista de cursos del usuario",
      });
    }

    // Elimina el curso del array de cursos del usuario
    user.courses.splice(courseIndex, 1);

    // Guarda los cambios en la base de datos
    await user.save();

    return res.status(200).json({
      status: "Éxito",
      data: {user},
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error del servidor",
      data: null,
      error: "Fallo",
    });
  }
};

module.exports = { signup, login, update, getuser, alluser, deleteusercourse };
