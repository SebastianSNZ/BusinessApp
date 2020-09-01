var Router = require("express").Router;
var usersController = require("../controller/usersController");

class UserRoutes {
  router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post("/create", usersController.createUser);
    this.router.post("/login", usersController.login);
    this.router.get("/hello", usersController.hello);
  }
}

const userRoutes = new UserRoutes();

module.exports = userRoutes.router;
