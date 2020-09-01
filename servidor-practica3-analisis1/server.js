const PORT = 3000;

var mongoose = require("mongoose");
let mongoDB =
  "mongodb+srv://analisis1:analisis1@cluster0-4zw9a.mongodb.net/test?retryWrites=true&w=majority";
// let mongoDB =
//   "mongodb+srv://analisis1:analisis1@cluster0-4zw9a.mongodb.net/servertest?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Error conectando con MongoDB"));

const app = require("./app");

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
