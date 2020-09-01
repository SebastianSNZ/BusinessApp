var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");
const PORT = 3000;
// var mongoose = require("mongoose");
// let mongoDB =
//   "mongodb+srv://analisis1:analisis1@cluster0-4zw9a.mongodb.net/test?retryWrites=true&w=majority";
// // let mongoDB =
// //   "mongodb+srv://analisis1:analisis1@cluster0-4zw9a.mongodb.net/servertest?retryWrites=true&w=majority";
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on("error", console.error.bind(console, "Error conectando con MongoDB"));

var usersRoutes = require("./src/routes/usersRoutes");
var solicitudesRoutes = require("./src/routes/solicitudesRoutes");
var transactionsRoutes = require("./src/routes/transactionsRoutes");

const jwt_secret = "analysis-1-pepitos-franklin-juan-luis";
const jwt = require("jsonwebtoken");
const User = require("./src/models/user");

class App {
  app;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.use(bodyParser.json({ limit: "200mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
    this.app.use(cors());
    this.app.use(async (request, response, next) => {
      if (request.headers["x-access-token"]) {
        const accessToken = request.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, jwt_secret);
        if (exp < Date.now().valueOf() / 1000) {
          return response.status(401).json({
            success: false,
            message: "Token de sesión expirado, vuelva a iniciar sesión",
          });
        } else {
          response.locals.loggedInUser = await User.findById(userId);
          next();
        }
      } else {
        next();
      }
    });
  }

  routes() {
    this.app.use("/users", usersRoutes);
    this.app.use("/solicitudes", solicitudesRoutes);
    this.app.use("/transactions", transactionsRoutes);
  }

  start() {
    this.app.listen(PORT, () => {
      console.log("Servidor corriendo en puerto " + PORT);
    });
  }
}

const app = new App();
module.exports = app.app;

// const server = new App();

// server.start();
