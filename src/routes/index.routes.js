const { Router } = require("express");
const router = Router();

// Importar express-validator
// Solo validaremos el body
const { body } = require("express-validator");

// Importamos los controladores
const proyectosController = require("../controllers/proyectos.controller");

router.get("/", proyectosController.proyectosHome);
router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
router.post(
  "/nuevo-proyecto",
  body("nombre").not().isEmpty().trim().escape(),
  proyectosController.nuevoProyecto
);

module.exports = router;
