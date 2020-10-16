const { Router } = require("express");
const router = Router();

// Importar express-validator
// Solo validaremos el body
const { body } = require("express-validator");

// Importamos los controladores
const proyectosController = require("../controllers/proyectos.controller");
const tareasController = require("../controllers/tareas.controller");
const usuariosController = require("../controllers/usuarios.controller");

router.get("/", proyectosController.proyectosHome);
// crear proyecto
router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
router.post(
  "/nuevo-proyecto",
  body("nombre").not().isEmpty().trim().escape(),
  proyectosController.nuevoProyecto
);
// Listar proyecto
router.get("/proyectos/:url", proyectosController.proyectoPorUrl);
// Actualizar el proyecto
router.get("/proyecto/editar/:id", proyectosController.formularioEditar);
router.post(
  "/nuevo-proyecto/:id",
  body("nombre").not().isEmpty().trim().escape(),
  proyectosController.actualizarProyecto
);
// Eliminar proyecto
router.delete("/proyectos/:url", proyectosController.eliminarProyecto);

// TAREAS
router.post("/proyectos/:url", tareasController.agregarTarea);
// Actualizar tarea
router.patch("/tareas/:id", tareasController.cambiarEstadoTarea);
// Eliminar tarea
router.delete("/tareas/:id", tareasController.eliminarTarea);

// Crear nueva cuenta
router.get("/crear-cuenta", usuariosController.formCrearCuenta);
router.post("/crear-cuenta", usuariosController.crearCuenta);

module.exports = router;
