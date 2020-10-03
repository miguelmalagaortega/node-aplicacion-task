const express = require("express");
const morgan = require("morgan");
const path = require("path");

// app de express
const app = express();

// Cargar archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Habilitar PUG
app.set("view engine", "pug");
// Añadir la carpeta vistas
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));

// Habilitar la lectura de datos de un formulario
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require("./routes/index.routes"));

app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});
