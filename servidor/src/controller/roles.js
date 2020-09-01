const AccessControlLibrary = require("accesscontrol");
const accessControl = new AccessControlLibrary();

exports.roles = (function () {
  accessControl
    .grant("cliente")
    .readOwn("cuenta")
    .readOwn("solicitud")
    .createOwn("solicitud")
    .createOwn("transaccion")
    .readOwn("transacciones");
  accessControl
    .grant("admin")
    .readAny("solicitud")
    .updateAny("solicitud")
    .createOwn("debito-a-cliente");

  return accessControl;
})();
