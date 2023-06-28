//Importamos loginController para generar las rutas a los endpoints
const loginController = require("../Controller/loginController");
//Importamos express para poder usar router para generar las rutas
const router = require("express").Router();

//ENDPOINT para registrarse => /signup
router.post("/signup", loginController.signup);

module.exports = router;