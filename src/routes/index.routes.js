const { Router } = require("express");
const router = Router();

// Importamos los controladores
const proyectosController = require("../controllers/proyectos.controller");

router.get("/", proyectosController.proyectosHome);

module.exports = router;
