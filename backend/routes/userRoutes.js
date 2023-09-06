//Importamos loginController para generar las rutas a los endpoints
const userController = require("../Controller/userController");
//Importamos express para poder usar router para generar las rutas
const router = require("express").Router();

router.patch("/getMyCourse", userController.wantTheCourse);

module.exports = router;