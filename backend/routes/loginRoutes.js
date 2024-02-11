//Importamos loginController para generar las rutas a los endpoints
const loginController = require("../Controller/loginController");
const {verifyToken} = require("../middlewares/auth");
//Importamos express para poder usar router para generar las rutas
const router = require("express").Router();

//ENDPOINT para registrarse => /signup
router.post("/signup", loginController.signup);
//ENDPOINT para logearse => /login
router.post("/login", loginController.login)
//ENDPOINT para actualizar datos => /:id
router.patch("/:id", verifyToken, loginController.update)
//ENDPOINT para coger un ususario => /getuser
router.get("/getuser/:id", loginController.getuser)
//ENDPOINT para coger todos los ususarios => /alluser
router.get("/alluser", verifyToken, loginController.alluser)
//ENDPOINT para borrar cursos del ususario => /deleteusercourse/:userID/:courseID
router.delete("/deleteusercourse/:userID/:courseID", loginController.deleteusercourse)
//ENDPINT para refrescar el token => /refreshtoken
router.get("/refreshtoken", verifyToken, loginController.refreshToken)
module.exports = router;