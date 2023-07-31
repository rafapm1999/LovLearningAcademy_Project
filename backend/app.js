/* Archivo principal */
//Importar express para crear el servidor
const express = require("express");
//Importar dotenv para leer las variables de entorno
const dotenv = require("dotenv");
//Importar librería mongoose para poder conectarnos a la base de datos
const mongoose = require("mongoose");
//Habilitar stritQuery para que no se puedan hacer consultas con campos que no existen en el modelo
mongoose.set("strictQuery", true);
//Importar las liberias cors, para habilitar el acceso a la API desde cualquier origen
const cors = require("cors");

//Importar las rutas
const logins = require("./routes/loginRoutes");
const courses = require("./routes/courseRoutes");
const contact = require("./routes/contactRoutes");

//Para leer las variables de entorno
dotenv.config();
//Creamos el servidor con express
const app = express();
//Habilitar el uso de json en el body
app.use(express.json());
//Habilitar cors para poder hacer peticiones desde el frontend
app.use(cors());

//Conectamos a la base de datos
mongoose
  .connect(process.env.MONGO_URI, {
    //Para evitar warnings con las URL de conexión, aplica el nuevo motor de análisis de URL
    useNewUrlParser: true,
    //Para evitar warnings con la topología de la base de datos, aplica el nuevo motor de detección y monitoreo de servidores
    useUnifiedTopology: true,
  })
  //Si se conecta correctamente => log con ese mensaje
  .then(() => console.log("Successfully connected to the database!!"))
  //Si hay algun error => log con mensaje de error
  .catch((err) => console.log(err));
//Para escuchar eventos de error, y manejar posibles errores despues de la conexion
mongoose.connection.on("error", (err) => {
  console.log(err);
});

//Habilitar las rutas
app.use("/auth", logins);
app.use("/courses", courses)
app.use("/contact", contact)

//Levantamos el servidor
//Hacemos que el servidor escuche las conexiones para el puerto y host especificados (devuelve un objeto http.Server)
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
