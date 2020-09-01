var User = require("../models/user");
var { sucess, failure } = require("../libs/handleResponse");
const jwt = require("jsonwebtoken");
const jwt_secret = "analysis-1-pepitos-franklin-juan-luis";
const md5 = require("md5");
const { roles } = require("./roles");
var Transaction = require("../models/transaction");

class UserController {
  async allowIfLoggedIn(request, response, next) {
    try {
      const user = response.locals.loggedInUser;
      if (!user) {
        return failure(response, { message: "No has iniciado sesión" });
      } else {
        request.user = user;
        next();
      }
    } catch (error) {
      console.log("Error en allowIfLoggedIn");
      console.log(error);
      next(error);
    }
  }

  grantAccess(action, resource) {
    return async (request, response, next) => {
      try {
        const permission = roles.can(request.user.rol)[action](resource);
        if (!permission.granted) {
          return failure(response, {
            message: "El usuario no tiene permisos para ejecutar esta acción",
          });
        } else {
          next();
        }
      } catch (error) {
        console.log("Error en grantAccess");
        console.log(error);
        next(error);
      }
    };
  }

  async createUser(request, response) {
    const body = request.body;

    let user = new User({
      nombre_usuario: body.nombre_usuario,
      saldo_cuenta: 300,
      correo: body.correo,
      rol: "cliente",
      nombre_completo: body.nombre_completo,
      contrasenia: md5(body.contrasenia),
    });

    const accessToken = jwt.sign({ userId: user._id }, jwt_secret, {
      expiresIn: "1d",
    });

    user.accessToken = accessToken;

    await user.save(async (err, usuarioNuevo) => {
      if (err) {
        console.log("Error creando nuevo usuario");
        console.log(err);
        if (err.name === "MongoError" && err.code === 11000) {
          failure(response, {
            message: "Error. El nombre de usuario ya existe",
          });
        } else {
          failure(response, { message: "Error creando nuevo usuario" });
        }
      } else {
        let transaction = new Transaction({
          no_cuenta: usuarioNuevo.no_cuenta,
          tipo: "credito",
          cantidad: 300,
          descripcion: "Apertura de cuenta bancaria",
          fecha: new Date().toISOString(),
        });

        await transaction.save((err) => {
          if (err) {
            console.log("Error creando transacción de apertura de cuenta");
            console.log(err);
          }
        });

        sucess(response, {
          message: "Usuario nuevo creado exitosamente",
          codigo_usuario: usuarioNuevo.codigo_usuario,
          nombre_usuario: usuarioNuevo.nombre_usuario,
          no_cuenta: usuarioNuevo.no_cuenta,
          accessToken,
          rol: usuarioNuevo.rol,
        });
      }
    });
  }

  async hello(request, response) {
    sucess(response, { message: "Hello" });
  }

  async login(request, response) {
    try {
      let { nombre_usuario, codigo_usuario, contrasenia } = request.body;
      const user = await User.findOne({ nombre_usuario });
      if (!user) {
        failure(response, {
          message: `No existe usuario con nombre de usuario ${nombre_usuario}`,
        });
      } else {
        const saved_password = user.contrasenia;
        contrasenia = md5(contrasenia);

        if (saved_password === contrasenia) {
          if (codigo_usuario === user.codigo_usuario) {
            const accessToken = jwt.sign({ userId: user._id }, jwt_secret, {
              expiresIn: "1d",
            });

            await User.findByIdAndUpdate(user._id, { accessToken });
            sucess(response, {
              message: "Login correcto",
              nombre_usuario: user.nombre_usuario,
              nombre_completo: user.nombre_completo,
              no_cuenta: user.no_cuenta,
              saldo_cuenta: user.saldo_cuenta,
              rol: user.rol,
              accessToken,
            });
          } else {
            failure(response, { message: "Código de usuario incorrecto" });
          }
        } else {
          failure(response, { message: "Contraseña incorrecta" });
        }
      }
    } catch (error) {
      console.log("Error en login");
      console.log(error);
      failure(response, { message: "Error en Login", error });
    }
  }
}

const userController = new UserController();

module.exports = userController;
