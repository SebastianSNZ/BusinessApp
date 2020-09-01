var Router = require("express").Router;
var transactionsController = require("../controller/transactionsController");
var userController = require("../controller/usersController");

class TransactionsRoutes {
  router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post(
      "/user-send",
      userController.allowIfLoggedIn,
      userController.grantAccess("createOwn", "transaccion"),
      transactionsController.userSend
    );
    this.router.get(
      "/list",
      userController.allowIfLoggedIn,
      userController.grantAccess("readOwn", "transacciones"),
      transactionsController.list
    );
    this.router.post(
      "/admin-debit",
      userController.allowIfLoggedIn,
      userController.grantAccess("createOwn", "debito-a-cliente"),
      transactionsController.adminDebit
    );
  }
}

const transactionsRoutes = new TransactionsRoutes();

module.exports = transactionsRoutes.router;
