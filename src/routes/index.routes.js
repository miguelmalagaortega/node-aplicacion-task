const { Router } = require("express");
const router = Router();

// Importar express-validator
// Solo validaremos el body
const { body } = require("express-validator");

// Importamos los controladores
const proyectosController = require("../controllers/proyectos.controller");
const tareasController = require("../controllers/tareas.controller");
const usuariosController = require("../controllers/usuarios.controller");
const authController = require("../controllers/auth.controller");

router.get(
  "/",
  authController.usuarioAutenticado,
  proyectosController.proyectosHome
);
// crear proyecto
router.get(
  "/nuevo-proyecto",
  authController.usuarioAutenticado,
  proyectosController.formularioProyecto
);
router.post(
  "/nuevo-proyecto",
  authController.usuarioAutenticado,
  body("nombre").not().isEmpty().trim().escape(),
  proyectosController.nuevoProyecto
);
// Listar proyecto
router.get(
  "/proyectos/:url",
  authController.usuarioAutenticado,
  proyectosController.proyectoPorUrl
);
// Actualizar el proyecto
router.get(
  "/proyecto/editar/:id",
  authController.usuarioAutenticado,
  proyectosController.formularioEditar
);
router.post(
  "/nuevo-proyecto/:id",
  authController.usuarioAutenticado,
  body("nombre").not().isEmpty().trim().escape(),
  proyectosController.actualizarProyecto
);
// Eliminar proyecto
router.delete(
  "/proyectos/:url",
  authController.usuarioAutenticado,
  proyectosController.eliminarProyecto
);

// TAREAS
router.post(
  "/proyectos/:url",
  authController.usuarioAutenticado,
  tareasController.agregarTarea
);
// Actualizar tarea
router.patch(
  "/tareas/:id",
  authController.usuarioAutenticado,
  tareasController.cambiarEstadoTarea
);
// Eliminar tarea
router.delete(
  "/tareas/:id",
  authController.usuarioAutenticado,
  tareasController.eliminarTarea
);

// Crear nueva cuenta
router.get("/crear-cuenta", usuariosController.formCrearCuenta);
router.post("/crear-cuenta", usuariosController.crearCuenta);
// iniciar sesion
router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
router.post("/iniciar-sesion", authController.autenticarUsuario);
// cerrar sesion
router.get("/cerrar-sesion", authController.cerrarSesion);

module.exports = router;
