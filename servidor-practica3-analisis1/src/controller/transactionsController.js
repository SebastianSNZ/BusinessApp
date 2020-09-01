const Transaction = require("../models/transaction");
const { sucess, failure } = require("../libs/handleResponse");
const User = require("../models/user");

class TransactionsController {
  async userSend(request, response) {
    const sender_user = response.locals.loggedInUser;
    const body = request.body;
    const receiver_count_number = body.no_cuenta_destino;
    const monto = body.monto;

    if (sender_user.saldo_cuenta < monto) {
      failure(response, {
        message:
          "No hay suficiente dinero en la cuenta para realizar la transacción",
      });
    } else {
      try {
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
            descripcion: `Transacción enviada por ${sender_user.nombre_completo}, cuenta ${sender_user.no_cuenta}`,
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
                no_cuenta: sender_user.no_cuenta,
                tipo: "debito",
                cantidad: -monto,
                descripcion: `Débito por transacción enviada a ${receiver_user.nombre_completo}, cuenta ${receiver_count_number} `,
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
                  await User.findByIdAndUpdate(sender_user._id, {
                    saldo_cuenta: sender_user.saldo_cuenta - monto,
                  });

                  sucess(response, {
                    message: "Transacción realizada correctamente",
                  });
                }
              });
            }
          });
        }
      } catch (error) {
        console.log("Error en enviar transacción");
        console.log(error);
        failure(response, { message: "Error en enviar transacción", error });
      }
    }
  }

  async list(request, response) {
    let no_cuenta = response.locals.loggedInUser.no_cuenta;
    let transactions = await Transaction.find({ no_cuenta: no_cuenta });
    sucess(response, { transacciones: transactions });
  }

  async adminDebit(request, response) {
    const admin_user = response.locals.loggedInUser;
    const body = request.body;
    const debit_count_number = body.no_cuenta_debito;
    const monto = body.monto;
    const descripcion = body.descripcion;

    try {
      const debit_user = await User.findOne({
        no_cuenta: debit_count_number,
      });
      if (!debit_user) {
        failure(response, {
          message: `No existe no de cuenta : ${debit_count_number} para realizar el débito`,
        });
      } else {
        if (debit_user.saldo_cuenta < monto) {
          failure(response, {
            message:
              "No hay suficiente dinero en la cuenta del cliente para realizar la transacción de débito",
          });
        } else {
          let debit_transaction = new Transaction({
            no_cuenta: debit_user.no_cuenta,
            tipo: "debito",
            cantidad: -monto,
            descripcion: `${descripcion}`,
            fecha: new Date().toISOString(),
          });

          await debit_transaction.save(async (err) => {
            if (err) {
              console.log("Error creando transacción de débito");
              console.log(err);
              failure(response, {
                message: "Error creando transacción  de débito",
                error,
              });
            } else {
              await User.findByIdAndUpdate(debit_user._id, {
                saldo_cuenta: debit_user.saldo_cuenta - monto,
              });

              let credit_transaction = new Transaction({
                no_cuenta: admin_user.no_cuenta,
                tipo: "credito",
                cantidad: monto,
                descripcion: `Crédito por transacción realizada a ${debit_user.nombre_completo}, cuenta ${debit_count_number} `,
                fecha: new Date().toISOString(),
              });

              await credit_transaction.save(async (err) => {
                if (err) {
                  console.log("Error creando transacción de crédito");
                  console.log(err);
                  failure(response, {
                    message: "Error creando transacción de crédito",
                    error,
                  });
                } else {
                  await User.findByIdAndUpdate(admin_user._id, {
                    saldo_cuenta: admin_user.saldo_cuenta + monto,
                  });
                  sucess(response, {
                    message:
                      "Transacción de débito al cliente realizada correctamente",
                  });
                }
              });
            }
          });
        }
      }
    } catch (error) {
      console.log("Error al realizar transacción");
      console.log(error);
      failure(response, { message: "Error al realizar transacción", error });
    }
  }
}

const transactionsController = new TransactionsController();

module.exports = transactionsController;
