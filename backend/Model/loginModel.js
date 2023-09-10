//Importo la librería de mongoose
const mongoose = require("mongoose");
//Generamos las reglas de validación que ha de cumplir nuestro login en nuestro esquema
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerAt: {
    type: Date,
    required: false,
  },
  role: {
    type: String,
    required: false,
    default: "user",
  },
  courses: {
    type: Array,
    required: false,
  }
});

module.exports = mongoose.model("Login", loginSchema);
