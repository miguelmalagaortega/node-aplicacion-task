const Usuarios = require("../models/Usuarios");

const formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en UpTask",
  });
};

const crearCuenta = async (req, res, next) => {
  // leer los datos
  const { email, password } = req.body;

  try {
    await Usuarios.create({
      email,
      password,
    });

    res.redirect("/iniciar-sesion");
  } catch (error) {
    // console.log(error.errors);
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    res.render("crearCuenta", {
      nombrePagina: "Crear cuenta en UpTask",
      mensajes: req.flash(),
      email: email,
    });
  }
};

module.exports = {
  formCrearCuenta,
  crearCuenta,
};
