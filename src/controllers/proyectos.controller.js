// Importamos el modelo
const Proyectos = require("../models/Proyectos");

const proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

const formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos,
  });
};

const nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();

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
      proyectos,
    });
  } else {
    // Insertar en la base de datos
    const proyecto = await Proyectos.create({ nombre });
    res.redirect("/");
  }

  // res.send("Enviaste el formulario");
};

const proyectoPorUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  if (!proyecto) return next();

  // console.log(proyecto);

  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyecto,
    proyectos,
  });
};

const formularioEditar = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto,
  });
};

const actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();

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
      proyectos,
    });
  } else {
    // Insertar en la base de datos
    const proyecto = await Proyectos.update(
      { nombre },
      { where: { id: req.params.id } }
    );
    res.redirect("/");
  }
};

module.exports = {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
  proyectoPorUrl,
  formularioEditar,
  actualizarProyecto,
};
