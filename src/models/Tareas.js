const Sequelize = require("sequelize");
const db = require("../config/db");
// Para relacionar con la tabla de proyectos
const Proyectos = require("./Proyectos");

const Tareas = db.define("tareas", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  tarea: Sequelize.STRING(100),
  estado: Sequelize.INTEGER(1),
});

// relacion
Tareas.belongsTo(Proyectos);
// Otra forma pero esta iria en el modelo de proyectos
// Proyectos.hasMany(Tareas);

module.exports = Tareas;
