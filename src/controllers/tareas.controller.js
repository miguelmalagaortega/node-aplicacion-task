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

module.exports = {
  agregarTarea,
};
