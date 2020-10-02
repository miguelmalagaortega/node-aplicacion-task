const express = require("express");
const morgan = require("morgan");
const path = require("path");

// app de express
const app = express();

// Habilitar PUG
app.set("view engine", "pug");
// Añadir la carpeta vistas
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));

// Rutas
app.use(require("./routes/index.routes"));

app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});
