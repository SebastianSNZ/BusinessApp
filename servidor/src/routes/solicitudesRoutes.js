var Router = require("express").Router;
var solicitudesController = require("../controller/solicitudeController");
var userController = require("../controller/usersController");

class SolicitudesRoutes {
  router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.post(
      "/create",
      userController.allowIfLoggedIn,
      userController.grantAccess("createOwn", "solicitud"),
      solicitudesController.create
    );
    this.router.get(
      "/list-admin",
      userController.allowIfLoggedIn,
      userController.grantAccess("readAny", "solicitud"),
      solicitudesController.listAdmin
    );
    this.router.post(
      "/aprove",
      userController.allowIfLoggedIn,
      userController.grantAccess("updateAny", "solicitud"),
      solicitudesController.acceptSolicitude
    );
    this.router.post(
      "/reject",
      userController.allowIfLoggedIn,
      userController.grantAccess("updateAny", "solicitud"),
      solicitudesController.reject
    );
    this.router.get(
      "/list-my-solicitudes",
      userController.allowIfLoggedIn,
      userController.grantAccess("readOwn", "solicitud"),
      solicitudesController.mySolicitudes
    );
  }
}

const solicitudesRoutes = new SolicitudesRoutes();

module.exports = solicitudesRoutes.router;
