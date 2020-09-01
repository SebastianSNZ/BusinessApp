const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  nombre_usuario: { type: String, required: true, unique: true },
  saldo_cuenta: { type: Number, required: true },
  correo: { type: String, required: true },
  rol: { type: String, required: true },
  nombre_completo: { type: String, required: true },
  contrasenia: { type: String, required: true },
  accessToken: { type: String },
});

UserSchema.plugin(AutoIncrement, {
  inc_field: "codigo_usuario",
  start_seq: 84200,
});

UserSchema.plugin(AutoIncrement, {
  inc_field: "no_cuenta",
  start_seq: 1137040550,
});

module.exports = mongoose.model("User", UserSchema);
