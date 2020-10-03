const { Router } = require("express");
const router = Router();

// Importamos los controladores
const proyectosController = require("../controllers/proyectos.controller");

router.get("/", proyectosController.proyectosHome);
router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
router.post("/nuevo-proyecto", proyectosController.nuevoProyecto);

module.exports = router;
