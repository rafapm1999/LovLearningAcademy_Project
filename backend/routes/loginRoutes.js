//Importamos loginController para generar las rutas a los endpoints
const loginController = require("../Controller/loginController");
//Importamos express para poder usar router para generar las rutas
const router = require("express").Router();

//ENDPOINT para registrarse => /signup
router.post("/signup", loginController.signup);
//ENDPOINT para logearse => /login
router.post("/login", loginController.login)
//ENDPOINT para actualizar datos => /update
router.patch("/:id", loginController.update)
//ENDPOINT para coger un ususario => /getuser
router.get("/getuser/:id", loginController.getuser)
//ENDPOINT para coger un ususario => /alluser
router.get("/alluser", loginController.alluser)
module.exports = router;