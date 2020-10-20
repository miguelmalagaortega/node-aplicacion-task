const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Referencia al modelo que vamos a autenticar
const Usuarios = require("../models/Usuarios");

passport.use(
  new LocalStrategy(
    // por defecto passport espera un usuario y contraseña
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({
          where: { email: email },
        });
        // El email existe, password incorrecto
        if (!usuario.verificarPassword(password)) {
          return done(null, false, {
            message: "Password incorrecto",
          });
        }
        // El email existe, el password es correcto
        return done(null, usuario);
      } catch (error) {
        // El usiario no existe
        return done(null, false, {
          message: "Esa cuenta no existe",
        });
      }
    }
  )
);

// Serealizar el usuario
passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});

// Deserealizar el usuario
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

module.exports = passport;
