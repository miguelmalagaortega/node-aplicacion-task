const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

const agregarTarea = async (req, res, next) => {
  // Obtenemos el proyecto actual
  const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

  // leer el valor del input
  const { tarea } = req.body;
  // completamos los otros valores
  const estado = 0;
  const proyectoId = proyecto.id;

  // insertar en la base de datos
  const resultado = await Tareas.create({ tarea, estado, proyectoId });

  if (!resultado) {
    return next();
  }

  // redireccionar
  res.redirect(`/proyectos/${req.params.url}`);
};

const cambiarEstadoTarea = async (req, res, next) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({ where: { id: id } });

  // cambiar el estado
  let estado = 0;
  if (tarea.estado === estado) {
    estado = 1;
  }
  tarea.estado = estado;

  const resultado = await tarea.save();

  if (!resultado) {
    return next();
  }

  res.status(200).send("Actualizado");
};

module.exports = {
  agregarTarea,
  cambiarEstadoTarea,
};
