const passport = require("passport");

const autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

// Funcion pra ver si el usuario esta logeado o no
const usuarioAutenticado = (req, res, next) => {
  // Si el usuario esta autenticado
  if (req.isAuthenticated()) {
    return next();
  }
  // Sino esta autenticado, redirigir al formulario
  return res.redirect("/iniciar-sesion");
};

const cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion");
  });
};

module.exports = {
  autenticarUsuario,
  usuarioAutenticado,
  cerrarSesion,
};
