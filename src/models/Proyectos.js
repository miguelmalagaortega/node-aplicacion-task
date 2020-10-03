const Sequelize = require("sequelize");

// importamos slug, para las url
const slug = require("slug");

// generador de id corto
const shortId = require("shortid");

const db = require("../config/db");

const Proyectos = db.define(
  "proyectos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING,
  },
  {
    // Eventos que se realizan antes, durante o después de una acción en el controlador.
    hooks: {
      beforeCreate(proyect) {
        // usando slug para las URLs
        const url = slug(proyect.nombre).toLowerCase();
        proyect.url = `${url}-${shortId.generate()}`;
      },
    },
  }
);

module.exports = Proyectos;
