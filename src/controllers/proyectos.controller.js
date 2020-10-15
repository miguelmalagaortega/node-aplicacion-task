// Importamos el modelo
const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

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

  // consultar tareas del proyecto actual
  const tareas = await Tareas.findAll({
    where: { proyectoId: proyecto.id },
    include: [{ model: Proyectos }],
  });

  if (!proyecto) return next();

  // console.log(proyecto);

  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyecto,
    proyectos,
    tareas,
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

const eliminarProyecto = async (req, res, next) => {
  // req, trae la información del cliente, podemos usar:
  // query o params; el primero usa la variable definida en la vista (url) y el segundo usa la variable enviada desde axios en el archivo proyecto.js (proyectoUrl)
  const { urlProyecto } = req.query;

  const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

  if (!resultado) {
    return next();
  }

  // res.status(200).send("Proyecto eliminado correctamente");
  res.status(200).json({
    message: "Proyecto eliminado correctamente",
    url: urlProyecto,
  });
};

module.exports = {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
  proyectoPorUrl,
  formularioEditar,
  actualizarProyecto,
  eliminarProyecto,
};
