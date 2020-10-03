const proyectosHome = (req, res) => {
  res.render("index", {
    nombrePagina: "Proyectos",
  });
};

const formularioProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
  });
};

const nuevoProyecto = (req, res) => {
  // Validar que tengamos algo en el input
  const { nombre } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al proyecto" });
  }

  // Si hay errores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
    });
  } else {
    // Insertar en la base de datos
  }

  // res.send("Enviaste el formulario");
};

module.exports = {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
};
