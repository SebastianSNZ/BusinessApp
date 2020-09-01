const dbHandler = require("./db-handler");
const app = require("../app");
const request = require("supertest");
var datos_usuario_1 = {};
var datos_usuario_2 = {};

beforeAll(async () => await dbHandler.connect());

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe("Tests de Creación de Usuarios", () => {
  test("POST /users/create (debería crear usuario)", function (done) {
    return request(app)
      .post("/users/create")
      .send({
        nombre_usuario: "alejandromagno",
        correo: "victorioso@gmail.com",
        nombre_completo: "Alejandro III de Macedonia",
        contrasenia: "Contrasenia123",
      })
      .set("Content-Type", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log(res.body.message);
          datos_usuario_1 = { contrasenia: "Contrasenia123", ...res.body };
          done();
        }
      });
  });

  test("POST /users/create", function (done) {
    return request(app)
      .post("/users/create")
      .send({
        nombre_usuario: "franklin098",
        correo: "franklin098@gmail.com",
        nombre_completo: "Franklin Velásquez",
        contrasenia: "Contrasenia123",
      })
      .set("Content-Type", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log(res.body.message);
          datos_usuario_2 = { contrasenia: "Contrasenia123", ...res.body };
          done();
        }
      });
  });

  test("POST /users/create (debería dar error por usuario repetido)", function (done) {
    return request(app)
      .post("/users/create")
      .send({
        nombre_usuario: "alejandromagno",
        correo: "victorioso@gmail.com",
        nombre_completo: "Alejandro III de Macedonia",
        contrasenia: "Contrasenia123",
      })
      .set("Content-Type", "application/json")
      .expect(500)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });
});

describe("Tests de Login de usuarios", () => {
  test("POST /users/login (debería ser correcto)", function (done) {
    return request(app)
      .post("/users/login")
      .send({
        codigo_usuario: datos_usuario_1.codigo_usuario,
        nombre_usuario: datos_usuario_1.nombre_usuario,
        contrasenia: datos_usuario_1.contrasenia,
      })
      .set("Content-Type", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log(res.body.message);
          done();
        }
      });
  });
  test("POST /users/login", function (done) {
    return request(app)
      .post("/users/login")
      .send({
        codigo_usuario: datos_usuario_2.codigo_usuario,
        nombre_usuario: datos_usuario_2.nombre_usuario,
        contrasenia: datos_usuario_2.contrasenia,
      })
      .set("Content-Type", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log(res.body.message);
          done();
        }
      });
  });

  test("POST /users/login (debería dar error por código incorrecto)", function (done) {
    return request(app)
      .post("/users/login")
      .send({
        codigo_usuario: "012345",
        nombre_usuario: datos_usuario_1.nombre_usuario,
        contrasenia: datos_usuario_1.contrasenia,
      })
      .set("Content-Type", "application/json")
      .expect(500)
      .end(function (err, res) {
        console.log(res.body.message);
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });

  test("POST /users/login (debería dar error por contrasenia incorrecto)", function (done) {
    return request(app)
      .post("/users/login")
      .send({
        codigo_usuario: datos_usuario_1.codigo_usuario,
        nombre_usuario: datos_usuario_1.nombre_usuario,
        contrasenia: "Que pedo que pedo",
      })
      .set("Content-Type", "application/json")
      .expect(500)
      .end(function (err, res) {
        console.log(res.body.message);
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });

  test("POST /users/login (debería dar error por nombre de usuario incorrecto)", function (done) {
    return request(app)
      .post("/users/login")
      .send({
        codigo_usuario: datos_usuario_1.codigo_usuario,
        nombre_usuario: "nombre_usuario_random",
        contrasenia: datos_usuario_1.contrasenia,
      })
      .set("Content-Type", "application/json")
      .expect(500)
      .end(function (err, res) {
        console.log(res.body.message);
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });
});

describe("Tests de Transacciones de usuarios", () => {
  test("GET /transactions/list ", function (done) {
    return request(app)
      .get("/transactions/list")
      .set("x-access-token", datos_usuario_1.accessToken)
      .set("Content-Type", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log("len(transacciones): ", res.body.transacciones.length);
          done();
        }
      });
  });

  test("GET /transactions/list (Debería dar error, pues usuario no ha iniciado login)", function (done) {
    return request(app)
      .get("/transactions/list")
      .set("Content-Type", "application/json")
      .expect(500)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log(res.body.message);
          done();
        }
      });
  });

  test("POST /transactions/user-send (Transferencia entre usuarios)", function (done) {
    return request(app)
      .post("/transactions/user-send")
      .set("x-access-token", datos_usuario_1.accessToken)
      .set("Content-Type", "application/json")
      .send({
        no_cuenta_destino: datos_usuario_2.no_cuenta,
        monto: 75,
      })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log(res.body.message);
          done();
        }
      });
  });

  test("POST /transactions/user-send (debería dar error por falta de fondos)", function (done) {
    return request(app)
      .post("/transactions/user-send")
      .set("x-access-token", datos_usuario_1.accessToken)
      .set("Content-Type", "application/json")
      .send({
        no_cuenta_destino: datos_usuario_2.no_cuenta,
        monto: 4000,
      })
      .expect(500)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log(res.body.message);
          done();
        }
      });
  });

  test("POST /transactions/user-send (debería dar error por cuenta incorrecta)", function (done) {
    return request(app)
      .post("/transactions/user-send")
      .set("x-access-token", datos_usuario_1.accessToken)
      .set("Content-Type", "application/json")
      .send({
        no_cuenta_destino: 20202020,
        monto: 75,
      })
      .expect(500)
      .end(function (err, res) {
        if (err) {
          return done(err);
        } else {
          console.log(res.body.message);
          done();
        }
      });
  });
});
