//Importo la librería de mongoose
const mongoose = require("mongoose");
//Generamos las reglas de validación que ha de cumplir nuestro login en nuestro esquema
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
  }
});

module.exports = mongoose.model("Login", loginSchema);
