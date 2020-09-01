const Solicitude = require("../models/solicitude");
const { sucess, failure } = require("../libs/handleResponse");
const Transaction = require("../models/transaction");
const User = require("../models/user");

class SolicitudeController {
  async create(request, response) {
    const body = request.body;

    let solicitude = new Solicitude({
      no_cuenta: body.no_cuenta,
      estado: "espera",
      monto: body.monto,
      descripcion: body.descripcion,
      fecha: new Date().toISOString(),
    });

    solicitude.save((err, solicitudNueva) => {
      if (err) {
        console.log("Error creando nueva solicitud de crédito");
        console.log(err);
        failure(response, {
          message: "Error creando nueva solicitud de crédito",
          err,
        });
      } else {
        sucess(response, {
          message: "Solicitud de crédito creada correctamente",
          id_solicitud: solicitudNueva._id,
          estado: "espera",
        });
      }
    });
  }

  async acceptSolicitude(request, response) {
    const admin_user = response.locals.loggedInUser;
    const id_solicitud = request.body.id_solicitud;

    try {
      const solicitud = await Solicitude.findById(id_solicitud);

      if (!solicitud) {
        failure(response, {
          message: "No existe solicitud con id: " + id_solicitud,
        });
        return;
      }

      const receiver_count_number = solicitud.no_cuenta;
      const monto = solicitud.monto;

      if (admin_user.saldo_cuenta < monto) {
        failure(response, {
          message:
            "No hay suficiente dinero en la cuenta del admin para realizar la transacción",
        });
        return;
      }

      const receiver_user = await User.findOne({
        no_cuenta: receiver_count_number,
      });
      if (!receiver_user) {
        failure(response, {
          message: `No existe no de cuenta de destino : ${receiver_count_number}`,
        });
      } else {
        let credit_transaction = new Transaction({
          no_cuenta: receiver_user.no_cuenta,
          tipo: "credito",
          cantidad: monto,
          descripcion: `Transacción por solicitud de credito: ${id_solicitud} aprobada.`,
          fecha: new Date().toISOString(),
        });

        await credit_transaction.save(async (err) => {
          if (err) {
            console.log("Error creando transacción de crédito");
            console.log(err);
            failure(response, {
              message: "Error creando transacción  de crédito",
              error,
            });
          } else {
            await User.findByIdAndUpdate(receiver_user._id, {
              saldo_cuenta: receiver_user.saldo_cuenta + monto,
            });

            let debit_transaction = new Transaction({
              no_cuenta: admin_user.no_cuenta,
              tipo: "debito",
              cantidad: -monto,
              descripcion: `Débito por crédito aprobado a ${receiver_user.nombre_completo}, solicitud ${id_solicitud} `,
              fecha: new Date().toISOString(),
            });

            await debit_transaction.save(async (err) => {
              if (err) {
                console.log("Error creando transacción de débito");
                console.log(err);
                failure(response, {
                  message: "Error creando transacción de débito",
                  error,
                });
              } else {
                await User.findByIdAndUpdate(admin_user._id, {
                  saldo_cuenta: admin_user.saldo_cuenta - monto,
                });

                await Solicitude.findByIdAndUpdate(id_solicitud, {
                  estado: "aprovada",
                });

                sucess(response, {
                  message:
                    "Solicitud aprobada y transacción realizada correctamente",
                  id_solicitud,
                  estado: "aprovada",
                  id_transaccion_credito: credit_transaction.id_transaccion,
                  id_transaccion_debito: debit_transaction.id_transaccion,
                });
              }
            });
          }
        });
      }
    } catch (error) {
      console.log("Error en aceptar solicitud de crédito");
      console.log(error);
      failure(response, {
        message: "Error en aceptar solicitud de crédito",
        error,
      });
    }
  }

  async listAdmin(request, response) {
    const solicitudes = await Solicitude.find({});
    sucess(response, { solitudes: solicitudes });
  }

  async reject(request, response) {
    try {
      await Solicitude.findByIdAndUpdate(request.body.id_solicitud, {
        estado: "rechazada",
      });

      sucess(response, { message: "Solicitud rechazada exitosamente" });
    } catch (error) {
      console.log("Error rechazando solicitud");
      console.log(error);
      failure(response, {
        message: "Error rechazando solicitud",
        error,
      });
    }
  }

  async mySolicitudes(request, response) {
    let no_cuenta = response.locals.loggedInUser.no_cuenta;
    let solicitudes = await Solicitude.find({ no_cuenta: no_cuenta });
    sucess(response, { solicitudes });
  }
}

const solicitudeController = new SolicitudeController();

module.exports = solicitudeController;
