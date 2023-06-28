//Importamos bcrypt para encriptar la contraseña antes de ser guardada en la base de datos
const bcrypt = require("bcrypt");
//Importamos el esquema de validación
const Login = require("../Model/loginModel");
//Importamos fecha
const { getRegisterAt } = require("../lib/utils")

//POST => /auth/signup

const signup = async (req, res) => {
  try {
    //1. Obtenemos los datos del cliente que nos hacen falta
    const { name, lastName, email, password} = req.body;
    //2. Encriptamos la contraseña recibida
    const passwordHash = await bcrypt.hash(password, 10);
    //3. Obtenemos la fecha de registro
    const registerAt = getRegisterAt();
    const role = "user";
    const lastLogin = "lastday"
    //4. Creamos el usuario (Información que tendra nuestra base de datos)
    const newUser = new Login({
      name,
      lastName,
      email,
      password: passwordHash,
      role,
      registerAt,
      lastLogin,
    });
    //5. Guardamos en la base de datos al nuevo ususario
    const user = await newUser.save();
    //Enviamos respuesta de que todo se ha realizado correctamente
    res.status(201).json({
        status: "succeeded",
        data: "User create!",
        error: null
    });
  } catch (error) {
    //Si el error.code es 11000, enviamos un error de usuario duplicado (ya existe en la base de datos)
    if (error.code === 11000) {
        res.status(409).json({
            status: "failed",
            data: null,
            error: "The email is already registered. Please, try with another email."
        })
    } else {
        //Si es otro error enviamos un mensaje general con error.message
        res.status(400).json({
            status: "failed",
            data: null,
            error: error.message,
        })
    }
  }
};

module.exports = { signup };
