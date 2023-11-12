//Importamos loginController para generar las rutas a los endpoints
const userController = require("../Controller/userController");
const verifyToken = require("../middlewares/auth");
//Importamos express para poder usar router para generar las rutas
const router = require("express").Router();

router.post("/verifyToken", userController.verifyToken);

module.exports = router;