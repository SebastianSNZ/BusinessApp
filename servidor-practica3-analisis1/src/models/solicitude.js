const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SolicitudeSchema = new Schema({
  no_cuenta: { type: Number, required: true },
  estado: { type: String, required: true },
  monto: { type: Number, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
});

module.exports = mongoose.model("Solicitude", SolicitudeSchema);
