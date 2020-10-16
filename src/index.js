const express = require("express");
const morgan = require("morgan");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Helpers
const helpers = require("./helpers");

// Conexion a la base de datos
const db = require("./config/db");
// db.authenticate()
//   .then(() => {
//     console.log(`Conectado al servidor`);
//   })
//   .catch((error) => console.log(error));

// Importar el modelo
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");
db.sync()
  .then(() => console.log("Conectado al servidor"))
  .catch((error) => console.log(error));

// app de express
const app = express();

// Cargar archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Habilitar la lectura de datos de un formulario
app.use(express.urlencoded({ extended: false }));

// Habilitar PUG
app.set("view engine", "pug");
// Añadir la carpeta vistas
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(morgan("dev"));

// Agregamos flash messages
app.use(flash());

app.use(cookieParser());

// sesiones, nos permite navegar entre distintas paginas sin volver a autenticarnos
app.use(
  session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false,
  })
);

// Pasar vardump  la aplicacion
app.use((req, res, next) => {
  // locals hace que se cree una variable en este archivo y se pueda usar en todos los demás archivos
  res.locals.vardump = helpers.vardump;
  // Agregamos connect-flash a las variables locales
  res.locals.mensajes = req.flash();
  next();
});

app.set("port", process.env.PORT || 3000);

// Rutas
app.use(require("./routes/index.routes"));

app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});
