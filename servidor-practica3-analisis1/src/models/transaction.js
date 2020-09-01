const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
  no_cuenta: { type: Number, required: true },
  tipo: { type: String, required: true },
  cantidad: { type: Number, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
});

TransactionSchema.plugin(AutoIncrement, {
  inc_field: "id_transaccion",
  start_seq: 3321500,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
